import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import styled from 'styled-components';


class NavBar extends Component {

  activeItem = (active) => {
    return active === this.props.location.pathname;
  }

  render() {
    return (
      <div>
        <Menu pointing secondary color={"pink"}>
          <Link to='/'>
            <Menu.Item name='Home' active={this.activeItem('/')} />
          </Link>
          <Link to='/beers'>
            <Menu.Item name='Beer' active={this.activeItem('/beers')} />
          </Link>
          <Link to='/breweries'>
            <Menu.Item name='Breweries' active={this.activeItem('/breweries')} />
          </Link>
          <Link to='/glassware'>
            <Menu.Item name='Glasswarer' active={this.activeItem('/glassware')} />
          </Link>
          <Link to='/locations'>
            <Menu.Item name='Locations' active={this.activeItem('/locations')} />
          </Link>
        </Menu>
      </div>
    )
  }
}

export default withRouter(NavBar);
