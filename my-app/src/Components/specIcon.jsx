import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';

class SpecIcon extends Component {
  render() {
    const picStyle = {
      width: '20%'
     }; 
    return(
      <div className="col-md-4">
          <img src={this.props.img} alt={this.props.alt} style={picStyle}/>
          <div className="container">
            <h4><b>{this.props.title}</b></h4> 
            <p>{this.props.description}
            </p> 
          </div>
      </div>
    );
  }
}

export default SpecIcon;