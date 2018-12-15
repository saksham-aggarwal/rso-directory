import React, { Component } from 'react';
import SignUpForm from './signUpForm';
import HeaderPicture from './headerPicture';
import firebase from 'firebase/app';
import 'firebase/auth'; 

class BackgroundImage {
  constructor(url, title, description) {
    this.url = url;
    this.title = title;
    this.description = description;
  }
}

class SignUpLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: null,
      user: null,
      userID: null,
      userName: null,
      loading: true
    };
    this.authUnRegFunc = null;
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle) => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userDetails) => {
      this.setState({user: userDetails.user, userID: userDetails.user.uid, userName: handle});
      this.firebaseUserUpdate();
      return userDetails;
    })
    .then((userCredentials) => {
        let firebaseUser = userCredentials.user;
        let updatePromise = firebaseUser.updateProfile({
          displayName: handle
        })
        console.log(userCredentials.user);
        this.props.setUser(this.state.user);
        console.log(updatePromise);
        return updatePromise;
    })
    .catch((error) => { //report any errors
      console.log('Error in signUp');
        this.setState({errorMessage: error.message})
    });
  }



  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
          this.setState({user: user.user, userID: user.user.uid, userName: user.user.displayName});
          this.props.setUser(this.state.user);
      })
      .catch((err) => {
        console.log('Error in signIn');
        this.setState({errorMessage: err.message})
      })
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signOut()
      .catch((err) => {
        this.setState({errorMessage: err.message})
    })
  }

  firebaseUserUpdate = () => {
    firebase.database().ref('users/' + this.state.userID).set({
        userName: this.state.userName,
        userID: this.state.userID
    });
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        this.setState({user: firebaseUser, userID: firebaseUser.uid, userName: firebaseUser.displayName, loading: false});
      } else {
        this.setState({user: null, loading: true});
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  render() {

    let content = null; //content to render
    let spinnerContent = null;

    if(!this.state.user) {
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={this.handleSignUp} 
            signInCallback={this.handleSignIn}
            />
        </div>
      );
    } 
    else {
      content = (
        <div>
            <h4 className="alert text-center">{"Already logged in as " + this.state.userName}</h4>
            <div className="text-center">
              {this.state.user &&
                <button className="btn btn-warning" onClick={this.handleSignOut}>
                  Log Out
                </button>
              }
            </div>
        </div>
      );
    }

    var img = new BackgroundImage("url('./img/login-page.jpg')", "Login/SignUp here.",
    'Have a more personalized experience on this application.');

    return (
    <div>
        <section className="header-picture">
          <HeaderPicture image = {img}> </HeaderPicture>
        </section>
        
        <section className="search">
          <div className="main main-raised">
            <div className="container">
              <div className="row">
                <div className="col s12 m6">
                    <div>
                        {this.state.errorMessage &&
                        <p className="alert alert-danger">{this.state.errorMessage}</p>
                        }
                        {content}
                    </div>   
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default SignUpLogin;