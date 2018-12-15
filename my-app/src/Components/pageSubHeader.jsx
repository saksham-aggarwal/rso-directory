import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';

class PageSubheader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8 ml-auto mr-auto">
          <h2 className="title">{this.props.title}</h2>
          <p className="description">
            {this.props.description}
          </p>
        </div>
      </div>
    )
  }
}

export default PageSubheader;