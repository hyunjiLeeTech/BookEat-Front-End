import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import GoogleSignIn from 'react-google-signin'
import MainContainer from '../../Style/MainContainer'
import './SignUp.css'



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      firstnameError: '',
      lastname: '',
      lastnameError: '',
      email: '',
      emailError: '',
      phonenumber: '',
      phonenumberError: '',
      password: '',
      passwordError: '',
      confirmpw: '',
      confirmpwError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handdleError = () => {
    let isError = false;
    const errors = {};

    if(this.state.firstname.length < 5){
      isError = true;
      errors.firstnameError="First Name wrong";
    }

    if(isError){
      this.setState({
        ...this.state,
        ...errors
      })
    }

    return isError;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // e.target.className += "was-validated";
    console.log(this.state);

    const err = this.handdleError();
    if (!err) {
      // Clear Form
      this.setState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpw: ''
      });

      this.props.handleChange({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpw: ''
      });
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

    var t2 = document.getElementById("lastname");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    }
  }

  render() {
    return (
      <MainContainer>

        <div className="container">
          <div className="page-header text-center">
            <h1>Welcome to BookEat!</h1>
          </div>

          <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
            <div className="col-xs-12 col-md-8 ">

              <div className="form-group row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label" > First Name </label>
                <div className="col-sm-6">
                  <input type="text" id="firstname" name="firstname" value={this.state.firstname} placeholder="First Name"
                    className="box form-control" onChange={this.handleChange} handdleError={this.state.firstnameError} required />
                  <div className="invalid-feedback">Bad!</div>
                  <div className="valid-feedback">Good!</div>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="lastname" className="col-sm-2 col-form-label">Last Name </label>
                <div className="col-sm-6">
                  <input type="text" id="lastname" value={this.state.lastname} placeholder="Last Name"
                    className="box form-control" onChange={this.handleChange} handdleError={this.state.lastnameError} required />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label"> Email </label>
                <div className="col-sm-6">
                  <input type="email" id="email" className="box form-control" value={this.state.email} placeholder="Email"
                    onChange={this.handleChange} handdleError={this.state.emailError} required />
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="phonenumber" className="col-sm-2 col-form-label">Phone Number </label>
                <div className="col-sm-6">
                  <input type="text" id="phonenumber" className="box form-control" value={this.state.phonenumber} placeholder="Phone Number"
                    onChange={this.handleChange} handdleError={this.state.phonenumberError} required />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password </label>
                <div className="col-sm-6">
                  <input type="password" id="password" className="box form-control" value={this.state.password} placeholder="Password"
                    onChange={this.handleChange} handdleError={this.state.passwordError} required />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="confirmpw" className="col-sm-2 col-form-label">Password Confirmation </label>
                <div className="col-sm-6">
                  <input type="password" id="confirmpw" className="box form-control" value={this.state.confirmpw} placeholder="Confirm Password"
                    onChange={this.handleChange} handdleError={this.state.confirmpwError} required />
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