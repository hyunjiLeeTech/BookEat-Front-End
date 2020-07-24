import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer';
import $ from "jquery";
import { Link } from 'react-router-dom'
import CAFE from '../Image/CAFE.jpg'


class Daily extends Component {

    constructor(props) {
        super(props)
        // this.state = {
        //     restaurant: [ {id:"", restaurantName:"", restaurantPicture:"", totalRate:"" },
        //     {id:"", restaurantName:"", restaurantPicture:"", totalRate:"" },
        //     {id:"", restaurantName:"", restaurantPicture:"", totalRate:"" },
        //     {id:"", restaurantName:"", restaurantPicture:"", totalRate:"" }]

        //restaurants: []    }

        // renderRestaurants(restaurants) {

        // }

    }

    render() {
        return (
            <MainContainer>
                <h5>Daily Pick Up</h5>
                <div class="card-deck">
                    <div class="card">
                        <img class="card-img-top" src={CAFE.jpg} alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">restaurantName</h5>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>                    
                </div>
            </MainContainer>
        )
    }
}

export default Daily;