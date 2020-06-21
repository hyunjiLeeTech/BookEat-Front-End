import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../../component/Style/MainContainer'
import './RestaurantProfile.css'
import Parser from 'html-react-parser'

//Validation 
const regExpEmail = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

const regExpPhone = RegExp(
    /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const regExpPostal = RegExp(
    /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/
);

const regExpNumbers= RegExp(
    /^[0-9]*$/
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

class RestaurantProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resname: '',
            streetnumber: '',
            streetname: '',
            province: '',
            city: '',
            postalcode: '',
            phonenumber: '',
            email: '',
            businessnumber: '',
            cuisineStyle: '',
            category: '',
            priceRange: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            sunday: '',
            saturday: '',
            description: '',
            picture: '',
            isError: {
                resname: '&#160;',
                streetnumber: '&#160;',
                streetname: '&#160;',
                province: '&#160;',
                city: '&#160;',
                postalcode: '&#160;',
                phonenumber: '&#160;',
                email: '&#160;',
                businessnumber: '&#160;',
                cuisineStyle: '&#160;',
                category: '&#160;',
                priceRange: '&#160;',
                monday: '&#160;',
                tuesday: '&#160;',
                wednesday: '&#160;',
                thursday: '&#160;',
                friday: '&#160;',
                sunday: '&#160;',
                saturday: '&#160;',
                description: '&#160;',
                picture: '&#160;'
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
            case "resname":
                isError.resname =
                    value.length >= 3 && value.length <= 50 ? "&#160;" : "Atleast 3 character required";
                break;
            case "streetnumber":
                isError.streetnumber = regExpNumbers.test(value)
                    ? "&#160;" 
                    : "Atleast 1 number required";
                break;
            case "streetname":
                isError.streetname =
                    value.length >= 4 && value.length <= 255 ? "&#160;" : "Atleast 4 character required";
                break;
            case "city":
                isError.city =
                    value.length >= 2 && value.length <= 50 ? "&#160;" : "Atleast 2 character required";
                break;
            case "province":
                isError.province =
                    value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";
                break;
            case "postalcode":
                isError.postalcode = regExpPostal.test(value) 
                    ? "&#160;" 
                    : "Invalid postal code";
                break;
            case "email":
                isError.email = regExpEmail.test(value)
                    ? "&#160;"
                    : "Invalid email address";
                break;
            case "phonenumber":
                isError.phonenumber = regExpPhone.test(value)
                    ? "&#160;" : "Phone Number is invalid";
                break;
            case "businessnumber":
                isError.businessnumber = regExpNumbers.test(value)
                     ? "&#160;" 
                     : "Invalid business number";
                break;
            case "description":
                isError.description = value.length >= 1 && value.length <= 255
                    ? "&#160;" : "Atleast write something"
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

    componentDidMount(){
        // Avoid spacing on the form
        var t1 = document.getElementById("streetnumber");
        t1.onkeypress = function (event) {
            if (event.keyCode === 32) return false;
        }
        var t2 = document.getElementById("email");
        t2.onkeypress = function (e) {
            if (e.keyCode === 32) return false;
        }
        var t5 = document.getElementById("businessnumber");
        t5.onkeypress = function (e) {
            if (e.keyCode === 32) return false;
        }
        var t6 = document.getElementById("phonenumber");
        t6.onkeypress = function (e) {
            if (e.keyCode === 32) return false;
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
                                <Link to='/RestaurantProfile'>
                                <button className="nav-link active"> My Profile</button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/'>
                                    <button className="nav-link" >Menu</button>
                                </Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link to='/'>
                                    <button className="nav-link" >Manager</button>
                                </Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link to='/'>
                                    <button className="nav-link disabled">Settings</button>
                                </Link>
                                
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group row">
                                <label htmlFor="resname" className="col-sm-2 col-form-label"> Restaurant Name</label>
                                <div className="col-sm-10">
                                    <input type="text" id="resname" name="resname" value={this.state.resname} placeholder="Restaurant Name"
                                        className={isError.resname.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                        <span className="invalid-feedback">{Parser(isError.resname)}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="streetnumber" className="col-sm-2 col-form-label"> Street Number</label>
                                <div className="col-sm-3">
                                    <input type="text" id="streetnumber" name="streetnumber" value={this.state.streetnumber} placeholder="Street Number"
                                        className={isError.streetnumber.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                         <span className="invalid-feedback">{Parser(isError.streetnumber)}</span>
                                </div>

                                <label htmlFor="streetname" className="col-sm-2 col-form-label"> Street Name</label>
                                <div className="col-sm-5">
                                    <input type="text" id="streetname" name="streetname" value={this.state.streetname} placeholder="Street Name"
                                        className={isError.streetname.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                         <span className="invalid-feedback">{Parser(isError.streetname)}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="city" className="col-sm-2 col-form-label"> City</label>
                                <div className="col-md-3">
                                    <input type="text" id="city" name="city" value={this.state.city} placeholder="City"
                                        className={isError.city.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                         <span className="invalid-feedback">{Parser(isError.city)}</span>
                                </div>

                                <label htmlFor="province" className="col-sm-2 col-form-label"> Province</label>
                                <div className="col-md-5">
                                    <input type="text" id="province" name="province" value={this.state.province} placeholder="Province"
                                        className={isError.province.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                         <span className="invalid-feedback">{Parser(isError.province)}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="postalcode" className="col-sm-2 col-form-label"> Postal Code</label>
                                <div className="col-md-3">
                                    <input type="text" id="postalcode" name="postalcode" value={this.state.postalcode} placeholder="Postal Code"
                                        className={isError.postalcode.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                         <span className="invalid-feedback">{Parser(isError.postalcode)}</span>
                                </div>
                                <label htmlFor="phonenumber" className="col-sm-2 col-form-label"> Phone Number</label>
                                <div className="col-md-5">
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

                            <div className="form-group row">
                                <label htmlFor="businessnumber" className="col-sm-2 col-form-label"> Business Number</label>
                                <div className="col-md-10">
                                    <input type="text" id="businessnumber" name="businessnumber" value={this.state.businessnumber} placeholder="Business Number"
                                        className={isError.businessnumber.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                        <span className="invalid-feedback">{Parser(isError.businessnumber)}</span>
                                       
                                </div>
                                
                            </div>

                            <div className="form-group row">
                                <label htmlFor="cuisineStyle" className="col-sm-2 col-form-label">Cuisine Style</label>
                                <div className="col-md-10">
                                    <select className="custom-select " id="cuisineStyle" name="cuisineStyle" value={this.state.cuisineStyle} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                <div className="col-md-10">
                                    <select className="custom-select " id="category" name="category" value={this.state.category} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="priceRange" className="col-sm-2 col-form-label">Price Range</label>
                                <div className="col-md-10">
                                    <select className="custom-select " id="priceRange" name="priceRange" value={this.state.priceRange} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="openHours" className="col-sm-2 col-form-label">Open Hours</label>
                                <div className="col-md-10">
                                    <label htmlFor="monday" className="col-sm-2 col-form-label">Monday</label>
                                    <select className="custom-select col-md-3" id="monday" name="monday" value={this.state.monday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                        ~
                                    <select className="custom-select col-md-3" id="monday" name="monday" value={this.state.monday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="tuesday" className="col-sm-2 col-form-label">Tuesday</label>
                                    <select className="custom-select col-md-3" id="tuesday" name="tuesday" value={this.state.tuesday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="tuesday" name="tuesday" value={this.state.tuesday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="wednesday" className="col-sm-2 col-form-label">Wednesday</label>
                                    <select className="custom-select col-md-3" id="wednesday" name="wednesday" value={this.state.wednesday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="wednesday" name="wednesday" value={this.state.wednesday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="thursday" className="col-sm-2 col-form-label">Thursday</label>
                                    <select className="custom-select col-md-3" id="thursday" name="thursday" value={this.state.thursday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="thursday" name="thursday" value={this.state.thursday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="friday" className="col-sm-2 col-form-label">Friday</label>
                                    <select className="custom-select col-md-3" id="friday" name="friday" value={this.state.friday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="friday" name="friday" value={this.state.friday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="saturday" className="col-sm-2 col-form-label">Saturday</label>
                                    <select className="custom-select col-md-3" id="saturday" name="saturday" value={this.state.saturday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="saturday" name="saturday" value={this.state.saturday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>


                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-md-10">
                                    <label htmlFor="sunday" className="col-sm-2 col-form-label">Sunday</label>
                                    <select className="custom-select col-md-3" id="sunday" name="sunday" value={this.state.sunday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    ~
                                    <select className="custom-select col-md-3" id="sunday" name="sunday" value={this.state.sunday} onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="picture" className="col-sm-2 col-form-label">Restaurant Picture</label>
                                <div className="custom-file col-md-10">
                                    <input type="file" className="custom-file-input col-md-10" id="picture" name="picture" value={this.state.picture} onChange={this.handleChange}/>
                                    <label className="custom-file-label form-group" htmlFor="picture">Upload Picture</label>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-form-label">Restaurant Description</label>
                                <div className="col-md-10">
                                <textarea className={isError.description.length > 6 ? "is-invalid form-control" : "form-control"} rows="5" id="description" name="description" 
                                value={this.state.description} onChange={this.handleChange}></textarea>
                                <span className="invalid-feedback">{Parser(isError.description)}</span>
                                </div>
                            </div>

                        </form>

                        <Link to="/">
                            <button className="btn btn-primary">Go somewhere</button>
                        </Link>
                        
                    </div>
                </div>

            </MainContainer>
        )
    }

}

export default RestaurantProfile;