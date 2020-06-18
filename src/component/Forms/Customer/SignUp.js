import React, { Component } from "react";
import { Link } from "react-router-dom";
//import GoogleSignIn from 'react-google-signin'
import MainContainer from "../../Style/MainContainer";
import "./SignUp.css";
import Parser from "html-react-parser";
import $ from "jquery";

//Validation
const regExpEmail = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const regExpPhone = RegExp(
  /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const regExpPassword = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/
);

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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpw: "",
      isError: {
        firstname: "&#160;",
        lastname: "&#160;",
        email: "&#160;",
        phonenumber: "&#160;",
        password: "&#160;",
        confirmpw: "&#160;",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "firstname":
        isError.firstname =
          value.length >= 1 && value.length <= 32
            ? "&#160;"
            : "Atleast 1 character required";
        break;
      case "lastname":
        isError.lastname =
          value.length >= 1 && value.length <= 32
            ? "&#160;"
            : "Atleast 1 character required";
        break;
      case "email":
        isError.email = regExpEmail.test(value)
          ? "&#160;"
          : "Email address is invalid";
        break;
      case "phonenumber":
        isError.phonenumber = regExpPhone.test(value)
          ? "&#160;"
          : "Phone Number is invalid";
        break;
      case "password":
        isError.password = regExpPassword.test(value)
          ? "&#160;"
          : "Atleast 6 characters required";
        this.state.password = value;
        break;
      case "confirmpw":
        this.state.confirmpw = value;
        isError.confirmpw =
          this.state.confirmpw === this.state.password
            ? "&#160;"
            : "Password not matching";
        console.log(this.state.confirmpw === this.state.password);
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
      console.log(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };

  // Google Sign In
  // onSignIn(userProfile, accessToken) {
  //   console.log(userProfile)
  // }

  // signOut() {
  //   this.googleAuth.signOut();
  // }

  componentDidMount() {
    // Avoid spacing on the form
    var t1 = document.getElementById("firstname");
    t1.onkeypress = function (event) {
      if (event.keyCode === 32) return false;
    };
    var t2 = document.getElementById("email");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t3 = document.getElementById("password");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t4 = document.getElementById("confirmpw");
    t4.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    // Accept term and condition click link
    $("#conditionbtn").on("click", () => {
      $("#accept-terms").removeAttr("disabled");
    });
  }

  render() {
    const { isError } = this.state;

    return (
      <MainContainer>
        <div className="container">
          <div className="page-header text-center">
            <h1>Welcome to BookEat!</h1>
            <p>{this.state.password}</p>
            <p>{this.state.confirmpw}</p>
          </div>

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="col-xs-12 col-md-8 ">
              <div className="form-group row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label">
                  {" "}
                  First Name{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    placeholder="First Name"
                    className={
                      isError.firstname.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    onChange={this.handleChange}
                    required
                  />
                  {isError.firstname.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.firstname)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="lastname" className="col-sm-2 col-form-label">
                  Last Name{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    placeholder="Last Name"
                    className={
                      isError.lastname.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    onChange={this.handleChange}
                    required
                  />
                  {isError.lastname.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.lastname)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  {" "}
                  Email{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={
                      isError.email.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.email}
                    placeholder="Email"
                    onChange={this.handleChange}
                    required
                  />
                  {isError.email.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.email)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="phonenumber"
                  className="col-sm-2 col-form-label"
                >
                  Phone Number{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    id="phonenumber"
                    name="phonenumber"
                    className={
                      isError.phonenumber.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.phonenumber}
                    placeholder="Phone Number"
                    onChange={this.handleChange}
                    required
                  />
                  {isError.phonenumber.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.phonenumber)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Password{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className={
                      isError.password.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    required
                  />
                  {isError.password.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.password)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="confirmpw" className="col-sm-2 col-form-label">
                  Password Confirmation{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    name="confirmpw"
                    id="confirmpw"
                    className={
                      isError.confirmpw.length > 0
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    value={this.state.confirmpw}
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    required
                  />
                  {isError.confirmpw.length > 0 && (
                    <span className="invalid-feedback">
                      {Parser(isError.confirmpw)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group ">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    disabled
                    className="form-check-input"
                    required
                  />
                </div>
                <label htmlFor="accept-terms" className="form-check-label">
                  Accept{" "}
                  <Link
                    id="conditionbtn"
                    target="_blank"
                    to="/TermsAndCondition"
                  >
                    Terms &amp; Conditions
                  </Link>
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <p>
                  Already a member? <Link to="/Login"> Log In </Link>
                </p>
              </div>
            </div>
          </form>

          <div className="col-xs-6 col-md-4">
            <div className="resbox">
              <h4>Be part of BookEat</h4>
              <p>
                Want to advertise your restaurant? Sign Up here and be part of
                the BookEat Family!
              </p>
              <div className="text-center">
                <Link to="/RestaurantSignUp">
                  <button className="btn btn-primary">
                    Restaurant Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6 col-md-4">
              <h4>Test</h4>
            </div>
          </div>
          {/* <GoogleSignIn clientId="YOUR_CLIENT_ID"
          ref={g => this.googleAuth = g}
          onSuccess={this.onSignIn.bind(this)}
        />

        <button onClick={this.signOut.bind(this)}> Sign Out </button> */}
        </div>
      </MainContainer>
    );
  }
}

export default SignUp;
