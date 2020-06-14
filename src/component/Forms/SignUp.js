import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import GoogleSignIn from 'react-google-signin'
import MainContainer from '../Style/MainContainer'
import './SignUp.css'



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
      confirmpw: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  // Google Sign In 
  // onSignIn(userProfile, accessToken) {
  //   console.log(userProfile)
  // }

  // signOut() {
  //   this.googleAuth.signOut();
  // }

  componentDidMount(){
    var t1 = document.getElementById("firstname");
    t1.onkeypress = function(event){
      if(event.keyCode == 32) return false;
    }

    var t2 = document.getElementById("lastname");
    t2.onkeypress = function(e){
      if(e.keyCode == 32) return false;
    }
  }

  render() {
    return (
      <MainContainer>
        
        <div className="container">
          <div className="page-header text-center">
            <h1>Welcome to BookEat!</h1>
          </div>
        
        <form  onSubmit={this.handleSubmit}>
          <div className="col-xs-12 col-md-8 ">
            <div className="form-group ">
              
              <label htmlFor="firstname" >
                First Name:
                
                  <input type="text" id="firstname" vakue="this.state.firstname" className="signup form-control" onChange={this.handleChange} />
                  
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="lastname">
                Last Name:
        <input type="text" id="lastname" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email:
        <input type="email" id="email" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="phonenumber">
                Phone Number:
        <input type="text" id="phonenumber" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password:
        <input type="password" id="password" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="confirmpw">
                Password Confirmation:
        <input type="password" id="confirmpw" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" >Sign Up</button>
              <p>Already a member? <Link> Log In </Link></p>
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
                  <button className="btn btn-primary">Restaurant</button>
                </Link>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-md-4">
              
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