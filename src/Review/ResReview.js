import React, { Component } from 'react'
import './ResReview.css'
import Star from './../component/Style/Stars'
import Parser from "html-react-parser";

const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    Object.values(isError).forEach((val) => {
        if (val !== '&#160;') {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    Object.values(rest).forEach((val) => {
        console.log(rest);
        if (val === null) {
            isValid = false;
        } else {
            isValid = true;
        }
    });
    return isValid;
};


class ResReview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            food: '',
            service: '',
            enviroment: '',
            satisfaction: '',
            reviews: [
            ],
            disabled: true,
            contenteditable: false,
            isError: {
                comment: "&#160;"
            }

        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log("saved")
        console.log(this.state);
    };


    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        console.log(e.target.value);
        switch (name) {
            case "comment":
                isError.comment =
                    value.length >= 1 && value.length <= 255
                        ? "&#160;"
                        : "Write something please";
                break;
            default:
                break;
        }
        this.setState({ [e.target.id]: e.target.value });
    }


    render() {
        const { isError } = this.state;
        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <div className="rating-block">
                            <h4>Users Rating</h4>
                            <h6>Food</h6>
                            <Star type='splitedBar' stars={3.8} />
                            <br />
                            <h6>Service</h6>
                            <Star type='splitedBar' stars={3.8} />
                            <br />
                            <h6>Satisfaction</h6>
                            <Star type='splitedBar' stars={3.8} />
                            <br />
                            <h6>Environment</h6>
                            <Star type='splitedBar' stars={3.8} />

                        </div>
                    </div>
                    <div className="col-sm-8 row">

                        <label className="col-sm-4 col-form-label">Food</label>
                        <div className="col-sm-6">
                            <Star id="food" name="food" value={this.state.food} isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Service</label>
                        <div className="col-sm-6">
                            <Star id="service" name="service" value={this.state.service} isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>




                        <label className="col-sm-4 col-form-label">Satisfaction</label>
                        <div className="col-sm-6">
                            <Star id="satisfaction" name="satisfaction" value={this.state.satisfaction} isClickAble={true} type='star' onChange={this.handleChange}  callback={
                                (e) => { console.log(e) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Environment</label>
                        <div className="col-sm-6">
                            <Star id="enviroment" name="enviroment" value={this.state.enviroment} isClickAble={true} type='star' onChange={this.handleChange}  callback={
                                (e) => { console.log(e) }
                            } />
                        </div>
                        <br />
                        <br />
                        <div className="col-sm-12">

                            <textarea
                                className="col-sm-12"
                                rows="4"
                                id="comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                            //   disabled={(!this.state.disabled)}
                            ></textarea>
                            <span className="invalid-feedback">
                                {Parser(isError.comment)}
                            </span>

                            <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}> Add Review</button>

                        </div>





                    </div>


                    <div className="row">
                        <div className="col-sm-12">
                            <hr />


                            <br />

                            <div className="review-block">
                                <div className="row">

                                    <div className="col-sm-3">
                                        <div className="review-block-name"><a href="#">nktailor</a></div>
                                        <div className="review-block-date">January 29, 2016<br />1 day ago</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="review-block-rate col-sm-5">

                                            <p > Food </p> <Star type='splitedBar' stars={3.8} />
                                            <p >Service </p> <Star type='splitedBar' stars={3.8} />
                                            <p>Satisfaction</p> <Star type='splitedBar' stars={3.8} />

                                            <p>Environment</p>  <Star type='splitedBar' stars={3.8} />

                                        </div>
                                        <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                    </div>
                                </div>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        )
    }

}

export default ResReview;
