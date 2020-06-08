import React, { Component } from 'react'
import NavBar from './NavBar'
//import Title from './Title'


class MainContainer extends Component {
  render() {
    return (
      <div>
        <NavBar title="Home" />
        <div className="container-fluid">
          <div className="row">
            <div className="container center_div">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer; 