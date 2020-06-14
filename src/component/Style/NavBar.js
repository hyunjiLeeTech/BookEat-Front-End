import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = () => {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="topbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">BookEat</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link className="glyphicon glyphicon-user" to="/SignUp">Sign Up</Link></li>
                        <li><Link className="glyphicon glyphicon-log-in" to="/">Login</Link></li>
                    </ul>
                </div>
            </div>
            <div className="lowerbar bg-muted" >
                <ul className="nav navbar-nav bg-muted" >
                    <li> <Link className="navbar-brand" to="/">Home</Link> </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;