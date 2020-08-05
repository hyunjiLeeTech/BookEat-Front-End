import React, { Component } from "react";
import MainContainer from "../../component/Style/MainContainer";
// import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import "./ViewCustomerProfile.css";
// import { Tab } from "bootstrap";
// import authService from "../../Services/AuthService";
import serverAddress from "../../Services/ServerUrl";
import ds from "../../Services//dataService";
import Axios from "axios";
import ChangePassword from "../../component/Forms/Customer/ChangePassword"
import CustomerReservationHistory from "../../Reservation/Customer/CustomerReservationHistory"
import CustomerReviewHistory from "../../Review/Customer/CustomerReviewHistory"
import FullscreenError from "../../component/Style/FullscreenError"

const regExpPhone = RegExp(
  /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const formValid = ({ isError, ...customer }) => {
  let isValid = false;

  Object.values(isError).forEach((val) => {
    if (val.length > 0) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  Object.values(customer).forEach((val) => {
    console.log(customer);
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
      isError: {
        firstname: "&#160;",
        lastname: "&#160;",
        phonenumber: "&#160;",
      },
      disabled: true,
      resultsErr: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleSubmitCustomerProfile = this.handleSubmitCustomerProfile.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "firstname":
        isError.firstname =
          value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";

        break;
      case "lastname":
        isError.lastname =
          value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";
        break;
      case "phonenumber":
        isError.phonenumber = regExpPhone.test(value)
          ? "&#160;"
          : "Phone Number is invalid";
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [e.target.id]: e.target.value,
    });
  };

  handleSubmitCustomerProfile = (e) => {
    e.preventDefault();
    console.log("submit customer profile")
    if (formValid(this.state)) {
      ds.editCustomerProfile(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };


  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      Axios.post(serverAddress + "/updatecustomerinfo", this.state).then(
        (customer) => {
          console.log(customer);
          if (customer.data.errcode === 0) {
            $("#updateResultText")
              .text("Profile update is finished.")
              .removeClass("alert-warning")
              .removeClass("alert-danger")
              .removeClass("alert-success")
              .addClass("alert-success");
          } else {
            $("#updateResultText")
              .text("Sorry, " + customer.data.errmsg)
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
    // var t4 = document.getElementById("firstname");
    // t4.onkeypress = function (event) {
    //   if (event.keyCode === 32) return false;
    // };

    // var t5 = document.getElementById("lastname");
    // t5.onkeypress = function (event) {
    //   if (event.keyCode === 32) return false;
    // };

    // Accept term and condition click link
    $("#conditionbtn").on("click", () => {
      $("#accept-terms").removeAttr("disabled");
    });
  }
  // Edit profile - disable
  handleClick() {
    this.setState({ disabled: !this.state.disabled })

    this.changeText();
  }

  //Edit profile - button
  changeText() {
    this.setState(state => {
      return {
        edit: !state.edit
      };
    }, () => {
      if (this.state.edit) {
        $('#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#signResultModal').attr('type', 'button')
      } else {
        $('#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
      }
    });
  }

  render() {
    const { isError } = this.state;
    const { customer } = this.props;

    return (
      <MainContainer>
        {this.state.resultsErr
          ?
          FullscreenError("An error occured, please try again later")
          :
          null
        }








        <div className="container mt-3">
          <div className="card">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#myProfile">
                  My profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#password">
                  Password
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#myReservation">
                  My reservation
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#myReview">
                  My review
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            <div id="myProfile" className="container tab-pane active card">
              <form onSubmit={this.handleSubmitCustomerProfile} id="profile" className="card-body" noValidate >
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
                      className="form-control"
                      disabled={(this.state.disabled)}
                      className={isError.firstname.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                    />
                    <span className="invalid-feedback">{Parser(isError.firstname)}</span>
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
                      className="form-control"
                      disabled={(this.state.disabled)}
                      className={isError.lastname.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                    />
                    <span className="invalid-feedback">{Parser(isError.firstname)}</span>
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
                      className="form-control"
                      disabled={(this.state.disabled)}
                      className={isError.phonenumber.length > 6 ? "is-invalid form-control" : "form-control"} value={this.state.phonenumber} placeholder="Phone Number"
                      onChange={this.handleChange} required
                    />
                    <span className="invalid-feedback">{Parser(isError.phonenumber)}</span>
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
                      value={this.state.email}
                      className="form-control"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="form-inline">
                  <div className="form-group text-center ">
                    <button id='save_edit_btn' onClick={this.handleClick.bind(this)} type="button" className="btn btn-primary mr-sm-4 ">
                      {this.state.edit ? "Save Change" : "Edit"}
                    </button>
                  </div>
                  <div className="form-group text-center ">
                    {/* <Link to="/"> */}
                    <button type="button" className="btn btn-primary mr-sm-4 "
                      data-toggle="modal" data-target="#AccountDeleteResultModal"
                    >
                      Delete
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </form>
            </div>

            <div id="password" className=" tab-pane card-body">
              <form onSubmit={this.handleSubmit} noValidate>
                < ChangePassword />
              </form>
            </div>

            <div id="myReservation"
              className="container tab-pane fade ">
              <form onSubmit={this.handleSubmit} noValidate>
                <CustomerReservationHistory />
              </form>
            </div>

            <div id="myReview" className="container tab-pane fade">
              <form onSubmit={this.handleSubmit} noValidate>
                <CustomerReviewHistory />
              </form>
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
                    Edit Profile
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
                  <p className="alert alert-warning" id="customerProfileResultText">
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

        {/* DeleteMenuModal */}

        <div
          className="modal fade"
          id="AccountDeleteResultModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="AccountDeleteResultModal"
          aria-hidden="true"
        >

          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AccountDeleteResultModal">
                  Delete Profile
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
                <p className="alert alert-warning" id="DeleteResultModalText">
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

      </MainContainer>
    );
  }
}

export default ViewCustomerProfile;
