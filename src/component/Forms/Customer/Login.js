import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../../Style/MainContainer";
import "./SignUp.js";
import Parser from "html-react-parser";
import $, { data } from "jquery";
import FaceBook from "../../../Image/FACEBOOK.PNG";
import Google from "../../../Image/google.PNG";
import Axios from 'axios'
import serverAddress from '../../../Services/ServerUrl';
import authService from '../../../Services/AuthService';
import authHeader from "../../../Services/authHeader";
import sha256 from 'crypto-js/sha256';
//import FaceBook from "../../../Image/FACEBOOK.PNG";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import ds from '../../../Services/dataService';
//Validation
const regExpEmail = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const regExpPassword = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/
);

//Google ID
const CLIENT_ID = '377822834291-u5q8t038me7rn1k5gieq1b6qrohgqedf.apps.googleusercontent.com';


const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach((val) => {
    if (val.length > 0) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  Object.values(rest).forEach((val) => {
    if (val === null) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  return isValid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogined: false,
      accessToken: '',
      isError: {
        email: "&#160;",
        password: "&#160;",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "email":
        isError.email = regExpEmail.test(value)
          ? "&#160;"
          : "Email address is invalid";
        break;
      case "password":
        isError.password = regExpPassword.test(value)
          ? "&#160;"
          : "At least 6 characters required";
        this.state.password = value;
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      $("#login-btn").attr("disabled", "true").text("Please Wait")
      console.log(this.state);
      var hashedpw = sha256(this.state.password).toString(); //hashing password
      authService.login(this.state.email, hashedpw).then(res => {
        if (res.data.errcode === 0) {
          console.log(authService.getCurrentUser());
          console.log("Testing auth");
          ds.getCustomerInformation().then(res=>{
            console.log(res);
            window.location.href = "/" //redirect to home page after login, set location.href to refresh the page.
          }).catch(err => {
            console.log(err);
          })
        } else { //TODO: Login operation failed on serverside
          console.log(res.data.errmsg)
          alert(res.data.errmsg);
          $("#login-btn").removeAttr("disabled").text("Login");
          $("#passowrd").text("");
          this.state.password = "";
        }
      })
    } else {
      console.log("Form is invalid!");
    }
  };

  //Google Log In
  login(response) {
    if (response.Zi.access_token) {
      this.setState(state => ({
        isLogined: true,
        accessToken: response.Zi.access_token
      }));
    }
  }

  logout(response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure(response) {
    console.log('Failed to log in')
  }

  handleLogoutFailure(response) {
    console.log('Failed to log out')
  }

  componentDidMount() {
    if (authService.getCurrentUser() != null) {
      console.log("Already logged in, redirecting to log out");
      //url params can be modified.
      window.location.href = "/logout?redirectUrl=/login&message=You already logged in"
    }



    // Avoid spacing on the form

    var t2 = document.getElementById("email");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t3 = document.getElementById("password");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };

    //Facebook LogIn
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '186311976091336',
        cookie: true,
        xfbml: true,
        version: 'v7.0'
      });

      window.FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


  }

  // Facebook
  responseFacebook(response) {
    console.log(response)
  }

  render() {
    const { isError } = this.state;

    return (
      <MainContainer>
        <div className="card">
          <div className="card-body">
            <div className="page-header text-center">
              <h3>Log in</h3>
            </div>
            <div className="form-group text-center">

              <div>
                 <FacebookLogin
                appId="186311976091336"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
              </div>
            
              <div>
                {this.state.isLogined ?
                  <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText='Logout'
                    onLogoutSuccess={this.logout}
                    onFailure={this.handleLogoutFailure}
                  >
                  </GoogleLogout> : <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText='Login'
                    onSuccess={this.login}
                    onFailure={this.handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                  />
                }
                {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null}

              </div>



            </div>

            <form onSubmit={this.handleSubmit} noValidate>
              <div className="form-group row">
                <div className="col-sm-1"></div>
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={
                      isError.email.length > 6
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.email}
                    placeholder="Email"
                    onChange={this.handleChange}
                    required
                  />
                  
                    <span className="invalid-feedback">
                      {Parser(isError.email)}
                    </span>
                 
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-1"></div>
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-6 ">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className={
                      isError.password.length > 6
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    required
                  />
                 
                    <span className="invalid-feedback">
                      {Parser(isError.password)}
                    </span>
              
                </div>
              </div>

              <div className="form-group  ">
                <div className="text-center">

                  <button type="submit" id="login-btn" className="btn btn-primary">
                    Log in
                    </button>

                  <p>
                    <br />
                    <br />
                    <Link to="/SignUp"> Don't have an account ? </Link>
                  </p>
                  <p>
                    <Link to="/ForgotPassword"> Forget your password ? </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default Login;
