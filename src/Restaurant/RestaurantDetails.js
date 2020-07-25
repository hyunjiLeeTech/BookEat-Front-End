import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";
import CAFE from '../Image/CAFE.jpg';
import './RestaurantDetails.css'

class RestaurantDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfPeople: '',
            dateTime: new Date(),
            resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
        }

    }


    componentDidMount() {
    }

    render() {
        return (
            <MainContainer>
                <div className="card mb-3">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
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
                        <h5 className="card-title">Restaurant title</h5>
                        <hr />
                        <p>Starts     Review      Price Range    Cuisine Style</p>
                        <p className="card-text">Restaurant Description here</p>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-sm-8">
                                <h5>Menu</h5>
                                <hr />
                                <p>Put Menu List Here</p>
                                <br />
                                <h5>Reviews</h5>
                                <hr />



                            </div>
                            <div className="col-sm-4">
                                <h5>Make a reservation</h5>
                                <hr />
                                <p>Click the button to make a reservation</p>
                                <button type="button"
                                    className="btn btn-primary">
                                   Reserve here
                                </button>
                                <br />
                                <br />
                                <h5>Restaurant Information</h5>
                                <hr />
                                <p>Put address, Open hour ...</p>
                            </div>
                        </div>

                    </div>
                </div>
            </MainContainer>


        )
    }
}

export default RestaurantDetails;