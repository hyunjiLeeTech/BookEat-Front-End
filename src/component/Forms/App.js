import React, { Component } from "react";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import NavBar from "../Style/NavBar";

function App() {
  function getPage() {
    const route = window.location.pathname;
    if (route === "/LoginPage") return <LoginPage />;
    if (route === "/SignUp") return <SignUp />;
    return <HomePage />;
  }

  return <div className="container-fluid">{getPage()}</div>;
}

export default App;
