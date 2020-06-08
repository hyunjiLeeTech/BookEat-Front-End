import React, { Component } from 'react'
import SignUp from './component/Forms/SignUp'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <SignUp />
        )} />
        <Route exact path='/SignUp' render={() => (
          <SignUp />
        )} />
      
      </Switch>
    )
  }
}

export default App;
