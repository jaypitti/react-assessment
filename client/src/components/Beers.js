import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { setFlash } from '../actions/flash';
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
  Input,
} from 'semantic-ui-react';
import styled from 'styled-components';


class Beers extends React.Component {
  state = { beers: [], loading: true, page: 1, more: true }

  componentDidMount() {
    this.getBeers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({beers: [], loading: true, more: true, page: 1});
    this.getBeers(nextProps, 1);
  }

  getBeers = (props, page = 1) => {
    const {dispatch} = this.props;
    axios.get(`/api/all_beers?page=${page}&per_page=12`)
      .then(res => {
        const {data} = res;
        console.log(data);
        if (data.total_pages) {
          if (data.total_pages === page)
            this.setState({more: false});
          this.setState({beers: [...this.state.beers, ...data.entries], total_pages: data.total_pages, page})
        } else {
          this.setState({beers: data.entries, more: false})
        }
      })
      .catch(err => {
        dispatch(setFlash('Unable to get beers', 'red'))
      })
      .then(() => {
        this.setState({loading: false});
      });
  }

  loadMoreBeers = () => {
    this.getBeers(this.props, this.state.page + 1)
  }

  getBeersByName = (name) => {
  const {dispatch} = this.props;
  axios.get(`/api/search_beers?query=${name}`)
    .then(res => {
      this.setState({beers: res.data.entries})
    });
  }

  displayBeers = () => {
    const {beers} = this.state;
    return beers.map(beer => {
      return (
        <Card key={beer.name} color={`#${beer.hex}`}>
          <Card.Content>
            { beer.labels ? <div><Image size='large' src={beer.labels.large} /></div> : (<div><h1>No Image</h1><hr/></div>) }
            <Card.Header>{beer.name}</Card.Header>
            <Card.Meta> ABV: {beer.abv}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/beers/${beer.name}`}>
              View
            </Link>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const {page, more, loading} = this.state;
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
              onChange={e => this.getBeersByName(e.target.value)}
              placeholder='Search'
            />
          </Bar>
          <hr />
          <Header as='h1' textAlign='center'>Beers</Header>
          <Container style={{height: '100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
            <InfiniteScroll
              pageStart={ page }
              loadMore={ this.loadMoreBeers }
              hasMore={ more }
              useWindow={ false }
            >
              <Card.Group stackable itemsPerRow={4}>
                { this.displayBeers() }
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

export default Beers;
