import React, { Component } from 'react';
import dateFns from "date-fns";
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import NewsFilter from './newsFilter';
import PageSubheader from './pageSubHeader';
import FeatureIcon from './featureIcon';
import SpecIcon from './specIcon';
import HeaderPicture from './headerPicture';
import Navbar from './navBar';
import NewsCardRender from './newsCardRender';
import CheckboxContainer from './CheckboxContainer';
import firebase from 'firebase/app'
import RSODisplay from './RSODisplay';
import createRSO from './createRSO';
import SignUpLogin from './signupLogin';

class BackgroundImage {
  constructor(url, title, description) {
    this.url = url;
    this.title = title;
    this.description = description;
  }
}

class Newsfeed extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dataFromChild: null
      };    
  }

  myCallback = (data) => {
        this.setState({ dataFromChild: data });
  }

  render() {
    var img = new BackgroundImage("url('./img/search.jpg')", "Keep up with today's top headlines.",
   'With numerous news channel options, choose the one that is your favorite. Read all the top headlines' + 
   'from any of the news channels.');
    return (
      <div>
        <section className="header-picture">
          <HeaderPicture image = {img}> </HeaderPicture>
        </section>
        <section className="search">
          <div className="main main-raised">
            <div className="container">
              <div className="rightcolumn">
                  <div class="newsCard">
                      <h3 id="news-channels">News Channels</h3>
                      <CheckboxContainer callbackFromParent={this.myCallback}/>
                      <br />
                  </div>
              </div>
              <div className="leftcolumn">
                <NewsCardRender dataFromParent={this.state.dataFromChild}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Newsfeed;