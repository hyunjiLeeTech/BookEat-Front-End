import React, { Component } from "react";
import MainContainer from "../../component/Style/MainContainer";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import "./ViewCustomerProfile.css";
import { Tab } from "bootstrap";
import authService from "../../Services/AuthService";
import serverAddress from "../../Services/ServerUrl";
import ds from "../../Services//dataService";
import Axios from "axios";

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

class ViewCustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      newPassword: "",
      isError: {
        password: "&#160;",
        newPassword: "&#160;",
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
      case "password":
        isError.password = regExpPassword.test(value)
          ? "&#160;"
          : "At least 6 characters required";
        this.state.password = value;
        break;
      case "newPassword":
        isError.newPassword = regExpPassword.test(value)
          ? "&#160;"
          : "At least 6 characters required";
        this.state.newPassword = value;
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
      Axios.post(serverAddress + "/updatecustomerinfo", this.state).then(
        (res) => {
          console.log(res);
          if (res.data.errcode === 0) {
            $("#updateResultText")
              .text("Profile update is finished.")
              .removeClass("alert-warning")
              .removeClass("alert-danger")
              .removeClass("alert-success")
              .addClass("alert-success");
          } else {
            $("#updateResultText")
              .text("Sorry, " + res.data.errmsg)
              .removeClass("alert-warning")
              .removeClass("alert-danger")
              .removeClass("alert-success");
          }
        }
      );
      console.log(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };

  async componentDidMount() {
    const customer = await ds.getCustomerInformation();

    if (customer) {
      this.setState((state, props) => {
        return {
          firstname:
            typeof customer.firstName != "undefined" ? customer.firstName : "",
          lastname:
            typeof customer.lastName != "undefined" ? customer.lastName : "",
          phonenumber:
            typeof customer.phoneNumber != "undefined"
              ? customer.phoneNumber
              : "",
          email:
            typeof customer.account != "undefined"
              ? customer.account.email
              : "",
        };
      });
    }
    // Avoid spacing on the form
    var t3 = document.getElementById("password");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t2 = document.getElementById("newPassword");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    // Accept term and condition click link
    $("#conditionbtn").on("click", () => {
      $("#accept-terms").removeAttr("disabled");
    });
  }

  render() {
    const { isError } = this.state;
    const { customer } = this.props;

    return (
      <MainContainer>
        <div class="container mt-3">
          <div class="card">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#myProfile">
                  My profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#password">
                  Password
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#myReservation">
                  My reservation
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#myReview">
                  My review
                </a>
              </li>
            </ul>
          </div>

          <div class="tab-content">
            <div id="myProfile" class="container tab-pane active card">
              <div className="card-body">
                <br />
                <h3>My profile</h3>
                <br />
                <div className="form-group row">
                  <label
                    htmlFor="firstname"
                    className="col-sm-2 col-form-label"
                  >
                    {" "}
                    First Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={this.state.firstname}
                      class="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lastname" className="col-md-2 col-form-label">
                    {" "}
                    Last Name
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={this.state.lastname}
                      class="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="phonenumber"
                    className="col-md-2 col-form-label"
                  >
                    {" "}
                    Phone number
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="phonenumber"
                      name="phonenumber"
                      value={this.state.phonenumber}
                      class="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-md-2 col-form-label">
                    Email
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={this.state.email}
                      class="form-control"
                    />
                  </div>
                </div>

                <div className="form-inline">
                  <div className="form-group text-center ">
                    <Link to="/">
                      <button type="button" class="btn btn-primary mr-sm-4 ">
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div className="form-group text-center">
                    <Link to="/">
                      <button type="submit" class="btn btn-primary mr-sm-4">
                        Save change
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div id="password" class="container tab-pane card">
              <div className="card-body">
                <br />
                <h3>Change password</h3>
                <br />
                <div className="container">
                  <div className="page-header text-center">
                    <p>{this.state.password}</p>
                    <p>{this.state.confirmpw}</p>
                  </div>
                </div>

                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="password"
                        className="col-sm-3 col-form-label"
                      >
                        Old Password{" "}
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
                  </div>

                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="newPassword"
                        className="col-sm-3 col-form-label"
                      >
                        New Password{" "}
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="newPassword"
                          type="password"
                          id="newPassword"
                          className={
                            isError.newPassword.length > 0
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          value={this.state.newPassword}
                          placeholder="newPassword"
                          onChange={this.handleChange}
                          required
                        />
                        {isError.newPassword.length > 0 && (
                          <span className="invalid-feedback">
                            {Parser(isError.newPassword)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="newPassword"
                        className="col-sm-3 col-form-label"
                      >
                        Password confirmation{" "}
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="confirmPassword"
                          type="password"
                          id="confirmPassword"
                          className={
                            isError.newPassword.length > 0
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          value={this.state.newPassword}
                          placeholder="Password confirmation"
                          onChange={this.handleChange}
                          required
                        />
                        {isError.newPassword.length > 0 && (
                          <span className="invalid-feedback">
                            {Parser(isError.newPassword)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-group ">
                      <div className="text-center">
                        <Link to="/">
                          <button type="submit" className="btn btn-primary">
                            Change password
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              id="myReservation"
              class="container tab-pane fade card card-body"
            >
              <div className="form-group">
                <h3> Up comming reservation</h3>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Order Food</th>
                      <th>Visitor #</th>
                      <th>Table #</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2020-06-01</td>
                      <td>stake</td>
                      <td>5</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="form-inline">
                <div className="form-group">
                  <Link to="/">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm mr-sm-2"
                    >
                      Change reservation
                    </button>
                  </Link>
                </div>
                <div className="form-group">
                  <Link to="/">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm mr-sm-2"
                    >
                      Cancel reservation
                    </button>
                  </Link>
                </div>
              </div>
              <div class="form-group">
                <br />
                <br />
                <h3> Reservation History</h3>
                <p>
                  Thank you for loving BookEat <br />
                  Here is your BookEat history.{" "}
                </p>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Order Food</th>
                      <th>Visitor #</th>
                      <th>Table # </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2020-06-01</td>
                      <td>stake</td>
                      <td>5</td>
                      <td> 1</td>
                    </tr>
                    <tr>
                      <td>2020-06-01</td>
                      <td>stake</td>
                      <td>5</td>
                      <td> 1</td>
                    </tr>
                    <tr>
                      <td>2020-06-01</td>
                      <td>stake</td>
                      <td>5</td>
                      <td> 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="myReview" class="container tab-pane fade">
              <div className="form-group">
                <br />
                <br />
                <h3> My Rievew List</h3>
                <div>
                  <table class="table table-striped ">
                    <thead>
                      <tr class>
                        <th>Date</th>
                        <th>Review</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class>2020-06-01</td>
                        <td class>stake</td>
                        <td class>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2020-06-01</td>
                        <td>stake</td>
                        <td>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2020-06-01</td>
                        <td>wine</td>
                        <td>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </MainContainer>
    );
  }
}

export default ViewCustomerProfile;
