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

class Restaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            res: [],
            resultsErr: false,
            categoriesReady: false,
            cuisinesReady: false,
            priceRangesReady: false,
         
        }
    }

    componentWillMount() {
        Axios.get("http://localhost:5000/restaurants/" + this.state.id)//TODO: remove if production
            .then(res => {
                if (res.data.errcode === 0)
                    this.setState({
                        res: res.data.restaurant
                    })
            })
        if (!this.state.resultsErr) {
            dataService.getCategories().then(res => {
                this.categories = res;
                this.setState({ categoriesReady: true })
            })

            dataService.getCuisines().then(res => {
                this.cuisines = res;
                this.setState({ cuisinesReady: true })
            })

            dataService.getPriceRanges().then(res => {
                this.priceRanges = res;
                this.setState({ priceRangesReady: true })
            })

        }
    }

    componentDidMount() {
        console.log(this.state.res)
    }

    renderPriceRange(priceRanges) {
        var tr = [];
        var renderPriceRangeText = function (name) {
            switch (name) {
                case 'low':
                    return '$ ($0-$50)'
                case 'medium':
                    return '$$ ($50-$100)'
                case 'high':
                    return '$$$ ($100+)'
                default:
                    return ''
            }
        }

        for (var pr of priceRanges) {
            if (pr.priceRangeName !== '')
                tr.push(
                    <div className="form-check" key={'pr' + pr._id}>
                        <input name='priceRange' className="form-check-input" type="checkbox" value={pr._id} id={pr.priceRangeName} onChange={this.handleCheck} />
                        <label className="form-check-label" htmlFor={pr.priceRangeName}>
                            {
                                renderPriceRangeText(pr.priceRangeName)
                            }
                        </label>
                    </div>
                )
        }
        return tr;
    }


    renderCategory(categories) {
        var tr = [];
        for (var c of categories) {
            if (c.categoryVal !== '')
                tr.push(
                    <div className="form-check" key={'category' + c._id}>
                        <input name='categories' className="form-check-input" type="checkbox" value={c._id} id={c.categoryVal} onChange={this.handleCheck} />
                        <label className="form-check-label" htmlFor={c.categoryVal}>
                            {c.categoryName}
                        </label>
                    </div>
                )
        }
        return tr;
    }


    renderCuisine(cuisines) {
        var tr = [];
        for (var c of cuisines) {
            if (c.cuisineVal !== '')
                tr.push(
                    <div className="form-check" key={'cuisine' + c._id}>
                        <input name='cuisines' className="form-check-input" type="checkbox" value={c._id} id={c.cuisineVal} onChange={this.handleCheck} />
                        <label className="form-check-label" htmlFor={c.cuisineVal}>
                            {c.cuisineName}
                        </label>
                    </div>
                )
        }
        return tr
    }

    getCuisineNameById(id) {
        try {
            for (var c of this.cuisines) {
                if (c._id == id) return c.cuisineName;
            }
        } catch (err) {
            return null
        }

        return null;
    }

    getCategoryNameById(id) {
        try {
            for (var c of this.categories) {
                if (c._id == id) return c.categoryName;
            }
        } catch (err) {
            return null
        }

        return null;
    }

    getPriceRnageById(id) {
        var renderPriceRangeText = function (name) {
            switch (name) {
                case 'low':
                    return '$ ($0-$50)'
                case 'medium':
                    return '$$ ($50-$100)'
                case 'high':
                    return '$$$ ($100+)'
                default:
                    return ''
            }
        }
        try {
            for (var c of this.priceRanges) {
                if (c._id == id) return renderPriceRangeText(c.priceRangeName)
            }
        } catch (err) {
            return null
        }

        return null;
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
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.res.resName}</h5>
                        <hr />
                        <p>Starts  {this.getPriceRnageById(this.state.res.priceRangeId)}     Price Range    Cuisine Style</p>
                        <p className="card-text">{this.state.res.restaurantDescription}</p>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-sm-8">
                                <h5>Menu</h5>
                                <hr />
                                <ViewMenu />
                                <br />
                                <h5>Reviews</h5>
                                <hr />
                                <ResReview />



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
                                {/* <p>{this.state.res.addressId}</p> */}
                                <hr />
                                <h6>Store Time</h6>
                                <p></p>
                                <hr />
                                <h6>Cuisine Style</h6>
                                <p>{this.getCuisineNameById(this.state.res.cuisineStyleId)}</p>
                                <hr />
                                <h6>Category</h6>
                                <p>{this.getCategoryNameById(this.state.res.categoryId)}</p>


                            </div>
                        </div>

                    </div>
                </div>
            </MainContainer>

        )
    }

}

export default withRouter(Restaurant)