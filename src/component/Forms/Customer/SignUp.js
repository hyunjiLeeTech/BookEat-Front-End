import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import GoogleSignIn from 'react-google-signin'
import MainContainer from '../../Style/MainContainer'
import './SignUp.css'


//Validation 
const regExpEmail = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

const regExpPhone =  RegExp(
  /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach(val => {
    if (val.length > 0) {
      isValid = false
    } else {
      isValid = true
    }
  });

  Object.values(rest).forEach(val => {
    if (val === null) {
      isValid = false
    } else {
      isValid = true
    }
  });

  return isValid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
      confirmpw: '',
      isError: {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpw: ''
      }
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
          value.length >= 1 && value.length <= 32 ? "Atleast 1 character required" : "";
        break;
      case "lastname":
        isError.lastname =
          value.length >= 1 && value.length <= 32 ? "Atleast 1 character required" : "";
        break;
      case "email":
        isError.email = regExpEmail.test(value)
          ? ""
          : "Email address is invalid";
        break;
        case "phonenumber":
        isError.phonenumber = regExpPhone.test(value)
          ? "" : "Phone Number is invalid";
        break;
      case "password":
        isError.password =
          value.length >= 6 && value.length <= 32  ? "Atleast 6 characters required" : "";
        break;
      case "confirmpw":
          isError.confirmpw =
            value.length >= 6 && value.length <= 32  ? "Atleast 6 characters required" : "";
          break;
      default:
        break;
    }
    this.setState({
      isError,
      [e.target.id]: e.target.value
    });
  }
   

  handleSubmit = (e) => {
    e.preventDefault();
    // e.target.className += "was-validated";
    if (formValid(this.state)) {
      console.log(this.state)
    } else {
      console.log("Form is invalid!");
    }

  }

  // Google Sign In 
  // onSignIn(userProfile, accessToken) {
  //   console.log(userProfile)
  // }

  // signOut() {
  //   this.googleAuth.signOut();
  // }

  componentDidMount() {
  

    var t1 = document.getElementById("firstname");
    t1.onkeypress = function (event) {
      if (event.keyCode === 32) return false;
    }

    // var t2 = document.getElementById("lastname");
    // t2.onkeypress = function (e) {
    //   if (e.keyCode === 32) return false;
    // }

  }

  render() {
    const { isError } = this.state;

    return (
      <MainContainer>

        <div className="container">
          <div className="page-header text-center">
            <h1>Welcome to BookEat!</h1>
          </div>

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="col-xs-12 col-md-8 ">

              <div className="form-group row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label" > First Name </label>
                <div className="col-sm-6">
                  <input type="text" id="firstname" name="firstname" value={this.state.firstname} placeholder="First Name"
                    className={isError.firstname.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                    {isError.firstname.length > 0 && (
                        <span className="invalid-feedback">{isError.firstname}</span>
                    )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="lastname" className="col-sm-2 col-form-label">Last Name </label>
                <div className="col-sm-6">
                  <input type="text" id="lastname" value={this.state.lastname} placeholder="Last Name"
                    className={isError.lastname.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange}  required />
                    {isError.lastname.length > 0 && (
                        <span className="invalid-feedback">{isError.lastname}</span>
                    )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label"> Email </label>
                <div className="col-sm-6">
                  <input type="email" id="email" className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"} value={this.state.email} placeholder="Email"
                    onChange={this.handleChange} required />
                    {isError.email.length > 0 && (
                        <span className="invalid-feedback">{isError.email}</span>
                    )}
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="phonenumber" className="col-sm-2 col-form-label">Phone Number </label>
                <div className="col-sm-6">
                  <input type="text" id="phonenumber" className={isError.phonenumber.length > 0 ? "is-invalid form-control" : "form-control"} value={this.state.phonenumber} placeholder="Phone Number"
                    onChange={this.handleChange}  required />
                    {isError.phonenumber.length > 0 && (
                        <span className="invalid-feedback">{isError.phonenumber}</span>
                    )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password </label>
                <div className="col-sm-6">
                  <input type="password" id="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"} value={this.state.password} placeholder="Password"
                    onChange={this.handleChange} required />
                    {isError.password.length > 0 && (
                        <span className="invalid-feedback">{isError.password}</span>
                    )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="confirmpw" className="col-sm-2 col-form-label">Password Confirmation </label>
                <div className="col-sm-6">
                  <input type="password" id="confirmpw" className={isError.confirmpw.length > 0 ? "is-invalid form-control" : "form-control"} value={this.state.confirmpw} placeholder="Confirm Password"
                    onChange={this.handleChange}  required />
                    {isError.confirmpw.length > 0 && (
                        <span className="invalid-feedback">{isError.confirmpw}</span>
                    )}
                </div>
              </div>

              <div className="form-group ">
                <div className="form-check">
                  <input type="checkbox" id="accept-terms" className="form-check-input" required />
                  <label htmlFor="accept-terms" className="form-check-label">Accept Terms &amp; Conditions</label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary" >Sign Up</button>
                <p>Already a member? <Link to='/SignUp'> Log In </Link></p>
              </div>
            </div>
          </form>


          <div className="col-xs-6 col-md-4">
            <div className="resbox">
              <h4>Be part of BookEat</h4>
              <p>Want to advertise your restaurant?
            Sign Up here and be part of the BookEat Family!</p>
              <div className="text-center">
                <Link to="/RestaurantSignUp">
                  <button className="btn btn-primary">Restaurant Sign Up</button>
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