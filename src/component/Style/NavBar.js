import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <a href="/"> Home </a> | <a href="/SignUp">SignUp</a> |{" "}
      <a href="/LoginPage">Login</a>
    </nav>
  );
}

export default NavBar;
