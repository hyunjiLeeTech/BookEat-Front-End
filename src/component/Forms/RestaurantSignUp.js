import React, { Component } from 'react'
import MainContainer from '../Style/MainContainer'

class RestaurantSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resname: '',
            address: '',
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
                    <form className="text-center" onSubmit={this.handleSubmit}>
                        
                            <div className="form-group">
                                <label htmlFor="resname">
                                    Restaurant Name:
                                <input type="text" id="resname" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">
                                    Address:
                                <input type="text" id="address" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phonenumber">
                                    Phone Number:
                                <input type="text" id="phonenumber" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email:
                                <input type="email" id="email" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="businessnumber">
                                    Business Number:
                                <input type="text" id="businessnumber" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password:
                                <input type="password" id="password" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmpw">
                                    Password Confirmation:
                                <input type="password" id="confirmpw" className="form-control" onChange={this.handleChange} />
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary" >Sign Up</button>
                        
                    </form>
                </div>
            </MainContainer>

        );
    }
}

export default RestaurantSignUp;