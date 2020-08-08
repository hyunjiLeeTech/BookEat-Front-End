import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../component/Style/MainContainer';
import Axios from 'axios';
import { withRouter } from "react-router";
import './RestaurantDetails.css'
import ResReview from '../Review/Restaurant/ResReview';
import ViewMenu from '../Menu/ViewMenu';
import FullscreenError from '../component/Style/FullscreenError'
import FullScrrenLoading from '../component/Style/FullscreenLoading';
import { GiKnifeFork } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineShop, AiOutlinePhone } from "react-icons/ai";
import { RiTimeLine, RiMapPin2Line } from "react-icons/ri";
import serverAddress from '../Services/ServerUrl';

class Restaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            res: [],
            resultsErr: false,
            isResLoaded: false,
            discount: {},
        }
    }


    async componentWillMount() {
        Axios.get("http://localhost:5000/restaurants/" + this.state.id)//TODO: remove if production
            .then(res => {
                if (res.data.errcode === 0)
                    this.setState({
                        res: res.data.restaurant,
                        isResLoaded: true,
                        discount: res.data.discount
                    })
            })
    }

    render() {
        return (

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
                        <ol className="carousel-indicators" style={{background: '#777777'}}>
                            {this.state.res.pictures ?  this.state.res.pictures.map((v, i, array) => {
                                return <li key={v} data-target="#carouselExampleIndicators" data-slide-to={i.toString()} className={i === 0 ? 'active' : ''}></li>
                            }) : null}
                        </ol>
                        <div className="carousel-inner" id="carousel_pictures">
                            {this.state.res.pictures ? this.state.res.pictures.map((v, i, array) => {
                                return <div key={v} className={i === 0 ? 'active carousel-item' : 'carousel-item'}>
                                    <img id="carousel_pictures" className="d-inline-block" src={serverAddress + '/getImage/' + v} alt="Restaurant" />
                                </div>
                            }) : null}
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
                                <Link to={'/customerreserve/' + this.state.res._id} className="btn btn-primary">Reserve Here</Link>
                                <br />
                                <br />
                                <h5>Restaurant Information</h5>
                                <hr />
                                <h6><RiMapPin2Line />  Address</h6>
                                <p>{this.state.isResLoaded ? this.state.res.addressId.streetNum : null} {this.state.isResLoaded ? this.state.res.addressId.streetName : null}
                                    {this.state.isResLoaded ? this.state.res.addressId.city : null}  {this.state.isResLoaded ? this.state.res.addressId.province : null}
                                    {this.state.isResLoaded ? this.state.res.addressId.postalCode : null}</p>
                                <hr />
                                <h6><AiOutlinePhone /> Phone Number</h6>
                                <p>{this.state.isResLoaded ? this.state.res.phoneNumber : null}</p>
                                <hr />
                                <h6><RiTimeLine />  Store Time</h6>
                                <p>Monday {this.state.isResLoaded ? this.state.res.monOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.monCloseTimeId.storeTimeName : null}</p>
                                <p>Tuesday {this.state.isResLoaded ? this.state.res.tueOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.tueCloseTimeId.storeTimeName : null}</p>
                                <p>Wednesday {this.state.isResLoaded ? this.state.res.wedOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.wedCloseTimeId.storeTimeName : null}</p>
                                <p>Thursday {this.state.isResLoaded ? this.state.res.thuOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.thuCloseTimeId.storeTimeName : null}</p>
                                <p>Friday {this.state.isResLoaded ? this.state.res.friOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.friCloseTimeId.storeTimeName : null}</p>
                                <p>Saturday {this.state.isResLoaded ? this.state.res.satOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.satCloseTimeId.storeTimeName : null}</p>
                                <p>Sunday {this.state.isResLoaded ? this.state.res.sunOpenTimeId.storeTimeName : null} - {this.state.isResLoaded ? this.state.res.sunCloseTimeId.storeTimeName : null}</p>
                                <hr />
                                <h6><GiKnifeFork />  Cuisine Style</h6>
                                <p>{this.state.isResLoaded ? this.state.res.cuisineStyleId.cuisineName : null}</p>
                                <hr />
                                <h6><AiOutlineShop />  Category</h6>
                                <p>{this.state.isResLoaded ? this.state.res.categoryId.categoryName : null}</p>
                                <hr />
                                <h6><FaRegMoneyBillAlt />  Price Range</h6>
                                <p>{this.state.isResLoaded ? this.state.res.priceRangeId.priceRangeName : null} </p>
                                <hr />
                                <h5>Promotions</h5>
                                <p>{this.state.isResLoaded ? this.state.discount.percent: null}% Off Call for more information!</p>

                            </div>
                        </div>
                    </div>
                </div>

            </MainContainer>

        )
    }

}

export default withRouter(Restaurant)