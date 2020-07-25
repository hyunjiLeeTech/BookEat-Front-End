import React, { Component } from 'react'
import './ResReview.css'
import Star from './../component/Style/Stars'




class ResReview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviews: [
               
            ],
            disabled: true,
            contenteditable: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log("saved")

    };


    handleChange(e) {
        console.log(e.target.value);
        this.setState({ id: e.target.value });
    }


    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <div className="rating-block">
                            <h4>Users Rating</h4>
                            <h2 className="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                            <Star type='splitedBar' stars={3.8} />
                        </div>
                    </div>
                    <div className="col-sm-8 row">

                        <label className="col-sm-4 col-form-label">Food</label>
                        <div className="col-sm-6">
                            <Star isClickAble={true} type='star' stars={2} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Service</label>
                        <div className="col-sm-6">
                            <Star isClickAble={true} type='star' stars={2} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>




                        <label className="col-sm-4 col-form-label">Satisfaction</label>
                        <div className="col-sm-6">
                            <Star isClickAble={true} type='star' stars={2} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>


                        <label className="col-sm-4 col-form-label">Environment</label>
                        <div className="col-sm-6">
                            <Star isClickAble={true} type='star' stars={2} callback={
                                (e) => { console.log(e) }
                            } />
                        </div>
                        <br/>
                        <br/>
                        <div className="col-sm-12">

                            <textarea
                            className="col-sm-12"
                            rows="4"
                            id="description"
                            name="description"
                        //   value={this.state.description}
                        //   onChange={this.handleChange}
                        //   disabled={(!this.state.disabled)}
                        ></textarea>
                        {/* <span className="invalid-feedback">
                          {Parser(isError.description)}
                        </span> */}

                        <button type="button" className="btn btn-primary float-right"> Add Review</button> 

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
                                        <Star type='splitedBar' stars={3.8} />
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
