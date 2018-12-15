import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import PageSubheader from './pageSubHeader';
import FeatureIcon from './featureIcon';
import SpecIcon from './specIcon';
import HeaderPicture from './headerPicture';
import RsoList from './RsoList'

class BackgroundImage {
  constructor(url, title, description) {
    this.url = url;
    this.title = title;
    this.description = description;
  }
}

class RSODisplay extends Component {
    render() {
    var img = new BackgroundImage("url('./img/group-rso.jpg')", "Discover RSOs On Campus.",
   'The HUB for all RSOs on campus, join your community on campus bsed on what interests you and find where you belong. ');

    return (
      <div>
        <section className="header-picture">
          <HeaderPicture image = {img}> </HeaderPicture>
        </section>
        
        <section className="search">
          <div className="main main-raised">
            <div className="container text-center">
              <div className="row">
                <div className="col s12 m6">
                    <RsoList userFromAppAncestor={this.props.userFromParent}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default RSODisplay