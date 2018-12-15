import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';

class FeatureIcon extends Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="info">
          <div className={this.props.className}>
            <i className="material-icons">{this.props.icon}</i>
          </div>
          <h4 className="info-title">{this.props.title}</h4>
          <p>
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }
}

export default FeatureIcon;