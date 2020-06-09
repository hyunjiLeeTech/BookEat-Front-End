import React, { Component } from 'react'
import MainContainer from '../Style/MainContainer'
import './SignUp.css'
import jQuery from 'jquery';
import Axios from 'axios';

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
      //value: e.target.value
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.state);
  }

  componentDidMount(){
    var $ = jQuery;
    Axios.get("http://localhost:3001/ex").then(res=>{
      $("#fromserver").text(res.data.answer);
    })
  }

  render() {
    return (
      <MainContainer>
        <div>
          <p id="fromserver">place holder</p>
        </div>
        <div class="container">
          <div class="page-header">
            <h1>Welcome to BookEat!</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">
              First Name:
        <input type="text" id="firstname" className="form-control" onChange={this.handleChange} />
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
        <input type="text" id="password" className="form-control" onChange={this.handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="confirmpw">
              Password Confirmation:
        <input type="text" id="confirmpw" className="form-control" onChange={this.handleChange} />
            </label>
          </div>
          <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
      </MainContainer>
    );
  }
}

export default SignUp;