import React, { Component } from 'react'
import './ResReview.css'
import Star from '../../component/Style/Stars'
import ds from "../../Services/dataService";


class ViewReview extends Component {

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
            resId: props.resId,
            disabled: true,
            contenteditable: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderReviewList = this.renderReviewList.bind(this);

    }

    async componentWillMount() {
        var resId = this.state.resId;

        await this.queryReviews(resId);
        console.log("after get reviews");
        console.log(this.state);
    }

    async queryReviews(resId) {
        var reviews = await ds.getReviewsRestaurantSide(resId);

        this.setState({
            reviews: reviews
        })
    }


    handleChange(e) {
        e.preventDefault();
    }

    renderReviewList() {
        var rows = [];
        console.log("this state reviews: " + this.state.reviews);
        if (typeof this.state.reviews != "undefined") {
            for (var review of this.state.reviews) {
                rows.push(

                    <tr key={rows}>
                        <td >
                        {review.customerId.firstName + " " + review.customerId.lastName}
                    </td>

                    <td >
                    <Star type='splitedBar' stars={review.food} />
                    </td>

                    <td >
                    <Star type='splitedBar' stars={review.service} />
                    </td>

                    <td >
                    <Star type='splitedBar' stars={review.satisfaction} />
                    </td>

                    <td >
                    <Star type='splitedBar' stars={review.environment} />
                    </td>

                    <td>
                    {review.comment}
                    </td>
                    </tr>
                
                )
            }
        }
        return rows;
    }


    render() {

        return (
            <div className="container">
                <div className="row">


                    <h3>Reviews</h3>
                    <br />
                    <hr />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Customer</th>
                                <th scope="col">Food</th>
                                <th scope="col">Service</th>
                                <th scope="col">Satisfaction</th>
                                <th scope="col">Environment</th>
                                <th scope="col">Comment</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.renderReviewList()}

                        </tbody>
                    </table>



                </div>



            </div>

        )
    }

}

export default ViewReview;
