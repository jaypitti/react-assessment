import React, {Component, Fragment} from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Flash from './Flash';
import Home from './Home';

import Beers from './Beers';
import BeerView from './BeerView';

import Breweries from './Breweries';
import Brewery from './Brewery';

import Glassware from './Glassware';

import Locations from './Locations';

import {Switch, Route} from 'react-router-dom';
import {Segment} from 'semantic-ui-react';

// TODO: Add fetch component so we only have to load once
class App extends Component {
  render() {
    return (
      <Segment style={styles.background}>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/beers' component={Beers} />
          <Route exact path='/beers/:name' component={BeerView} />
          <Route exact path='/breweries' component={Breweries} />
          <Route exact path='/breweries/:name' component={Brewery} />
          <Route exact path='/glassware' component={Glassware} />
          <Route exact path='/locations' component={Locations} />
          <Route component={NoMatch} />
        </Switch>
      </Segment>
    );
  }
}

const styles = {
  background: {
    backgroundColor: '#D3D3D3',
    backgroundSize: 'cover'
  },
}

export default App;
