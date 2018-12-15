import React, { Component } from 'react';
import dateFns from "date-fns";
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import NewsFilter from './Components/newsFilter';
import RSOInfo from './Components/rsoInfo';
import PageSubheader from './Components/pageSubHeader';
import FeatureIcon from './Components/featureIcon';
import SpecIcon from './Components/specIcon';
import HeaderPicture from './Components/headerPicture';
import Navbar from './Components/navBar';
import NewsCardRender from './Components/newsCardRender';
import CheckboxContainer from './Components/CheckboxContainer';
import firebase from 'firebase/app'
import RSODisplay from './Components/RSODisplay';
import createRSO from './Components/createRSO';
import SignUpLogin from './Components/signupLogin';
import DesignSpecPage from './Components/designSpecPage';
import Newsfeed from './Components/newsFeed';
import EventPage from './Components/eventPage';


import "./App.css";
import "./Modal.css" 
import "./RsoPage.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  setUserForComponent = (passedUser) => {
    this.setState({ user: passedUser });
  }

  render() {
    return (
      <main>
        <section className="navbar">
          <Switch>
            <Route path='/home' component={RSOInfo} />
            <Route path='/DesignSpec' component={DesignSpecPage} />
            <Route path='/EventSearch' render={(event) => 
              // passes the current user to the component
              <EventPage user={this.state.user}/>
            } />
            <Route path='/Newsfeed' component={Newsfeed} />
            <Route path='/RSOdisplay' render={() => <RSODisplay userFromParent={this.state.user} />} />
            <Route path='/createRSO' component={createRSO} />
            <Route path='/SignUpLogin' render={() => <SignUpLogin setUser={this.setUserForComponent} />} />
            <Redirect to='/home' />
          </Switch>
          <Navbar userFromParent={this.state.user} > </Navbar>
        </section>
        <footer className="footer">
          <div className="container">
              <p>Images credited to Unsplash, icons are credited to Entypo++ and Material-Kit</p>
              <p>Fake user data from <a href="https://randomuser.me/documentation#howto">Random User API</a></p>
              <p>Live-feed of events from <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#anchor_find">Ticketmaster's Discovery API</a></p>
              <p>Daily News Articles from <a href="https://newsapi.org/">News API</a></p>
              <p>Mohammed Almaroof and Saksham Aggarwal</p>
              <p>Email: <a href="mailto:mfa8@uw.edu">Mohammed Almaroof</a><span> or </span><a href="mailto:saksham8@uw.edu">Saksham Aggarwal</a></p>
          </div>
        </footer>
      </main>
    );
  }
}

export default App;
