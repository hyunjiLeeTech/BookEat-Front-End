import React, { Component } from 'react'



class MainContainer extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <div className="container">
            {/* <div className="container center_div"> */}
            {this.props.children}
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer; 