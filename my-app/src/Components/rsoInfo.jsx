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

class RSOInfo extends Component {
  render() {
    var img = new BackgroundImage("url('./img/Students-Party.jpg')", "Find Your Passion On Campus.",
    'College represents some of the most important and formidable years, it is where people discover lifelong bonds, and themselves. ' +
    'We aim to recreate the current RSO directory to assist students pursure their passions, and establish lasting relationships with ' +
    'people of similar interests.');
    return (
      <div>
        <section className="header-picture">
          <HeaderPicture image = {img}> </HeaderPicture>
        </section>
        <div className="main main-raised">
          <div className="container">
            <div className="section text-center">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="title" id="RSOSection">What is an RSO?</h2>
                  <p>
                    An RSO, or Registered Student Organization, is the organization that encompasses all student
                    clubs and societies on campus. This part of campus essentially play a huge role in the social
                    life on campus, as students often find their friend groups through societies and clubs. These 
                    organizations can be anything from a fraternity, to chess club, to the National Society of Black
                    Enginners. So these organizations can have a varying role and responsibility, whether it provides
                    housing, career opportunities, a place to celebrate culture, or a place where students can practice
                    their passions. These organizations shape our campus, it affects student wellness and relationships.
                    We want our students to feel like they belong on this campus, and feel like we provide all of our students
                    with a place to pursue their passions and interests. Here is a video from UW students that can offer 
                    an insight into the role of an RSO on campus: 
                  </p>
                  <iframe width="70%" height="300" 
                  src="https://www.youtube.com/embed/8XEVp6k2CJk" 
                  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>
                <br />
                </div>
              </div>  
              <div className="row">
                <PageSubheader title='The current problem' description={'UW provides an RSO directory intended '+
                      'for students looking for clubs, societies and campus activities. However, the tool is very outdated, one look at ' +
                      'the site shows that it was created a while back. It is not consistent at all with other, more modern, UW ' +
                      'pages on their site. Not updating the site shows a clear disregard for student societies, and their wellness, ' +
                      'as student participation on campus is integral to the college experience. The site is not very intuitive, ' +
                      'and does not promote social or campus activity.'}>
                </PageSubheader>
              </div>
                <div className="row">
                  <FeatureIcon icon='update' className='icon icon-old' title='Needs Updating' description={'The current design and layout of the site is old, and needs to be revamped to be more intuitive ' +
                          'and easier to use. The current design does not encourage student participation.'}>
                  </FeatureIcon>
                  <FeatureIcon icon='person_add_disabled' className='icon icon-disabled' title='No Social Media' description={'There is currently no social media on the RSO directory, which seems counter-intuitive, ' +
                        'as one of the biggest purposes of RSOs is to promote social activity and meeting others. ' +
                        'The current solution offers no way for students to meet others through the application.'}>
                  </FeatureIcon>
                  <FeatureIcon icon='view_quilt' className='icon icon-bad' title='Confusing Organizations' description={'There is a lack of organization in the current RSO directory, their search system ' +
                        'makes it hard for people to filter by interests, and the only one you can find ' +
                        'a specific organization is by listing all of them. If you know what you are looking for, ' +
                        'then you are in for a hard time.'}>
                  </FeatureIcon>
                </div>
              <PageSubheader title='Our Solution!' description = {'Our take of the RSO directory, as described above in the above section includes an optimized searching algorithm, where anyone can filter ' + 
                    'by interests, hours, activities, categories, etc. We aim to empower each student to pursure their passions ' +
                    'with our application, helping them find a place they belong to on campus. We also promote collaboration ' +
                    'between students, allowing them a way to communicate and keep in touch with other students they meet through ' +
                    'RSOs. Amongst other new features, we aim to have intuitive and modern organization and site map that will ' +
                    'seem fitting for our young, and technology-experienced demographic of college students.'}>
              </PageSubheader>
              <div className="features">
                <div className="row">
                  <FeatureIcon icon = 'library_books' className='icon icon-info' title = 'In-App Newsfeed' description = {'We want students to keep in touch with their campus and what is going on around them. ' +
                        'So, we offer a newsfeed system that will keep students informed about RSOs and what not. ' +
                        'Obviously, since no such UW tool has been made, we are using a news api to mock this behavior.'}>
                  </FeatureIcon>
                  <FeatureIcon icon = 'search' className='icon icon-success' title = 'Filtering System' description = {'We understand that it is hard to find the club that you belong to in a sea of societies, especially in a campus ' +
                        'like UW, that is home to more than 40 thousand students. For that reason, we offer a searching algorithm that ' +
                        'caters to you and your needs, whatever sort of passion, interests, type of club, even size of club you are looking for, ' +
                        'we will help you find it, using a filtering algorithm that lets you discover where you belong.'}>
                  </FeatureIcon>
                  <FeatureIcon icon = 'accessibility_new' className='icon icon-rose' title = 'Accessible Design' description = {'Promoting a campus environment that is open ' +
                  'to differing ideas and disabilities is important for every college, we take an open-minded and ' +
                  'empathetic approach to our application, to ensure that any student can find what they are ' +
                  'looking for using this application, regardless of disability.'}>
                  </FeatureIcon>
                </div>
              </div>
            </div>    
          </div>
        </div>
      </div>
    )
  }
}

export default RSOInfo;