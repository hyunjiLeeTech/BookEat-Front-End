import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import SignUp from "./component/Forms/Customer/SignUp";
import Home from "./Home/Home";
import RestaurantSignUp from "./component/Forms/Restaurant/RestaurantSignUp";
import NavBar from "./component/Style/NavBar";
import Footer from "./component/Style/Footer";
import RestaurantProfile from "./Profile/Restaurant/RestaurantProfile";
import Manager from "./Profile/Restaurant/Manager";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Login from "./component/Forms/Customer/Login";
import ConfirmLogin from "./component/Forms/Customer/ConfirmLogin";
import ForgotPassword from "./component/Forms/Customer/ForgotPassword";
import ViewCustomerProfile from "./Profile/Customer/ViewCustomerProfile";
import ReservationHistory from "./Profile/Customer/ReservationHistory";
import ChangePassword from "./component/Forms/Customer/ChangePassword";
import Logout from "./component/Forms/Logout";
import Layout from "./component/RestaurantLayout/Layout";

import $ from "jquery";

import authHeader from "./Services/authHeader";
import ds from "./Services/dataService";
import ManagerProfile from "./Profile/Manager/ManagerProfile";
import EmailConfirmation from "./RedirectPages/EmailConfirmation";
import NotFound from "./RedirectPages/NotFound";
import authService from "./Services/AuthService";
import RestaurantReservation from "./Reservation/RestaurantReservation";

class App extends Component {
  queryUserInfo = async function (userType) {
    let user = null;
    try {
      if (userType == 1) {
        user = await ds.getCustomerInformation();
      } else if (userType == 2) {
        user = await ds.getRestaurantInformation();
      }
    } catch (err) {
      console.log(err);
    }
    return user;
  };

  updateUserInfo = async function () {
    let u;
    try {
      const usr = authService.getCurrentUser();
      if (usr) {
        const userType = usr.user.userTypeId;
        u = await this.queryUserInfo(userType);
        if (u) {
          if (userType == 1) {
            $("#user-status-indicator").text(u.firstName + " " + u.lastName);
          } else if (userType == 2) {
            $("#user-status-indicator").text(u.resName);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  queryReservation = async function (userType){
    let user = null;
    try{
      if(userType === 2){
        user = await ds.getRestaurantUpcomingReservation();
        user = await ds.getRestaurantPastReservation()();
      }

    }catch (err){
      console.log(err);
    }
  };

  componentDidMount() {
    $("#user-status-indicator").text("Updating");
    this.updateUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("Route change!");
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/SignUp" render={() => <SignUp />} />
          <Route exact path="/Login" render={() => <Login />} />
          <Route exact path="/ConfirmLogin" render={() => <ConfirmLogin />} />
          <Route path="/logout" component={Logout} />
          <Route path="/layout" component={Layout} />
          <Route
            exact
            path="/ViewCustomerProfile"
            render={() => <ViewCustomerProfile />}
          />
          <Route
            exact
            path="/ForgotPassword"
            render={() => <ForgotPassword />}
          />
          <Route
            exact
            path="/ChangePassword"
            render={() => <ChangePassword />}
          />
          <Route
            exact
            path="/ReservationHistory"
            render={() => <ReservationHistory />}
          />
          <Route
            exact
            path="/RestaurantSignUp"
            render={() => <RestaurantSignUp />}
          />
          <Route
            exact
            path="/RestaurantProfile"
            render={() => <RestaurantProfile />}
          />
          <Route exact path="/Manager" render={() => <Manager />} />
          <Route
            exact
            path="/ManagerProfile"
            render={() => <ManagerProfile />}
          />
          <Route
            exact
            path="/EmailConfirmation"
            render={() => <EmailConfirmation />}
          />
          <Route exact path="/NotFound" render={() => <NotFound />} />
          <Route exact path="/RestaurantReservation" render={() => <RestaurantReservation />} />
        </Switch>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter((props) => <App {...props} />);
