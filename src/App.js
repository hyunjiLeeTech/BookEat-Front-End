import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./component/Forms/Customer/SignUp";
import Home from "./Home/Home";
import RestaurantSignUp from "./component/Forms/Restaurant/RestaurantSignUp";
import NavBar from "./component/Style/NavBar";
import Footer from "./component/Style/Footer";
import TermsAndCondition from "./component/Forms/Customer/TermsAndCondition";
import RestaurantProfile from "./Profile/Restaurant/RestaurantProfile";
import Login from "./component/Forms/Customer/Login";
import ExternalLogin from "./component/Forms/Customer/ExternalLogin";
import ConfirmLogin from "./component/Forms/Customer/ConfirmLogin";
import ForgotPassword from "./component/Forms/Customer/ForgotPassword";
import ViewCustomerProfile from "./component/Forms/Customer/ViewCustomerProfile";
import ReservationHistory from "./component/Forms/Customer/ReservationHistory";
import ChangePassword from "./component/Forms/Customer/ChangePassword";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/SignUp" render={() => <SignUp />} />
          <Route exact path="/Login" render={() => <Login />} />
          <Route exact path="/ExternalLogin" render={() => <ExternalLogin />} />
          <Route exact path="/ConfirmLogin" render={() => <ConfirmLogin />} />
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
            path="/TermsAndCondition"
            render={() => <TermsAndCondition />}
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
        </Switch>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
