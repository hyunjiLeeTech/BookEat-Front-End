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
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item"><Link className="glyphicon glyphicon-user" to="/SignUp">Sign Up</Link></li>
                            <li className="nav-item"><Link className="glyphicon glyphicon-log-in" to="/">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lowerbar bg-muted" >
                <ul className="nav navbar-nav bg-muted" >
                    <li className="nav-item"> <Link className="navbar-brand" to="/">Home</Link> </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;