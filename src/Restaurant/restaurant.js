import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import dataService from '../Services/dataService';
import MainContainer from '../component/Style/MainContainer';
import $ from 'jquery';
import Layout from '../component/RestaurantLayout/Layout'
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import authHeader from '../Services/authHeader';
import { useParams } from "react-router";
import { withRouter } from "react-router";
import CAFE from '../Image/CAFE.jpg';
import './RestaurantDetails.css'
import ResReview from '../Review/ResReview';
import ViewMenu from '../Menu/ViewMenu';
import FullscreenError from '../component/Style/FullscreenError'
import FullScrrenLoading from '../component/Style/FullscreenLoading';
import ds from "../Services/dataService";

class Restaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            res: [],
            reviews: [],
            resultsErr: false,
            isResLoaded: false,
        }
    }

    async componentWillMount() {
        Axios.get("http://localhost:5000/restaurants/" + this.state.id)//TODO: remove if production
            .then(res => {
                if (res.data.errcode === 0)
                    this.setState({
                        res: res.data.restaurant,
                        isResLoaded: true
                    })
                console.log(this.state.res)
            })
        var resId = this.state.id;

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

    componentDidMount() {
        console.log(this.state.res)
    }



    render() {
        return (
            // <div>
            //     {JSON.stringify(this.state.res)}<br/><br/><br/>
            //     <Link to={'/customerreserve/' + this.state.id} >Reserve</Link>
            // </div>

            <MainContainer>

                {this.state.resultsErr
                    ?
                    FullscreenError("An error occured, please try again later")
                    :
                    null
                }


                {!this.state.isResLoaded
                    ?
                    FullScrrenLoading({ type: 'cubes', color: '#000' })
                    :
                    null
                }



                <div className="card mb-3">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" id="carousel_pictures">
                            <div className="carousel-item active">
                                <img className="d-inline-block" src={CAFE} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-inline-block" src={CAFE} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-inline-block" src={CAFE} alt="Third slide" />
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.res.resName}</h5>
                        <hr />
                        <p className="card-text">{this.state.res.restaurantDescription}</p>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-sm-8">
                                <h5>Menu</h5>
                                <hr />
                                <ViewMenu resId={this.state.id} />
                                <br />
                                <h5>Reviews</h5>
                                <hr />
                                <ResReview resId={this.state.id} />



                            </div>
                            <div className="col-sm-4">
                                <h5>Make a reservation</h5>
                                <hr />
                                <p>Click the button to make a reservation</p>
                                {/* <button type="button"
                            className="btn btn-primary">
                           Reserve here
                        </button> */}
                                <Link to={'/customerreserve/' + this.state.res._id} className="btn btn-primary">Reserve Here</Link>
                                <br />
                                <br />
                                <h5>Restaurant Information</h5>
                                <hr />
                                <h6>Address</h6>
                                <p>{this.state.isResLoaded ? this.state.res.addressId.streetNum : null} {this.state.isResLoaded ? this.state.res.addressId.streetName : null}
                                    {this.state.isResLoaded ? this.state.res.addressId.city : null}  {this.state.isResLoaded ? this.state.res.addressId.province : null}
                                    {this.state.isResLoaded ? this.state.res.addressId.postalCode : null}</p>
                                <hr />
                                <h6>Phone Number</h6>
                                <p>{this.state.isResLoaded ? this.state.res.phoneNumber : null}</p>
                                <hr />
                                <h6>Store Time</h6>
                                <p>Monday {this.state.isResLoaded ? this.state.res.monOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.monCloseTimeId.storeTimeName : null}</p>
                                <p>Tuesday {this.state.isResLoaded ? this.state.res.tueOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.tueCloseTimeId.storeTimeName : null}</p>
                                <p>Wednesday {this.state.isResLoaded ? this.state.res.wedOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.wedCloseTimeId.storeTimeName : null}</p>
                                <p>Thursday {this.state.isResLoaded ? this.state.res.thuOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.thuCloseTimeId.storeTimeName : null}</p>
                                <p>Friday {this.state.isResLoaded ? this.state.res.friOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.friCloseTimeId.storeTimeName : null}</p>
                                <p>Saturday {this.state.isResLoaded ? this.state.res.satOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.satCloseTimeId.storeTimeName : null}</p>
                                <p>Sunday {this.state.isResLoaded ? this.state.res.sunOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.sunCloseTimeId.storeTimeName : null}</p>
                                <hr />
                                <h6>Cuisine Style</h6>
                                <p>{this.state.isResLoaded ? this.state.res.cuisineStyleId.cuisineName : null}</p>
                                <hr />
                                <h6>Category</h6>
                                <p>{this.state.isResLoaded ? this.state.res.categoryId.categoryName : null}</p>
                                <hr />
                                <h6>Price Range</h6>
                                <p>{this.state.isResLoaded ? this.state.res.priceRangeId.priceRangeName : null} </p>

                            </div>
                        </div>
                    </div>
                </div>

            </MainContainer>

        )
    }

}

export default withRouter(Restaurant)