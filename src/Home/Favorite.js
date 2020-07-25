import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer';
import $ from "jquery";
import { Link } from 'react-router-dom'
import CAFE from '../Image/CAFE.jpg'
import Star from '../component/Style/Stars'

class Favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rastaurants: [
                { id: "", resName: "", resPicture: "", starAverage: 0 },  
                // for testing              
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: "1" },                
                { id: "", resName: "Eat", resPicture: "CAFE", starAverage: "2" },                
                { id: "", resName: "BookEat", resPicture: "CAFE", starAverage: "3" }
                
            ]
        }
    }

    renderStars(stars) {//stars is a number
        var starstring = '';
        for (var i = 0; i < stars; i++) {
            starstring += '⭐';
        }
        //some magic    
        return <span>{starstring}</span>
    }

    renderRestaurants() {
        return this.state.rastaurants.map((restaurant, index) => {
            const { id, resName, resPicture, starAverage } = restaurant
            return (
                // <form onSubmit={this.handleSubmit} id="rendRes">
                 <div key={id} id={'restaurantrow' + index} className="card text-center" style={{ width: "18rem" , height: "13rem"}}>
                        <img className="card-img-top" 
                        src={resPicture} alt="Card image cap" />
                        <div className="card-body" >
                            < div className="card-title" value={resName}><h7>{resName}  {this.renderStars(starAverage)}</h7><h2/>
                          
                        </div>
                        </div>
                     </div>
                // </form>
            )

        })

    }

    render() {
        return (
            <MainContainer>
                <h5>Favorite Restaurants</h5>
                <div class="card-deck">
                    {this.renderRestaurants()}
                </div>
            </MainContainer>
        )
    }
}

export default Favorite;