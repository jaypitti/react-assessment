import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setFlash} from '../actions/flash';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Header,
  Item,
  Loader,
  Segment,
  Image,
  Input
} from 'semantic-ui-react';
import styled from 'styled-components';


class locations extends React.Component {
  state = { locations: [], loading: true, page: 1, more: true }

  componentDidMount() {
    this.fetchlocations(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({locations: [], loading: true, more: true, page: 1});
    this.fetchlocations(nextProps, 1);
  }

  fetchlocations = (props, page = 1) => {
    const {dispatch} = this.props;
    axios.get(`/api/all_locations?page=${page}&per_page=10`)
      .then(res => {
        const {data} = res;
        console.log(data);
        if (data.total_pages) {
          if (data.total_pages === page)
            this.setState({more: false});
          this.setState({locations: [...this.state.locations, ...data.entries], total_pages: data.total_pages, page})
        } else {
          this.setState({locations: data.entries, more: false})
        }
      })
      .catch(err => {
        dispatch(setFlash('Unable to retrieve locations. Please try again', 'red'))
      })
      .then(() => {
        this.setState({loading: false});
      });
  }

  loadMorelocations = () => {
    this.fetchlocations(this.props, this.state.page + 1)
  }

  getlocationsByCity = (city) => {
  const { dispatch } = this.props;
  axios.get(`/api/locations/${city}`)
    .then(res => {
      this.setState({locations: res.data.entries})
    });
  }

  displaylocations = () => {
    const { locations } = this.state;
    return locations.map(location => {
      return (
        <Card key={ location.name }>
          <Card.Content>
            <Card.Header>{location.name}</Card.Header>
            <hr />
            <a>Address: {location.street_address} </a>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const { page, more, loading } = this.state;
    if (loading) {
      return (
        <Container>
          <Dimmer active style={{height: '100vh'}}>
            <Loader>Loading</Loader>
          </Dimmer>
        </Container>
      )
    } else {
      return (
        <Segment color="black">
          <Bar basic textAlign='center'>
            <Search
              fluid
              focus
              value={this.state.term}
              onChange={e => this.getlocationsByCity(e.target.value)}
              placeholder='Search'
            />
          </Bar>
          <hr />
          <Header as='h1' textAlign='center'>locations</Header>
          <Container style={{height: '100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
            <InfiniteScroll
              pageStart={ page }
              loadMore={ this.loadMorelocations }
              hasMore={ more }
              useWindow={ false }
            >
              <Card.Group stackable itemsPerRow={5}>
                {this.displaylocations()}
              </Card.Group>
            </InfiniteScroll>
          </Container>
        </Segment>
      );
    }
  }

}

const Search = styled(Input) `
  background-color: black !important;
  color: white !important;

`
const Bar = styled(Segment) `
  background-color: black !important;
  color: white !important;
`

export default connect()(locations);
