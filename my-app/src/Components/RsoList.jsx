import React, { Component } from 'react';
import RsoItem from './RsoItem'
import UserRsoList from './userRsoList';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import _ from 'lodash';

import "../RsoPage.css";

class RsoList extends Component {
  constructor(props){
    super(props);
    this.state = {rsoList:[]};
  }

  componentDidMount() {
    this.rsoRef = firebase.database().ref('RSOs');
    this.rsoRef.on('value', (snapShot) => {
      let updatedRsoList = snapShot.val()
      this.setState({
        rsoList: updatedRsoList
      })
    });
  }

  componentWillUnmount() {
    this.rsoRef.off();
  }

  render() {
    if(!this.state.rsoList) return null;

    let rsoKeys = Object.keys(this.state.rsoList);
    let rsoArray = rsoKeys.map((key) => {
      let rsoObj = this.state.rsoList[key];
      rsoObj.id = key;
      return rsoObj;
    });

    let rsoItems = rsoArray.map((rsoItem) => 
      <RsoItem rso={rsoItem} loggedInUser={this.props.userFromAppAncestor}/>
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

    return (
      <div>
        <UserRsoList loggedInUser={this.props.userFromAppAncestor}/>
        <br /><h3 className="text-center">General Rso List</h3>
        <div>
          {newRsoArrayGroup}
        </div>
      </div>
    );
  }
}

export default RsoList