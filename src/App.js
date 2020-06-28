import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import SignUp from './component/Forms/Customer/SignUp'
import Home from './Home/Home'
import RestaurantSignUp from './component/Forms/Restaurant/RestaurantSignUp'
import NavBar from './component/Style/NavBar'
import Footer from './component/Style/Footer'
import RestaurantProfile from './Profile/Restaurant/RestaurantProfile'
import Manager from './Profile/Restaurant/Manager'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Login from "./component/Forms/Customer/Login";
import ConfirmLogin from "./component/Forms/Customer/ConfirmLogin";
import ForgotPassword from "./component/Forms/Customer/ForgotPassword";
import ViewCustomerProfile from "./Profile/Customer/ViewCustomerProfile";
import ReservationHistory from "./Profile/Customer/ReservationHistory";
import ChangePassword from "./component/Forms/Customer/ChangePassword";
import Logout from './component/Forms/Logout';
import Layout from './component/RestaurantLayout/Layout';

import $ from 'jquery'

import authHeader from './Services/authHeader'
import ds from './Services/dataService'

class App extends Component {
  queryUserInfo = async function(){
    let user = null;
    try{
      user = await ds.getCustomerInformation();
    }catch(err){
      console.log(err);
    }
    return user;
  }

  updateUserInfo = async function() {
    let u;
    try{
      u = await this.queryUserInfo();
      console.log(u)
      if(u){
        $("#user-status-indicator").text(u.firstName + " " + u.lastName)
      }
    }catch(err){
      console.log(err);
    }
  }

  componentDidMount(){
    $("#user-status-indicator").text("Updating");
    this.updateUserInfo();

  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log('Route change!');
    }

  }
  render() {

    return (
      <div>
        <NavBar />
        <Switch >
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/SignUp" render={() => <SignUp />} />
          <Route exact path="/Login" render={() => <Login />} />
          <Route exact path="/ConfirmLogin" render={() => <ConfirmLogin />} />
          <Route path='/logout' component={Logout} />
          <Route path='/layout' component={Layout} />
          <Route
            exact
            path="/ViewCustomerProfile"
            render={() => <ViewCustomerProfile />}
          />
          <Route exact path="/ForgotPassword"
            render={() => <ForgotPassword />}
          />
          <Route exact path="/ChangePassword"
            render={() => <ChangePassword />}
          />
          <Route
            exact path="/ReservationHistory"
            render={() => <ReservationHistory />}
          />
          <Route
            exact path="/RestaurantSignUp"
            render={() => <RestaurantSignUp />}
          />
          <Route
            exact path="/RestaurantProfile"
            render={() => <RestaurantProfile />}
          />
          <Route
            exact path="/Manager"
            render={() => <Manager />}
          />
        </Switch>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);