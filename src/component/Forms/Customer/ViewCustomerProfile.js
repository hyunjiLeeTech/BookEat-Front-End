import React, { Component } from "react";
import MainContainer from "../../Style/MainContainer";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import "./ViewCustomerProfile.css";

class ViewCustomerProfile extends Component {
  render() {
    return (
      <MainContainer>
        <div className="container">
          <div className="page-header text-center">
            <h1>My profile</h1>
          </div>

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="col-xs-12 col-md-12 ">
              <div className="form-group row">
                <label htmlFor="firstname" className="col-sm-2 col-form-label">
                  {" "}
                  First Name{" "}
                </label>
                <div className="col-sm-6">
                  <input type="text" id="firstname" name="firstname" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12 ">
              <div className="form-group row">
                <label htmlFor="lastname" className="col-sm-2 col-form-label">
                  {" "}
                  Last Name{" "}
                </label>
                <div className="col-sm-6">
                  <input type="text" id="lastname" name="lastname" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12">
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  {" "}
                  Password{" "}
                </label>
                <div className="col-sm-6" id="password-field">
                  <input className="" type="password" id="password" name="password" />
                  <Link className="btn btn-primary" to="/ChangePassword">
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12">
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  {" "}
                  Email{" "}
                </label>
                <div className="col-sm-6">
                  <input type="text" id="email" name="email" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12">
              <div className="form-group row">
                <label
                  htmlFor="phonenumber"
                  className="col-sm-2 col-form-label"
                >
                  {" "}
                  Phone Number{" "}
                </label>
                <div className="col-sm-6">
                  <input type="text" id="phonenumber" name="phonenumber" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12">
              <div className="form-group row">
                <label
                  htmlFor="reservationHistory"
                  className="col-sm-2 col-form-label"
                >
                  {" "}
                  Reservation{" "}
                </label>
                <div className="col-sm-10 row">
                  <div className="col-md-4">                  <input type="text" style={{height: "30px"}} id="reservation"  name="reservation" />
</div>

                  <div className="col-md-8">
                    <div className="form-group row">
                      <div className="col-md-4">
                        <button type="button" className="b1 btn btn-primary">
                          {" "}
                        Reservation History{" "}
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button type="button" className="b1 btn btn-primary">
                          {" "}
                        Change reservation{" "}
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button type="button" className="b1 btn btn-primary">
                          {" "}
                        Cancel reservation{" "}
                        </button>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>

            <div className="col-xs-12 col-md-8 ">
              <div className="form-group row">
                <label htmlFor="review" className="col-sm-2 col-form-label">
                  {" "}
                  Review{" "}
                </label>
                <div className="col-sm-6">
                  <textarea
                    rows="10"
                    cols="50"
                    form="userform"
                    id="review"
                    name="review"
                  ></textarea>
                  <div>
                    <Link to="/">
                      <button type="submit" className="b1">
                        Review history
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="form-group ">
          <div className="text-center">
            <Link to="/">
              <button type="submit" className="btn btn-primary">
                Edit Profile
              </button>
            </Link>
            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default ViewCustomerProfile;
