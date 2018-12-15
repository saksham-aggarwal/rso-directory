import React, { Component } from "react";
import Switch from "react-switch";
import ToggleSwitch from "./ToggleSwitch";
import firebase from 'firebase/app';


class RsoItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let rso = this.props.rso;

    return (
        <div className="rso-card z-depth-3 project-summary">
          <div className="card-content grey-text text-darken-3">
            <h3 className="card-title" align = "center">{rso.RSOname}</h3>
            <p>{rso.RSOdescription}</p>
            <div align = "center"><ToggleSwitch rsoToggleBtn={this.props.rso} userDetails={this.props.loggedInUser}/></div>
          </div>
        </div>
    );
  }
}

export default RsoItem