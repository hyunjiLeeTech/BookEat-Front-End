import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../../component/Style/MainContainer";
import "./RestaurantProfile.css";
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

const regExpPostal = RegExp(/^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/);

const regExpNumbers = RegExp(/^[0-9]*$/);

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

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resname: "",
      streetnumber: "",
      streetname: "",
      province: "",
      city: "",
      postalcode: "",
      phonenumber: "",
      email: "",
      businessnumber: "",
      cuisineStyle: "",
      category: "",
      priceRange: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      sunday: "",
      saturday: "",
      description: "",
      picture: "",
      firstName: "",
      lastName: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      isError: {
        resname: "&#160;",
        streetnumber: "&#160;",
        streetname: "&#160;",
        province: "&#160;",
        city: "&#160;",
        postalcode: "&#160;",
        phonenumber: "&#160;",
        email: "&#160;",
        businessnumber: "&#160;",
        cuisineStyle: "&#160;",
        category: "&#160;",
        priceRange: "&#160;",
        monday: "&#160;",
        tuesday: "&#160;",
        wednesday: "&#160;",
        thursday: "&#160;",
        friday: "&#160;",
        sunday: "&#160;",
        saturday: "&#160;",
        description: "&#160;",
        picture: "&#160;",
        firstName: "&#160;",
        lastName: "&#160;",
        password: "&#160;",
        newPassword: "&#160;",
        confirmPassword: "&#160;",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = this.state.isError;
    switch (name) {
      case "resname":
        isError.resname =
          value.length >= 3 && value.length <= 50
            ? "&#160;"
            : "Atleast 3 character required";
        break;
      case "streetnumber":
        isError.streetnumber = regExpNumbers.test(value)
          ? "&#160;"
          : "Atleast 1 number required";
        break;
      case "streetname":
        isError.streetname =
          value.length >= 4 && value.length <= 255
            ? "&#160;"
            : "Atleast 4 character required";
        break;
      case "city":
        isError.city =
          value.length >= 2 && value.length <= 50
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "province":
        isError.province =
          value.length >= 2 && value.length <= 32
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "postalcode":
        isError.postalcode = regExpPostal.test(value)
          ? "&#160;"
          : "Invalid postal code";
        break;
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
      case "businessnumber":
        isError.businessnumber = regExpNumbers.test(value)
          ? "&#160;"
          : "Invalid business number";
        break;
      case "description":
        isError.description =
          value.length >= 1 && value.length <= 255
            ? "&#160;"
            : "Atleast write something";
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
      case "confirmPassword":
        this.state.confirmPassword = value;
        isError.confirmPassword =
          this.state.confirmPassword === this.state.newPassword
            ? "&#160;"
            : "Password not matching";
        break;
      default:
        break;
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const usr = authService.getCurrentUser();

      console.log(usr.user._id);
      this.state.password = sha256(this.state.password).toString(); //hashing password
      this.state.confirmpw = sha256(this.state.confirmpw).toString();
      console.log(this.state);
      Axios.post(serverAddress + "/managersignup", this.state)
        .then((res) => {
          console.log(res);
          if (res.data.errcode === 0) {
            $("#signResultText")
              .text("Manager account is created")
              .removeClass("alert-warning")
              .removeClass("alert-danger")
              .removeClass("alert-success")
              .addClass("alert-success");
          } else {
            $("#signResultText")
              .text("Sorry, " + res.data.errmsg)
              .removeClass("alert-warning")
              .removeClass("alert-danger")
              .removeClass("alert-success")
              .addClass("alert-danger");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Form is invalid!");
    }
  };

  handleMultiplePictures = (e) => {
    this.setState({
      picture: [...this.state.picture, ...e.target.pictures],
    });
  };
  componentDidMount() {
    // Avoid spacing on the form
    var t1 = document.getElementById("streetnumber");
    t1.onkeypress = function (event) {
      if (event.keyCode === 32) return false;
    };
    var t2 = document.getElementById("email");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t5 = document.getElementById("businessnumber");
    t5.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t6 = document.getElementById("phonenumber");
    t6.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };

    //Disable Button 
    $(document).ready(function () {
      $("#mondisablebutton").click(function () {
        if ($("#monOpenTime").prop("disabled")) {
          $("#monOpenTime").attr("disabled", false);
          $("#monCloseTime").attr("disabled", false);
        } else {
          $("#monOpenTime").attr("disabled", true);
          $("#monCloseTime").attr("disabled", true);
        }
      });

      $("#tuedisablebutton").click(function () {
        if ($("#tueOpenTime").prop("disabled")) {
          $("#tueOpenTime").attr("disabled", false);
          $("#tueCloseTime").attr("disabled", false);
        } else {
          $("#tueOpenTime").attr("disabled", true);
          $("#tueCloseTime").attr("disabled", true);
        }
      });

      $("#weddisablebutton").click(function () {
        if ($("#wedOpenTime").prop("disabled")) {
          $("#wedOpenTime").attr("disabled", false);
          $("#wedCloseTime").attr("disabled", false);
        } else {
          $("#wedOpenTime").attr("disabled", true);
          $("#wedCloseTime").attr("disabled", true);
        }
      });

      $("#thudisablebutton").click(function () {
        if ($("#thuOpenTime").prop("disabled")) {
          $("#thuOpenTime").attr("disabled", false);
          $("#thuCloseTime").attr("disabled", false);
        } else {
          $("#thuOpenTime").attr("disabled", true);
          $("#thuCloseTime").attr("disabled", true);
        }
      });

      $("#fridisablebutton").click(function () {
        if ($("#friOpenTime").prop("disabled")) {
          $("#friOpenTime").attr("disabled", false);
          $("#friCloseTime").attr("disabled", false);
        } else {
          $("#friOpenTime").attr("disabled", true);
          $("#friCloseTime").attr("disabled", true);
        }
      });

      $("#satdisablebutton").click(function () {
        if ($("#satOpenTime").prop("disabled")) {
          $("#satOpenTime").attr("disabled", false);
          $("#satCloseTime").attr("disabled", false);
        } else {
          $("#satOpenTime").attr("disabled", true);
          $("#satCloseTime").attr("disabled", true);
        }
      });

      $("#sundisablebutton").click(function () {
        if ($("#sunOpenTime").prop("disabled")) {
          $("#sunOpenTime").attr("disabled", false);
          $("#sunCloseTime").attr("disabled", false);
        } else {
          $("#sunOpenTime").attr("disabled", true);
          $("#sunCloseTime").attr("disabled", true);
        }
      });

    });

    

  }

  //Manager Create Button Form

  onClick() {
    // On click we change our state – this will trigger our `render` method
    const usr = authService.getCurrentUser();
    console.log(usr.user._id);
    this.setState({ showForm: true, accountId: usr.user._id });
  }

  renderForm() {
    const { isError } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
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

        <button
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#signResultModal"
        >
          Submit
        </button>
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

  render() {
    const { isError } = this.state;
    const { showForm } = this.state;
    return (
      <MainContainer>
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                {/* <Link to='#restaurantProfile'>
                                    <button className="nav-link active" data-toggle="tab">  My Profile</button>
                                </Link> */}
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  role="tab"
                  href="#restaurantProfile"
                  aria-controls="restaurantProfile"
                  aria-selected="true"
                >
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/'>
                                    <button className="nav-link" data-toggle="tab">Menu</button>
                                </Link> */}
                <a
                  class="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#menu"
                  aria-controls="menu"
                  aria-selected="false"
                >
                  Menu
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='#managerAccount'>
                                    <button className="nav-link" data-toggle="tab">Manager</button>
                                </Link> */}
                <a
                  class="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#managerAccount"
                  aria-controls="managerAccount"
                  aria-selected="false"
                >
                  Manager
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/ChangePassword'>
                                    <button className="nav-link" data-toggle="tab">Password</button>
                                </Link> */}
                <a
                  class="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#changePassword"
                  aria-controls="changePassword"
                  aria-selected="false"
                >
                  Password
                </a>
              </li>
            </ul>
          </div>

          <div className="card-body">
            {/* Start of Restaurant Profile */}
            <div className="tab-content">
              <div
                id="restaurantProfile"
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="restaurantProfile"
              >
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group row">
                    <label
                      htmlFor="resname"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Restaurant Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        id="resname"
                        name="resname"
                        value={this.state.resname}
                        placeholder="Restaurant Name"
                        className={
                          isError.resname.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.resname)}
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="streetnumber"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Street Number
                    </label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        id="streetnumber"
                        name="streetnumber"
                        value={this.state.streetnumber}
                        placeholder="Street Number"
                        className={
                          isError.streetnumber.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.streetnumber)}
                      </span>
                    </div>

                    <label
                      htmlFor="streetname"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Street Name
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        id="streetname"
                        name="streetname"
                        value={this.state.streetname}
                        placeholder="Street Name"
                        className={
                          isError.streetname.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.streetname)}
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="city" className="col-sm-2 col-form-label">
                      {" "}
                      City
                    </label>
                    <div className="col-md-3">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={this.state.city}
                        placeholder="City"
                        className={
                          isError.city.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.city)}
                      </span>
                    </div>

                    <label
                      htmlFor="province"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Province
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={this.state.province}
                        placeholder="Province"
                        className={
                          isError.province.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.province)}
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="postalcode"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Postal Code
                    </label>
                    <div className="col-md-3">
                      <input
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        value={this.state.postalcode}
                        placeholder="Postal Code"
                        className={
                          isError.postalcode.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.postalcode)}
                      </span>
                    </div>
                    <label
                      htmlFor="phonenumber"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Phone Number
                    </label>
                    <div className="col-md-5">
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
                      <span className="invalid-feedback">
                        {Parser(isError.email)}
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="businessnumber"
                      className="col-sm-2 col-form-label"
                    >
                      {" "}
                      Business Number
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        id="businessnumber"
                        name="businessnumber"
                        value={this.state.businessnumber}
                        placeholder="Business Number"
                        className={
                          isError.businessnumber.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        onChange={this.handleChange}
                        required
                      />
                      <span className="invalid-feedback">
                        {Parser(isError.businessnumber)}
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="cuisineStyle"
                      className="col-sm-2 col-form-label"
                    >
                      Cuisine Style
                    </label>
                    <div className="col-md-10">
                      <select
                        className="custom-select "
                        id="cuisineStyle"
                        name="cuisineStyle"
                        value={this.state.cuisineStyle}
                        onChange={this.handleChange}
                      >
                        <option>Choose Style</option>
                        <option value="american">American</option>
                        <option value="italian">Italian</option>
                        <option value="steakhouse">Steak House</option>
                        <option value="seafood">Seafood</option>
                        <option value="french">French</option>
                        <option value="indian">Indian</option>
                        <option value="japanese">Japanese</option>
                        <option value="british">British</option>
                        <option value="barbecue">Barbecue</option>
                        <option value="tapas">Tapas</option>
                        <option value="grill">Grill</option>
                        <option value="conformfood">Conform Food</option>
                        <option value="afternoontea">Afternoon Tea</option>
                        <option value="burgers">Burgers</option>
                        <option value="canadian">Canadian</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegiterian">Vegetarian</option>
                        <option value="asian">Asian</option>
                        <option value="european">European</option>
                        <option value="continental">Continental</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="category"
                      className="col-sm-2 col-form-label"
                    >
                      Category
                    </label>
                    <div className="col-md-10">
                      <select
                        className="custom-select "
                        id="category"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                      >
                        <option>Choose Category</option>
                        <option value="ethinic">Ethinic</option>
                        <option value="fastfood">Fast Food</option>
                        <option value="fastcasual">Fast Casual</option>
                        <option value="casualdining">Casual Dining</option>
                        <option value="premiumdining">Premium Dining</option>
                        <option value="familydining">Family Dining</option>
                        <option value="finedining">Fine Dining</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="priceRange"
                      className="col-sm-2 col-form-label"
                    >
                      Price Range
                    </label>
                    <div className="col-md-10">
                      <select
                        className="custom-select "
                        id="priceRange"
                        name="priceRange"
                        value={this.state.priceRange}
                        onChange={this.handleChange}
                      >
                        <option>Choose Range</option>
                        <option value="low">$0-$50</option>
                        <option value="medium">$50-$100</option>
                        <option value="high">$100+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="openHours"
                      className="col-sm-2 col-form-label"
                    >
                      Open Hours
                    </label>
                    <div className="col-md-10">
                      <label
                        htmlFor="monday"
                        className="col-sm-2 col-form-label"
                      >
                        Monday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="monOpenTime"
                        name="monOpenTime"
                        // value={this.state.monday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="monCloseTime"
                        name="monCloseTime"
                        // value={this.state.monday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="mondisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="tuesday"
                        className="col-sm-2 col-form-label"
                      >
                        Tuesday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="tueOpenTime"
                        name="tueOpenTime"
                        value={this.state.tuesday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="tueCloseTime"
                        name="tueCloseTime"
                        value={this.state.tuesday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="tuedisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="wednesday"
                        className="col-sm-2 col-form-label"
                      >
                        Wednesday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="wedOpenTime"
                        name="wedOpenTime"
                        //value={this.state.wednesday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="wedCloseTime"
                        name="wedCloseTime"
                        //value={this.state.wednesday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="weddisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="thursday"
                        className="col-sm-2 col-form-label"
                      >
                        Thursday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="thuOpenTime"
                        name="thuOpenTime"
                        //value={this.state.thursday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="thuCloseTime"
                        name="thuCloseTime"
                        //value={this.state.thursday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="thudisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="friday"
                        className="col-sm-2 col-form-label"
                      >
                        Friday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="friOpenTime"
                        name="friOpenTime"
                       // value={this.state.friday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="friCloseTime"
                        name="friCloseTime"
                        //value={this.state.friday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="fridisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="saturday"
                        className="col-sm-2 col-form-label"
                      >
                        Saturday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="satOpenTime"
                        name="satOpenTime"
                        //value={this.state.saturday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="satCloseTime"
                        name="satCloseTime"
                        //value={this.state.saturday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="satdisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>

                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-md-10">
                      <label
                        htmlFor="sunday"
                        className="col-sm-2 col-form-label"
                      >
                        Sunday
                      </label>
                      <select
                        className="custom-select col-md-3"
                        id="sunOpenTime"
                        name="sunOpenTime"
                        //value={this.state.sunday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Open Time</option>
                        <option value="7am">7:00 AM</option>
                        <option value="730am">7:30 AM</option>
                        <option value="8am">8:00 AM</option>
                        <option value="830am">8:30 AM</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                      </select>
                      ~
                      <select
                        className="custom-select col-md-3"
                        id="sunCloseTime"
                        name="sunCloseTime"
                        //value={this.state.sunday}
                        onChange={this.handleChange}
                      >
                        <option>Choose Close Time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="930am">9:30 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="1030am">10:30 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="1130am">11:30 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1230pm">12:30 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="130pm">1:30 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="230pm">2:30 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="330pm">3:30 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="430pm">4:30 PM</option>
                        <option value="5pm">5:00 PM</option>
                        <option value="530pm">5:30 PM</option>
                        <option value="6pm">6:00 PM</option>
                        <option value="630pm">6:30 PM</option>
                        <option value="7pm">7:00 PM</option>
                        <option value="730pm">7:30 PM</option>
                        <option value="8pm">8:00 PM</option>
                        <option value="830pm">8:30 PM</option>
                        <option value="9pm">9:00 PM</option>
                        <option value="930pm">9:30 PM</option>
                        <option value="10pm">10:00 PM</option>
                        <option value="1030pm">10:30 PM</option>
                        <option value="11pm">11:00 PM</option>
                        <option value="1130pm">11:30 PM</option>
                        <option value="12am">12:00 AM</option>
                        <option value="1230am">12:30 AM</option>
                        <option value="1am">1:00 AM</option>
                        <option value="130am">1:30 AM</option>
                      </select>
                      <label className="col-sm-1 col-form-label"></label>
                      <button
                        type="button"
                        className="btn btn-outline-dark col-sm-2"
                        id="sundisablebutton"
                      >
                        {" "}
                        Not Open{" "}
                      </button>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="picture"
                      className="col-sm-2 col-form-label"
                    >
                      Restaurant Picture
                    </label>
                    <div className="custom-file col-md-10">
                      <input
                        type="file"
                        multiple
                        className="custom-file-input col-md-10"
                        id="picture"
                        name="picture"
                        value={this.state.picture}
                        onChange={this.handleMultiplePictures}
                      />
                      <label
                        className="custom-file-label form-group"
                        htmlFor="picture"
                      >
                        Upload Picture
                      </label>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="description"
                      className="col-sm-2 col-form-label"
                    >
                      Restaurant Description
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className={
                          isError.description.length > 6
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        rows="5"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                      ></textarea>
                      <span className="invalid-feedback">
                        {Parser(isError.description)}
                      </span>
                    </div>
                  </div>
                </form>
                <div className="panel-footer row ">
                  <div className="col-sm-6 text-left">
                    <button className="btn btn-primary">Save</button>
                  </div>

                  <div className="col-sm-6 text-right">
                    <button className="btn btn-primary" id="btn_disable">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* End of Restaurant Profile */}

              {/* Start of Manager Account*/}

              <div
                id="managerAccount"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="managerAccount"
              >
                <div className="panel-footer row ">
                  <div className="col-sm-6 text-left">
                    <button className="btn btn-primary" onClick={this.onClick}>
                      Create New Manager
                    </button>
                  </div>

                  <div className="col-sm-6 text-right">
                    <button className="btn btn-primary">View Manager</button>
                  </div>
                </div>
                <br />

                {showForm && this.renderForm()}
              </div>

              {/* End of Manager Account */}

              {/* Start Password */}
              <div
                id="changePassword"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="changePassword"
              >
                <div className="container">
                  <div className="page-header text-center">
                    <h1>Change Password</h1>
                    <br />
                  </div>
                </div>

                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                      >
                        Old Password
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="password"
                          type="password"
                          id="password"
                          className={
                            isError.password.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          value={this.state.password}
                          placeholder="Old Password"
                          onChange={this.handleChange}
                          required
                        />

                        <span className="invalid-feedback">
                          {Parser(isError.password)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="newPassword"
                        className="col-sm-2 col-form-label"
                      >
                        New Password
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="newPassword"
                          type="password"
                          id="newPassword"
                          className={
                            isError.newPassword.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          value={this.state.newPassword}
                          placeholder="New Password"
                          onChange={this.handleChange}
                          required
                        />

                        <span className="invalid-feedback">
                          {Parser(isError.newPassword)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-8 ">
                    <div className="form-group row">
                      <label
                        htmlFor="newPassword"
                        className="col-sm-2 col-form-label"
                      >
                        Confirm New Password
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="confirmPassword"
                          type="password"
                          id="confirmPassword"
                          className={
                            isError.confirmPassword.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          value={this.state.confirmPassword}
                          placeholder="Password confirmation"
                          onChange={this.handleChange}
                          required
                        />

                        <span className="invalid-feedback">
                          {Parser(isError.confirmPassword)}
                        </span>
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
              {/* End Password */}

              {/* Start Menu */}
              <div
                id="menu"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="menu"
              >
                <p> add menu here</p>
              </div>
              {/* End Menu */}
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default RestaurantProfile;
