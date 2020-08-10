import React from 'react'
import { NavLink } from 'react-router-dom'
import authService from '../../Services/AuthService';

export default function () {
    const user = authService.getCurrentUser();

    return (
        <ul className="navbar-nav navbar-right">
            <li className="nav-item">
                <label className="nav-link disabled" id="user-status-indicator"></label>
            </li>
            <li className="nav-item">
                <NavLink to="/profile" className="nav-link">{ user === null ? "Unknown user " : user.user.email}</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link">logout</NavLink>
            </li>
        </ul>
    )
}