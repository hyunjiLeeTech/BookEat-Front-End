import React, { Component } from "react";
import MainContainer from "../Style/MainContainer";
import Facebook from "../../Css/Facebook.PNG";

class LoginExternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      //value: e.target.value
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.state);
  };

  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="page-header">
            <h1>Login</h1>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </MainContainer>
    );
  }
}

export default LoginExternal;
