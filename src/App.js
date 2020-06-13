import React, { Component } from "react";
import SignUp from "./component/Forms/SignUp";
import { Route, Switch } from "react-router-dom";
import LoginPageTest from "./component/Forms/LoginPageTest";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <LoginPageTest />} />
        <Route exact path="/SignUp" render={() => <SignUp />} />
        <Route exact path="/LoginPageTest" render={() => <LoginPageTest />} />
      </Switch>
    );
  }
}

export default App;
