import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'; 

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    }
  }

  render() {

    let loginString = '';
    if(this.props.userFromParent) {
      loginString = 'Log Out';
    } else {
      loginString = 'Login/Register';
    }

    let content = null;
    content = (
      <li>
        <NavLink className="nav-link" onclick="scrollToDownload()" to="/SignUpLogin" activeClassName="activeLink">
          <button className="btn btn-warning">
            {loginString}
          </button>
        </NavLink>
      </li>
    )

    return (
      <nav className="navbar navbar-transparent fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" onclick="scrollToDownload()" exact to="/" activeClassName="activeLink">
                    <i className="material-icons">home</i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onclick="scrollToDownload()" to="/DesignSpec" activeClassName="activeLink">
                    <i className="material-icons">color_lens</i>
                  </NavLink>
                  </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onclick="scrollToDownload()" exact to="/Newsfeed" activeClassName="activeLink">
                    <i className="material-icons">library_books</i>
                  </NavLink>
                </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" onclick="scrollToDownload()" to="/EventSearch" activeClassName="activeLink">
                      <i className="material-icons">today</i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" onclick="scrollToDownload()" to="/createRSO" activeClassName="activeLink">
                      <i className="material-icons">create</i>
                    </NavLink>
                  </li>
                   <li className="nav-item">
                    <NavLink className="nav-link" onclick="scrollToDownload()" to="/RSODisplay" activeClassName="activeLink">
                      <i className="material-icons">group</i>
                    </NavLink>
                  </li>
                  {content}
                  <li className="nav-item">
                    <a className="nav-link" href="https://uws-community.symplicity.com/index.php?au=&ck=" onclick="scrollToDownload()">
                      Current RSO Directory
                    </a>
                  </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
