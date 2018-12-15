import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';

class HeaderPicture extends Component {
  render() {
    var img = this.props.image;
    const divStyle = {
      backgroundImage: img.url,
      width: '100vw'
    };
    return (
      <div className="page-header header-filter" data-parallax="true" style={divStyle}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="title">{img.title}</h1>
              <h4>{img.description}
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderPicture;