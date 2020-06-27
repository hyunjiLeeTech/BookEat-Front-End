import React from 'react'
import { NavLink } from 'react-router-dom'
import authService from '../../Services/AuthService';

export default function () {
    const user = authService.getCurrentUser();

    return (
        <ul className="navbar-nav navbar-right">
            <li className="nav-item">
                <a className="nav-link disabled" id="user-status-indicator"></a>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                <NavLink to="/profile" className="nav-link">{ user === null ? "Unknown user " : user.user.email}</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link">logout</NavLink>
            </li>
        </ul>
    )
}