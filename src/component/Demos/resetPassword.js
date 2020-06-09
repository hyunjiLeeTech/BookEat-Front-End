import React from 'react';
import './login.css';
import './resetPassword.css'


class ResetPassword extends React.Component{
    render(){
        return(
            <div>
                <div id="head"><a href="#" id="signupbtn">Sign Up</a></div>
                <p id="logo">BookEat</p>
                <div id="wrapper">
                <h2>Reset Password</h2>
                <p>Please enter your email below to continue</p>
                </div>
                <div id="loginWrapper">
                    <lable>Email Address:</lable><br/>
                    <input type="text"/><a id="gobtn" className="btn btn-primary">Go</a><br/><br/>
                </div>
            </div>
        )
    }
}

export default ResetPassword;