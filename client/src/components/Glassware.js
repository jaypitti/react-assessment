import React from 'react';
import axios from 'axios';
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
  Input,
} from 'semantic-ui-react';
import styled from 'styled-components';


class Glassware extends React.Component {
  state = { glasses: [], loading: true}

  componentDidMount() {
    this.getGlassware(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({glasses: [], loading: true, more: true});
    this.getGlassware(nextProps, 1);
  }

  getGlassware = (props) => {
    const { dispatch } = this.props;
    axios.get(`/api/all_glassware?page=1&per_page=12`)
      .then(res => {
          this.setState({more: false});
          this.setState({glasses: [...this.state.glasses, ...res.data.entries], total_pages: res.data.total_pages })
      })
      .catch(err => {
        dispatch(setFlash('Unable to get glassware', 'red'))
      })
      .then(() => {
        this.setState({loading: false});
      });
  }

  displayGlassware = () => {
    const { glasses } = this.state;
    return glasses.map(g => {
      return (
        <Card key={g.name}>
          <Card.Content>
            <Card.Header>{g.name}</Card.Header>
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
        <Segment>
          <Header as='h1' textAlign='center'>Glassware</Header>
          <Container style={{height: '100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
              <Card.Group stackable itemsPerRow={2}>
                { this.displayGlassware() }
              </Card.Group>
          </Container>
        </Segment>
      );
    }
  }

}

export default connect()(Glassware);
