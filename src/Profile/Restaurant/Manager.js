import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../../component/Style/MainContainer";
import Parser from "html-react-parser";
import $ from "jquery";
import Axios from "axios";
import sha256 from "crypto-js/sha256";
import serverAddress from "../../Services/ServerUrl";
import authService from "../../Services/AuthService";
import ds from "../../Services/dataService";

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
    if (val !== "&#160;") {
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

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      isError: {
        phonenumber: "&#160;",
        email: "&#160;",
        firstName: "&#160;",
        lastName: "&#160;",
        password: "&#160;",
      },
      createManager: false,
      viewManager: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.renderManager = this.renderManager.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = this.state.isError;
    switch (name) {
      case "email":
        isError.email = regExpEmail.test(value)
          ? "&#160;"
          : "Invalid email address";
        break;
      case "phonenumber":
        isError.phonenumber = regExpPhone.test(value)
          ? "&#160;"
          : "Phone Number is invalid";
        break;
      case "firstName":
        isError.firstName =
          value.length >= 2 && value.length <= 32
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "lastName":
        isError.lastName =
          value.length >= 2 && value.length <= 32
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "password":
        isError.passwordMan = regExpPassword.test(value)
          ? "&#160;"
          : "At least 6 characters required";
        this.state.passwordMan = value;
        break;
      default:
        break;
    }
    const usr = authService.getCurrentUser();
    this.setState({
      [e.target.id]: e.target.value,
      resOwnerAccountId: usr.user._id,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.state.password = sha256(this.state.password).toString(); //hashing password
      ds.createManagerAccount(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };

  onClick() {
    const usr = authService.getCurrentUser();
    console.log(usr.user._id);
    this.setState({ showForm: true });
  }

  componentDidMount() {
    // Avoid spacing on the form

    // var t2 = document.getElementById("email");
    // t2.onkeypress = function (e) {
    //     if (e.keyCode === 32) return false;
    // };

    // var t6 = document.getElementById("phonenumber");
    // t6.onkeypress = function (e) {
    //     if (e.keyCode === 32) return false;
    // };

    // var t9 = document.getElementById("password");
    // t9.onkeypress = function (e) {
    //     if (e.keyCode === 32) return false;
    // };

    $("#createManagerBtn").on("click", () => {
      this.setState({
        createManager: true,
        viewManager: false,
      });
    });

    $("#viewManagerBtn").on("click", () => {
      this.setState({
        createManager: false,
        viewManager: true,
      });
    });
  }

  renderForm() {
    const { isError } = this.state;
    return (
      <form id="manForm" onSubmit={this.handleSubmit} noValidate>
        <div className="form-group row">
          <label htmlFor="streetnumber" className="col-sm-2 col-form-label">
            {" "}
            First Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              placeholder="First Name"
              className={
                isError.firstName.length > 6
                  ? "is-invalid form-control"
                  : "form-control"
              }
              onChange={this.handleChange}
              required
            />
            <span className="invalid-feedback">
              {Parser(isError.firstName)}
            </span>
          </div>

          <label htmlFor="streetname" className="col-sm-2 col-form-label">
            {" "}
            Last Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              className={
                isError.lastName.length > 6
                  ? "is-invalid form-control"
                  : "form-control"
              }
              onChange={this.handleChange}
              required
            />
            <span className="invalid-feedback">{Parser(isError.lastName)}</span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="phonenumber" className="col-sm-2 col-form-label">
            {" "}
            Phone Number
          </label>
          <div className="col-md-4">
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={this.state.phonenumber}
              placeholder="Phone Number"
              className={
                isError.phonenumber.length > 6
                  ? "is-invalid form-control"
                  : "form-control"
              }
              onChange={this.handleChange}
              required
            />
            <span className="invalid-feedback">
              {Parser(isError.phonenumber)}
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            {" "}
            Email
          </label>
          <div className="col-md-10">
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              className={
                isError.email.length > 6
                  ? "is-invalid form-control"
                  : "form-control"
              }
              onChange={this.handleChange}
              required
            />
            <span className="invalid-feedback">{Parser(isError.email)}</span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            {" "}
            Password
          </label>
          <div className="col-md-10">
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              className={
                isError.password.length > 6
                  ? "is-invalid form-control"
                  : "form-control"
              }
              onChange={this.handleChange}
              required
            />
            <span className="invalid-feedback">{Parser(isError.password)}</span>
          </div>
        </div>

        <button className="btn btn-danger">Submit</button>
        {/* Sign up result Modal */}
        <div
          className="modal fade"
          id="signResultModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="signResultModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="signResultModalLabel">
                  Sign up
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="alert alert-warning" id="signResultText">
                  Please Wait...
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  renderView() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <button type="button" className="btn btn-danger">
                Delete
              </button>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderManager() {
    if (this.state.createManager) {
      return this.renderForm();
    } else if (this.state.viewManager) {
      return this.renderView();
    } else {
      return null;
    }
  }

  render() {
    const { showForm } = this.state;
    return (
      <MainContainer>
        <div className="panel-footer row ">
          <div className="col-sm-6 text-left">
            <button className="btn btn-primary" id="createManagerBtn">
              Create New Manager
            </button>
          </div>

          <div className="col-sm-6 text-right">
            <button className="btn btn-primary" id="viewManagerBtn">
              View Manager
            </button>
          </div>
        </div>
        <br />
        {this.renderManager()}

        {/* {
                    $('#create').click ? showForm && this.renderForm() : showForm && this.renderView()
                } */}
      </MainContainer>
    );
  }
}

export default RestaurantProfile;
