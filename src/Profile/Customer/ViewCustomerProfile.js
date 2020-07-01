import React, { Component } from "react";
import MainContainer from "../../component/Style/MainContainer";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import "./ViewCustomerProfile.css";
import { Tab } from "bootstrap";

const regExpPassword = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/
);

const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach((val) => {
    if (val.length < 0) {
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
      confirmpw: "",
      isError: {
        password: "&#160;",
        newPassword: "&#160;",
        confirmpw: "&#160;",
      },
      disabled: true
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
       // this.state.password = value;
        break;
      case "newPassword":
        isError.newPassword = regExpPassword.test(value)
          ? "&#160;"
          : "At least 6 characters required";
        this.state.newPassword = value;
        break;
      case "confirmpw":
        this.state.confirmpw = value;
        isError.confirmpw =
          this.state.confirmpw === this.state.newPassword
           ? "&#160;" : "Password not matching"
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [e.target.id]: e.target.value,
    });
  };

  // TODO:check point -- 1.
  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
    console.log(this.state);
    } else {
    console.log("Form is invalid!");
    }
  };

  componentDidMount() {
   
    // Avoid spacing on the form

    var t3 = document.getElementById("password");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t2 = document.getElementById("newPassword");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t1 = document.getElementById("confirmpw");
    t1.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    // Accept term and condition click link
    $("#conditionbtn").on("click", () => {
      $("#accept-terms").removeAttr("disabled");
    });
  }

  // Edit profile - disable
handleClick(){
    this.setState({disabled: !this.state.disabled})

    this.changeText();
}

//Edit profile - button
changeText(){
    this.setState(state => {
        return {
            edit: !state.edit
        };
    });
}

  render() {
    const { isError } = this.state;

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
                  <label htmlFor="firstname" className="col-md-2 col-form-label">
                    {" "}
                  First Name
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      class="form-control"
                      disabled ={(this.state.disabled)}
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
                      class="form-control"
                      disabled ={(this.state.disabled)}
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
                      class="form-control"
                      disabled ={(this.state.disabled)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-md-2 col-form-label">
                    {" "}
                    Email
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      class="form-control"
                      disabled = {true}
                    />
                  </div>
                </div>

                <div className="form-inline">
                  <div className="form-group text-center ">
                      <button onClick={this.handleClick.bind(this)}  type="button" class="btn btn-primary mr-sm-4 ">
                          {this.state.edit? "Save Change" : "Edit"}
                          
                      </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="password" class="container tab-pane card">
              <div className="card-body">
                <br />
                <h3>Change password</h3>
                <br />

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
                      <input name="password" type="password" id="password" 
                      className={isError.password.length > 6 
                        ? "is-invalid form-control" : "form-control"} 
                        value={this.state.password} placeholder="Password"
                      onChange={this.handleChange} required />
                    <span className="invalid-feedback">{Parser(isError.password)}</span>
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
                      <input name="newPassword" type="password" id="newPassword" className={isError.newPassword.length > 6
                      ? "is-invalid form-control" : "form-control"} value={this.state.newPassword} placeholder="Password"
                      onChange={this.handleChange} required />
                    <span className="invalid-feedback">{Parser(isError.newPassword)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="confirmpw"
                        className="col-sm-3 col-form-label"
                      >
                        Password confirmation{" "}
                      </label>
                      <div className="col-sm-6">
                      <input type="password" name="confirmpw" id="confirmpw" className={isError.confirmpw.length > 6 ? "is-invalid form-control" : "form-control"} value={this.state.confirmpw} placeholder="Confirm Password"
                      onChange={this.handleChange} required />
                    <span className="invalid-feedback">{Parser(isError.confirmpw)}</span>
                      </div>
                    </div>

                    <div className="form-group ">
                      <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change password
                          </button>
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
                <h3> Upcomming reservation</h3>
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
        </div>
      </MainContainer>
    );
  }
}

export default ViewCustomerProfile;
