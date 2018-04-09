import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {
  Segment,
  Header,
  Image,
  Container,
  Grid,
  Button
} from 'semantic-ui-react';


class BeerView extends React.Component {
  state = { beer: {} }

  componentDidMount() {
    const {name} = this.props.match.params
    axios.get(`/api/beer/${name}`)
      .then(res => {
        this.setState({beer: res.data.entries[0]})
      })
  }

  render() {
    const { beer } = this.state
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          {beer.labels ? <Image src={beer.labels.large} /> : <h1>NO IMAGE</h1>}
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Container fluid>
              <Header style={styles.header} as='h1'>{beer.name}</Header>
              <Header style={styles.subHeader} as='h4'>ABV: {beer.abv}</Header>
              <Header style={styles.subHeader} as='h4'>Organic: {beer.is_organic}</Header>
              <Header style={styles.subHeader} as='h4'>Verified Status: {beer.status}</Header>
              <p>{beer.description}</p>
            </Container>
          </Segment>
          <Link to={'/beers'}>
            <Button>
              Back
              </Button>
          </Link>
        </Grid.Column>
      </Grid>
    )
  }
}

const styles = {
  header: {
    color: 'white'
  },
  subHeader: {
    color: 'lightgray'
  }
}

export default BeerView
