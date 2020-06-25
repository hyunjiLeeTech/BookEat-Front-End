import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../../component/Style/MainContainer'
import Parser from 'html-react-parser'

//Validation 
const regExpEmail = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

const regExpPhone = RegExp(
    /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const regExpPassword = RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/
);


const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

class ManagerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phonenumber: '',
            email: '',
            firstName: '',
            lastName: '',
            password: "",
            newPassword: "",
            confirmPassword: "",
            isError: {
                phonenumber: '&#160;',
                email: '&#160;',
                firstName: '&#160;',
                lastName: '&#160;',
                password: "&#160;",
                newPassword: "&#160;",
                confirmPassword: "&#160;"

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = this.state.isError;
        switch (name) {
            case "email":
                isError.email = regExpEmail.test(value)
                    ? "&#160;"
                    : "Invalid email address";
                break;
            case "phonenumber":
                isError.phonenumber = regExpPhone.test(value)
                    ? "&#160;" : "Phone Number is invalid";
                break;
            case "firstName":
                isError.firstName =
                    value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";

                break;
            case "lastName":
                isError.lastName =
                    value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";
                break;
            case "password":
                isError.password = regExpPassword.test(value)
                    ? "&#160;"
                    : "At least 6 characters required";
                this.state.password = value;
                break;
            case "newPassword":
                isError.newPassword = regExpPassword.test(value)
                    ? "&#160;"
                    : "At least 6 characters required";
                this.state.newPassword = value;
                break;
            case "confirmPassword":
                this.state.confirmPassword = value;
                isError.confirmPassword =
                    this.state.confirmPassword === this.state.newPassword
                        ? "&#160;" : "Password not matching"
                break;
            default:
                break;
        }
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }

    }
    render() {
        const { isError } = this.state;
        return (
            <MainContainer>
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                {/* <Link to='#restaurantProfile'>
                                    <button className="nav-link active" data-toggle="tab">  My Profile</button>
                                </Link> */}
                                <a class="nav-link active" data-toggle="tab" role="tab" href="#managerProfile" aria-controls="managerProfile" aria-selected="true">
                                    My Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                {/* <Link to='/'>
                                    <button className="nav-link" data-toggle="tab">Menu</button>
                                </Link> */}
                                <a class="nav-link" data-toggle="tab" role="tab" href="#menu" aria-controls="menu" aria-selected="false">
                                    Menu
                                </a>

                            </li>
                            <li className="nav-item">
                                {/* <Link to='#managerAccount'>
                                    <button className="nav-link" data-toggle="tab">Manager</button>
                                </Link> */}
                                <a class="nav-link" data-toggle="tab" role="tab" href="#reservation" aria-controls="reservation" aria-selected="false">
                                    Reservation
                                </a>

                            </li>
                            <li className="nav-item">
                                {/* <Link to='/ChangePassword'>
                                    <button className="nav-link" data-toggle="tab">Password</button>
                                </Link> */}
                                <a class="nav-link" data-toggle="tab" role="tab" href="#changePassword" aria-controls="changePassword" aria-selected="false">
                                    Password
                                </a>

                            </li>
                        </ul>
                    </div>


                    <div className="card-body">
                        <div className="tab-content">
                            {/* Start Manager profile */}
                            <div id="managerProfile" className="tab-pane fade show active" role="tabpanel" aria-labelledby="managerProfile">
                                <form onSubmit={this.handleSubmit} noValidate>

                                    <div className="form-group row">
                                        <label htmlFor="streetnumber" className="col-sm-2 col-form-label"> First Name</label>
                                        <div className="col-sm-4">
                                            <input type="text" id="firstName" name="firstName" value={this.state.firstName} placeholder="First Name"
                                                className={isError.firstName.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                            <span className="invalid-feedback">{Parser(isError.firstName)}</span>
                                        </div>

                                        <label htmlFor="streetname" className="col-sm-2 col-form-label"> Last Name</label>
                                        <div className="col-sm-4">
                                            <input type="text" id="lastName" name="lastName" value={this.state.lastName} placeholder="Last Name"
                                                className={isError.lastName.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                            <span className="invalid-feedback">{Parser(isError.lastName)}</span>
                                        </div>
                                    </div>

                                    <div className="form-group row">

                                        <label htmlFor="phonenumber" className="col-sm-2 col-form-label"> Phone Number</label>
                                        <div className="col-md-4">
                                            <input type="text" id="phonenumber" name="phonenumber" value={this.state.phonenumber} placeholder="Phone Number"
                                                className={isError.phonenumber.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                            <span className="invalid-feedback">{Parser(isError.phonenumber)}</span>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-2 col-form-label"> Email</label>
                                        <div className="col-md-10">
                                            <input type="email" id="email" name="email" value={this.state.email} placeholder="Email"
                                                className={isError.email.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                            <span className="invalid-feedback">{Parser(isError.email)}</span>
                                        </div>
                                    </div>
                                    <div className="panel-footer row ">
                                        <div className="col-sm-6 text-left">
                                            <button className="btn btn-primary">Save</button>
                                        </div>

                                        <div className="col-sm-6 text-right">
                                            <button className="btn btn-primary" id="btn_disable">Edit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* End Manager Profile */}

                            {/* Start Password */}
                            <div id="changePassword" className="tab-pane fade" role="tabpanel" aria-labelledby="changePassword">
                                <div className="container">
                                    <div className="page-header text-center">
                                        <h1>Change Password</h1>
                                        <br />
                                    </div>
                                </div>

                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="col-xs-12 col-md-8 ">
                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                                Old Password
                                            </label>
                                            <div className="col-sm-6">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    id="password"
                                                    className={
                                                        isError.password.length > 6
                                                            ? "is-invalid form-control"
                                                            : "form-control"
                                                    }
                                                    value={this.state.password}
                                                    placeholder="Old Password"
                                                    onChange={this.handleChange}
                                                    required
                                                />

                                                <span className="invalid-feedback">
                                                    {Parser(isError.password)}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-md-8 ">
                                        <div className="form-group row">
                                            <label htmlFor="newPassword" className="col-sm-2 col-form-label">
                                                New Password
                                             </label>
                                            <div className="col-sm-6">
                                                <input
                                                    name="newPassword"
                                                    type="password"
                                                    id="newPassword"
                                                    className={
                                                        isError.newPassword.length > 6
                                                            ? "is-invalid form-control"
                                                            : "form-control"
                                                    }
                                                    value={this.state.newPassword}
                                                    placeholder="New Password"
                                                    onChange={this.handleChange}
                                                    required
                                                />

                                                <span className="invalid-feedback">
                                                    {Parser(isError.newPassword)}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-md-8 ">
                                        <div className="form-group row">
                                            <label htmlFor="newPassword" className="col-sm-2 col-form-label">
                                                Confirm New Password
                                             </label>
                                            <div className="col-sm-6">
                                                <input
                                                    name="confirmPassword"
                                                    type="password"
                                                    id="confirmPassword"
                                                    className={
                                                        isError.confirmPassword.length > 6
                                                            ? "is-invalid form-control"
                                                            : "form-control"
                                                    }
                                                    value={this.state.confirmPassword}
                                                    placeholder="Password confirmation"
                                                    onChange={this.handleChange}
                                                    required
                                                />

                                                <span className="invalid-feedback">
                                                    {Parser(isError.confirmPassword)}
                                                </span>

                                            </div>
                                        </div>

                                        <div className="form-group ">
                                            <div className="text-center">
                                                <Link to="/">
                                                    <button type="submit" className="btn btn-primary">
                                                        Change password
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* End Password */}


                        </div>
                    </div>



                </div>

            </MainContainer>
        )
    }

}

export default ManagerProfile;