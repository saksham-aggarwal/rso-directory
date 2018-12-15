import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import 'firebase/database'
import firebase from 'firebase/app';
import 'firebase/auth'; 


var config = {
  apiKey: "AIzaSyABJNFmL1_ezUTFUsSzS_JCUEE2R7WA7vE",
  authDomain: "stage-4-8fd72.firebaseapp.com",
  databaseURL: "https://stage-4-8fd72.firebaseio.com",
  projectId: "stage-4-8fd72",
  storageBucket: "stage-4-8fd72.appspot.com",
  messagingSenderId: "603486464797"
  };
firebase.initializeApp(config);

ReactDOM.render((<BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
    <App />
  </BrowserRouter>), document.getElementById('root'));

