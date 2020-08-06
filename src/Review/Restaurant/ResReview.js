import React, { Component } from 'react'
import './ResReview.css'
import Star from '../../component/Style/Stars'
import Parser from "html-react-parser";
import ds from "../../Services/dataService";
import moment from 'moment';

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
            food: 0,
            service: 0,
            enviroment: 0,
            satisfaction: 0,
            foodAvg: 0,
            serviceAvg: 0,
            environmentAvg: 0,
            satisfactionAvg: 0,
            reviews: [
            ],
            resId: props.resId,
            disabled: true,
            contenteditable: false,
            isError: {
                comment: "&#160;"
            }

        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentWillMount() {
        var resId = this.state.resId;

        await this.queryReviews(resId);
        console.log("after get reviews");
        console.log(this.state);
    }

    async queryReviews(resId) {

        var reviews = await ds.getReviewsRestaurantSide(resId);

        console.log(reviews);

        var serviceAvg = 0;
        var envirAvg = 0;
        var satisAvg = 0;
        var foodAvg = 0;


        if (typeof reviews !== 'undefined') {
            for (var i = 0; i < reviews.length; i++) {
                serviceAvg = typeof reviews[i].service !== 'undefined' ? serviceAvg + reviews[i].service : serviceAvg;
                envirAvg = typeof reviews[i].environment !== 'undefined' ? envirAvg + reviews[i].environment : envirAvg;
                satisAvg = typeof reviews[i].satisfaction !== 'undefined' ? satisAvg + reviews[i].satisfaction : satisAvg;
                foodAvg = typeof reviews[i].food !== 'undefined' ? foodAvg + reviews[i].food : foodAvg;
            }
        }

        this.setState({
            reviews: reviews,
            foodAvg: foodAvg / reviews.length,
            serviceAvg: serviceAvg / reviews.length,
            environmentAvg: envirAvg / reviews.length,
            satisfactionAvg: satisAvg / reviews.length,
        })

        console.log(this.state);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log("saved")
        console.log(this.state);

        if (formValid(this.state)) {
            ds.addReview();

        } else {
            console.log("Review is invalid");
        }

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

    queryReviewList() {
        var rows = [];
        console.log("this state reviews: " + this.state.reviews);
        if (typeof this.state.reviews != "undefined") {
            for (var review of this.state.reviews) {
                rows.push(
                    <div key={rows} className="row">

                        <div className="col-sm-4">
                            <div className="review-block-name">{review.customerId.firstName + " " + review.customerId.lastName}</div>
                            <div className="review-block-date">{moment(review.updatedAt).format("YYYY-MM-DD")}</div>
                        </div>
                        <div className="col-sm-8">
                            <div className="review-block-rate col-sm-8">
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label "> Food </label>
                                    <div className="col-sm-7">
                                        <Star type='splitedBar' stars={review.food} />
                                    </div>

                                    <label className="col-sm-5 col-form-label">Service </label>
                                    <div className="col-sm-7">
                                        <Star type='splitedBar' stars={review.service} />
                                    </div>

                                    <label className="col-sm-5 col-form-label">Satisfaction</label>
                                    <div className="col-sm-7">
                                        <Star type='splitedBar' stars={review.satisfaction} />
                                    </div>

                                    <label className="col-sm-5 col-form-label">Environment</label>
                                    <div className="col-sm-7">
                                        <Star type='splitedBar' stars={review.environment} />
                                    </div>
                                </div>
                            </div>
                            <div className="review-block-description">{review.comment}</div>
                            <hr />
                        </div>

                    </div>

                )
            }
        }
        return rows;
    }


    render() {
        // var foodAvg=0
        // var serviceAvg=0
        // var satisfactionAvg =0
        // var environmentAvg =0
        // for(var r of this.state.reviews){
        //     //foodRate 
        //     foodAvg += r.food;
        //     serviceAvg += r.service;
        //     satisfactionAvg += r.satisfaction
        //     environmentAvg += r.environment
        //     console.log(foodAvg)
        // }
        // if(this.state.reviews.length !== 0)
        // {
        //     foodAvg /= this.state.reviews.length;
        //     serviceAvg /= this.state.reviews.length;
        //     satisfactionAvg /= this.state.reviews.length;
        //     environmentAvg /= this.state.reviews.length;
        // }


        const { isError } = this.state;
        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <div className="rating-block">
                            <h4>Users Rating</h4>
                            <h6>Food</h6>
                            <Star type='splitedBar' stars={this.state.foodAvg} />
                            <br />
                            <h6>Service</h6>
                            <Star type='splitedBar' stars={this.state.serviceAvg} />
                            <br />
                            <h6>Satisfaction</h6>
                            <Star type='splitedBar' stars={this.state.satisfactionAvg} />
                            <br />
                            <h6>Environment</h6>
                            <Star type='splitedBar' stars={this.state.environmentAvg} />

                        </div>
                    </div>
                    <div className="col-sm-8 row">

                        <label className="col-sm-4 col-form-label">Food</label>
                        <div className="col-sm-6">
                            <Star id="food" name="food" isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { this.setState({ food: e }) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Service</label>
                        <div className="col-sm-6">
                            <Star id="service" name="service" isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { this.setState({ service: e }) }
                            } />
                        </div>




                        <label className="col-sm-4 col-form-label">Satisfaction</label>
                        <div className="col-sm-6">
                            <Star id="satisfaction" name="satisfaction" isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { this.setState({ satisfaction: e }) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Environment</label>
                        <div className="col-sm-6">
                            <Star id="enviroment" name="enviroment" isClickAble={true} type='star' onChange={this.handleChange} callback={
                                (e) => { this.setState({ enviroment: e }) }
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

                            <button type="button" className="btn btn-primary float-right"
                                onClick={this.handleSubmit.bind(this)}
                                data-target="#AddReviewModal"
                                data-toggle="modal"
                                id="addReview"> Add Review</button>

                        </div>
                    </div>


                    {/* <div className="row"> */}
                    <div className="col-sm-12">
                        <hr />
                        <br />
                        <div className="review-block">
                            {this.queryReviewList()}
                        </div>
                    </div>
                </div>
                {/* </div> */}
                {/* Add Review Modal */}

                <div
                    className="modal fade"
                    id="AddReviewModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="AddReviewModalLabel"
                    aria-hidden="true"
                >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="AddReviewModalLabel">
                                    Add Review
                            </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="alert alert-warning" id="AddReviewModalText">
                                    Please Wait...
                  </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Close
                  </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default ResReview;
