import React, { Component } from "react";
import MainContainer from "../Style/MainContainer";
import Facebook from "../../Css/Facebook.PNG";
import Google from "../../Css/Google.PNG";

class LoginPage extends Component {
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
        <div>
          <a href="/LoginExternal">
            <img src={Facebook} alt="Facebook" />
          </a>
        </div>
        <div>
          <a href="/LoginExternal">
            <img src={Google} alt="Google" />
          </a>
        </div>
        <div>
          <br />
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
            <br />
            <br />
            <a href="/ForgotPasswordPage"> Forgot Password? </a>
            <br />
            <a href="/SignUp"> Don't have an accout?</a>
          </form>
        </div>
      </MainContainer>
    );
  }
}

export default LoginPage;
