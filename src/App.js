import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from './component/Forms/Customer/SignUp'
import Home from './Home/Home'
import RestaurantSignUp from './component/Forms/Restaurant/RestaurantSignUp'
import NavBar from './component/Style/NavBar'
import Footer from './component/Style/Footer'
import RestaurantProfile from './Profile/Restaurant/RestaurantProfile'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <Route exact path='/SignUp' render={() => (
            <SignUp />
          )} />
          <Route exact path='/RestaurantSignUp' render={() => (
            <RestaurantSignUp />
          )} />
          <Route exact path='/RestaurantProfile' render={() => (
            <RestaurantProfile />
          )} />
        </Switch>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
