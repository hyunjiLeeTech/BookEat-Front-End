import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import authService from '../../Services/AuthService';
import './Logout.css'
import MainContainer from '../Style/MainContainer';
import $ from 'jquery';

class Reservations extends Component {
    componentWillMount() {
        const user = authService.getCurrentUser();
        if(user === null) window.location.href = '/login';
        if(user.user.userType === 1) window.location.href='/logout'
    }

    render() {
        return (
            //partial code from https://tobiasahlin.com/spinkit/, modified.
            <MainContainer>
                <div>
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                    <div id="LogoutMessageWrapper">
                        <p id="LogoutMessage">Signing you out</p>

                        <p id="LogoutHint">Please wait for Signing out.</p>
                    </div>
                </div>
            </MainContainer>
        )
    }

}


export default Reservations;