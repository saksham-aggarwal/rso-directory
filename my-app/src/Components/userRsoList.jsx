import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import RsoItem from './RsoItem'
import firebase from 'firebase/app';
import 'firebase/auth'; 
import _ from 'lodash';

import "../RsoPage.css";

class userRsoList extends Component {
  constructor(props){
    super(props);
    this.state = {userRsoList:[]};
  }

  componentDidMount() {
      if(this.props.loggedInUser) {
        this.userRsoRef = firebase.database().ref('users/' + this.props.loggedInUser.uid + '/RSOs');
        this.userRsoRef.on('value', (snapShot) => {
            let updatedRsoList = snapShot.val()
            this.setState({
            userRsoList: updatedRsoList
            })
        });
      }
  }

  componentWillUnmount() {
    if(this.props.loggedInUser){ 
        this.userRsoRef.off();
    }
  }

  render() {

    let content = null;
    if(!this.props.loggedInUser) {
        alert('Please sign out and login again. If you do not have an account, please sign up first!');
        return (
            <Redirect to='/SignUpLogin' />
        );
    } else {
        if(!this.state.userRsoList) {
            content = (
                <div>
                    <h3 className="text-center">{this.props.loggedInUser.displayName} has not subscribed to any RSOs.</h3>
                </div>
            );
        } else {

            let rsoKeys = Object.keys(this.state.userRsoList);
            let rsoArray = rsoKeys.map((key) => {
            let rsoObj = this.state.userRsoList[key];
            rsoObj.id = key;
            return rsoObj;
            });

            let rsoItems = rsoArray.map((rsoItem) => 
            <RsoItem rso={rsoItem} />
            );

            const rsoDivChunk = (element) => {
            return (
                <div className="flex-container-rso">
                {element}
                </div>
            );
            }

            let rsoContainerArray = _.chunk(rsoItems, 3);
            let newRsoArrayGroup = rsoContainerArray.map((rsoChunk) =>
            rsoDivChunk(rsoChunk)
            )

            content = (
                <div>
                    <h3 className="text-center">{this.props.loggedInUser.displayName} Subscribed Rso List</h3>
                    {newRsoArrayGroup}
                </div>
            );
        }
    }

    return (            
        <div>{content}</div>
    );
  }
}

export default userRsoList