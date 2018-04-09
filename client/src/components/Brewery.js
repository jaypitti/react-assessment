import React from 'react';
import { Segment, Header, Image, Container, Grid, Divider, Button } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


class Brewery extends React.Component {
  state = { brewery: {} }

  componentDidMount() {
    const {name} = this.props.match.params
    axios.get(`/api/brewery/${name}`)
      .then(res => {
        this.setState({brewery: res.data.entries[0]})
      })
  }

  render() {
    const { brewery } = this.state
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          {brewery.images ? <Image src={brewery.images.large} /> : <h1>NO IMAGE</h1>}
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Container fluid>
              <Header style={styles.header} as='h1'>{brewery.name}</Header>
              <a href={brewery.website}><Header style={styles.subHeader} as='h4'>Website: {brewery.website}</Header></a>
              <Header style={styles.subHeader} as='h4'>
                {brewery.established ?
                  <Header style={styles.subHeader} as='h4'>Established in {brewery.established}</Header>
                  :
                  null
                }
              </Header>
              <p>{brewery.description}</p>
            </Container>
          </Segment>
          <Link to={'/breweries'}>
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

export default Brewery
