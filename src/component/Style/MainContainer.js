import React, { Component } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import './MainContainer.css'

class MainContainer extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="body">
          <div className="container">
            {/* <div className="container center_div"> */}
            {this.props.children}
            {/* </div> */}
          </div>
        </div>
        <div className="footer">
            <Footer />
          </div>
      </div>
    )
  }
}

export default MainContainer; 