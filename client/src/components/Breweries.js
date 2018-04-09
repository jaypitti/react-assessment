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


class Breweries extends React.Component {
  state = { breweries: [], loading: true, page: 1, more: true }

  componentDidMount() {
    this.fetchbreweries(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({breweries: [], loading: true, more: true, page: 1});
    this.fetchbreweries(nextProps, 1);
  }

  fetchbreweries = (props, page = 1) => {
    const {dispatch} = this.props;
    axios.get(`/api/all_breweries?page=${page}&per_page=10`)
      .then(res => {
        const {data} = res;
        console.log(data);
        if (data.total_pages) {
          if (data.total_pages === page)
            this.setState({more: false});
          this.setState({breweries: [...this.state.breweries, ...data.entries], total_pages: data.total_pages, page})
        } else {
          this.setState({breweries: data.entries, more: false})
        }
      })
      .catch(err => {
        dispatch(setFlash('Unable to retrieve breweries. Please try again', 'red'))
      })
      .then(() => {
        this.setState({loading: false});
      });
  }

  loadMorebreweries = () => {
    this.fetchbreweries(this.props, this.state.page + 1)
  }

  getBreweriesByName = (name) => {
  const { dispatch } = this.props;
  axios.get(`/api/search_breweries?query=${name}`)
    .then(res => {
      this.setState({breweries: res.data.entries})
    });
  }

  displaybreweries = () => {
    const { breweries } = this.state;
    return breweries.map(brewery => {
      return (
        <Card key={ brewery.name }>
          <Card.Content>
            { brewery.images ? <Image size='large' src={brewery.images.large} /> :  <div><h1>No Image</h1><hr /></div> }
            <Card.Header>{brewery.name}</Card.Header>
            <Card.Meta> Established: {brewery.established}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/breweries/${brewery.name}`}>
              View
            </Link>
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
              onChange={e => this.getBreweriesByName(e.target.value)}
              placeholder='Search'
            />
          </Bar>
          <hr />
          <Header as='h1' textAlign='center'>Breweries</Header>
          <Container style={{height: '100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
            <InfiniteScroll
              pageStart={ page }
              loadMore={ this.loadMorebreweries }
              hasMore={ more }
              useWindow={ false }
            >
              <Card.Group stackable itemsPerRow={5}>
                {this.displaybreweries()}
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

export default connect()(Breweries);
