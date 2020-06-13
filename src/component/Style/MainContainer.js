import React, { Component } from "react";
import NavBar from "./NavBar";

class MainContainer extends Component {
  render() {
    return (
      <div>
        <h4>BookEat</h4>
        <NavBar title="Home" />
        <div className="container-fluid">
          <div className="container center_div">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
