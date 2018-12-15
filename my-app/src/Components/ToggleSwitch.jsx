import React, { Component } from "react";
import Switch from "react-switch";
import ToggleSwitch from "./ToggleSwitch";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import firebase from 'firebase/app';
import 'firebase/auth'; 

export default class TGSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  addRsoToUserAccount = () => {
    if(this.props.userDetails) {
      var topref = firebase.database().ref('RSOs/' + this.props.rsoToggleBtn.id);
      var rsoName = ''
      var rsoDescription = ''
      topref.once("value", (snapshot) => {
        rsoName = snapshot.child("RSOname").val();
        rsoDescription = snapshot.child("RSOdescription").val();
        var userRef = firebase.database().ref('users/' + this.props.userDetails.uid + "/RSOs");
        userRef.once("value", (userSnapshot) => {
          if (!userSnapshot.hasChild(rsoName)) {
            var rsoRef = firebase.database().ref('users/' + this.props.userDetails.uid + "/RSOs/" + rsoName);
            rsoRef.set({
              RSOname: rsoName,
              RSOdescription: rsoDescription
            });
            topref = topref.child("Events");
            topref.once("value").then((eventSnapshot) => {
              eventSnapshot.forEach((rsoEvent) => {
                var rsoEventName = rsoEvent.child("name").val();
                var rsoLocation = rsoEvent.child("location").val();
                var rsoDate = rsoEvent.child("date").val();
                userRef = userRef.parent.child("Events/" + rsoEventName);
                userRef.set({
                  name: rsoEventName,
                  location: rsoLocation,
                  date: rsoDate
                });
              })
            });
          } 
        })
      });
    } else {
      alert('Please sign out and log in again to subscribe to the numerous amazing RSOs\n.' + 'If you do not have an account, please sign up first!');
    }
  }

  render() {
    return (

      <div className="toggleSwitch" onClick={this.addRsoToUserAccount}>
        <label htmlFor="normal-switch">
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            className="react-switch"
            id="normal-switch"
          />
        </label>
        <p><span>{this.state.checked ? 'Joined!' : 'Join Now'}</span></p>
      </div>
    );
  }
}

