import React, { Component } from 'react'
import MainContainer from '../../Style/MainContainer'

class RestaurantSignUp extends Component {

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
            password: '',
            confirmpw: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (

            <MainContainer>
                <div className="container">

                    <div className="page-header text-center">
                        <h1>Welcome to BookEat!</h1>
                    </div>

                    <form className="text-center" onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group row">
                            <label htmlFor="resname" className="col-sm-2 col-form-label"> Restaurant Name</label>
                            <div className="col-sm-10">
                                <input type="text" id="resname" name="resname" value={this.state.resname} placeholder="Restaurant Name"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="streetnumber" className="col-sm-2 col-form-label"> Street Number</label>
                            <div className="col-sm-2">
                                <input type="text" id="streetnumber" name="streetnumber" value={this.state.streetnumber} placeholder="Street Number"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>

                            <label htmlFor="streetname" className="col-sm-2 col-form-label"> Street Name</label>
                            <div className="col-sm-6">
                                <input type="text" id="streetname" name="streetname" value={this.state.streetname} placeholder="Street Name"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                            <div className="col-sm-2">
                                <input type="text" id="city" name="city" value={this.state.city} placeholder="City"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>

                            <label htmlFor="province" className="col-sm-2 col-form-label"> Province </label>
                            <div className="col-sm-2">
                                <input type="text" id="province" name="province" value={this.state.province} placeholder="Province"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>

                            <label htmlFor="postalcode" className="col-sm-2 col-form-label"> Postal Code</label>
                            <div className="col-sm-2">
                                <input type="text" id="postalcode" name="postalcode" value={this.state.postalcode} placeholder="Postal Code"
                                    className="form-control" onChange={this.handleChange} required />
                            </div>

                        </div>


                        <div className="form-group row">
                            <label htmlFor="phonenumber" className="col-sm-2 col-form-label">Phone Number </label>
                                <div className="col-sm-3">
                                <input type="text" id="phonenumber" name="phonenumber" value={this.state.phonenumber} placeholder="Phone Number"
                                    className="form-control" onChange={this.handleChange} />
                            </div>

                            <label htmlFor="email" className="col-sm-2 col-form-label"> Email </label>
                               <div className="col-sm-5">
                                <input type="email" id="email" name="email" value={this.state.email} placeholder="Email Address"
                                    className="form-control" onChange={this.handleChange} />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label htmlFor="businessnumber" className="col-sm-2 col-form-label">Business Number </label>
                                <div className="col-sm-10">
                                    <input type="text" id="businessnumber" name="businessnumber" value={this.state.businessnumber} placeholder="Business Number"
                                    className="form-control" onChange={this.handleChange} />
                                     <small> 9 digits Business Number</small>
                                </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label"> Password </label>
                                <div className="col-sm-4">
                                    <input type="password" id="password" name="password" value={this.state.password} placeholder="Password"
                                    className="form-control" onChange={this.handleChange} />
                                </div>

                            <label htmlFor="confirmpw" className="col-sm-2 col-form-label">Password Confirmation </label>
                                <div className="col-sm-4">
                                     <input type="password" id="confirmpw" name="confirmpw" value={this.state.password} placeholder="Confirm Password"
                                    className="form-control" onChange={this.handleChange} />
                                 </div>
                        </div>
                        
                    
                        <button type="submit" className="btn btn-primary" >Sign Up</button>

                    </form>
                </div>
            </MainContainer>

        );
    }
}

export default RestaurantSignUp;