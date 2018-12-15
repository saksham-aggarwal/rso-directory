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

class DesignSpecPage extends Component {
  render() {
    var img = new BackgroundImage("url('./img/SecondPic.jpg')", "Create Lasting Bonds On Campus.",
   'The college campus is home to thousands of students in their most important years. ' +
   'It is the first taste of complete freedom of expression they have ever had, we find the ability for students to ' +
   'feel comfortable on campus to be a pressing priority.');
   const picStyle = {
    width: '20%'
   }; 
    return (
      <div>
        <section className="header-picture">
          <HeaderPicture image={img}> </HeaderPicture>
        </section>
        <section className="spec" >
          <div className="main main-raised">
            <div className="container">
              <div className="section text-center">
                <div className="row">
                  <PageSubheader title='Our design specification' description={'While the project is still in progress, and these designs might undergo a change, ' +
                      'but our design emphasizes a more modern design that is familiar and intuitive to our users. ' +
                      'We want our demographic to be able to easily interact with our application to fulfill a user need. ' +
                      'The following is a wireframe to give an initial idea of what our project looks like:'}>
                  </PageSubheader>
                </div>  
                <br/>
                <div className="row">
                  <SpecIcon img='./img/home.svg' alt="Home" title='Home Page' description={'Home page to welcome students into the page, immediately calls students to the ' +
                          'action of finding an RSO that fits them with the structure of the page. This page will also ' +
                          'contain the searching algorithm that students can use to find RSOs.'}>
                  </SpecIcon>
                  <SpecIcon img='./img/magnifying-glass.svg' alt='Magnifying Glass' title='Searching Algorithm' description={'Searching mechanism that enables users to filter RSOs by interest, type of club, size, ' +
                          'schedule, and even friends. This is powerful, as it allows students to shrink a huge campus ' +
                          'to a small part. The searching algorithm is one of the most essential feature of the app.'}>
                  </SpecIcon>
                  <SpecIcon img='./img/list.svg' alt='List' title='Listing RSOs' description={'This page lists the resulting RSOs, typically from a search initiated by a user, ' +
                          'and it will show some initial information about the RSO, such as purpose and what ' +
                          'a typical meeting entails. You can also get an idea of who is in the club from this page.'}>
                  </SpecIcon>
                </div>
                <br />
                <div className="row">
                  <SpecIcon img='./img/clipboard.svg' alt='Clipboard' title='RSO Page' description={'This page will contain all the information the user needs about the RSO, and includes ' +
                            'interactions such as joining the RSO, talking to members, paying fees, checking calendar, '+ 
                            'etc. '}>
                  </SpecIcon>
                  <SpecIcon img='./img/user.svg' alt='User' title='User Profile' description={'This application will contain its own social media that only students can use to ' +
                            'get in touch with other RSOs. This page contains the student name, picture, and ' +
                            'ability to chat with clubs and others.'}>
                  </SpecIcon>
                  <SpecIcon img='./img/calendar.svg' alt='Calendar' title='Event Calendar' description={'To keep students in touch with what is happening, we include an event calendar ' +
                            'that will display events happening all year round. '}>
                  </SpecIcon>
                </div>
              </div>    
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default DesignSpecPage;