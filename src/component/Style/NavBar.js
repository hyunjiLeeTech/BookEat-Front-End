import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {

    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">BookEat</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li> <Link className="navbar-brand" to="/">Home</Link> </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link className="glyphicon glyphicon-user" to="/SignUp">Sign Up</Link></li>
                    <li><Link className="glyphicon glyphicon-log-in" to="/">Login</Link></li>
                </ul>
            </div>

        </nav>
    )

}

export default NavBar;