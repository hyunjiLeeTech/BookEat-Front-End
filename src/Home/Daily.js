import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer';
import $ from "jquery";
import { Link } from 'react-router-dom'
import CAFE from '../Image/CAFE.jpg'
import Star from '../component/Style/Stars'


import dailycss from './Daily.css'

class Daily extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rastaurants: [
                { id: "", resName: "", resPicture: "", starAverage: 0 },
                // for testing              
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: "1" },
                // { id: "", resName: "Eat", resPicture: "CAFE", starAverage: "2" },
                // { id: "", resName: "BookEat", resPicture: "CAFE", starAverage: "3" }
                // , { id: "", resName: "Book", resPicture: "CAFE", starAverage: "1" },
                // { id: "", resName: "Eat", resPicture: "CAFE", starAverage: "2" },
                // { id: "", resName: "BookEat", resPicture: "CAFE", starAverage: "3" }
                // , { id: "", resName: "Book", resPicture: "CAFE", starAverage: "1" },
                // { id: "", resName: "Eat", resPicture: "CAFE", starAverage: "2" },
                // { id: "", resName: "BookEat", resPicture: "CAFE", starAverage: "3" }

            ]
        }

        this.scroll = this.scroll.bind(this)
    }

    scroll(direction) {
        let far = $('.image-container').width() / 2 * direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate({ scrollLeft: pos }, 1000)
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
                <div key={id} id={'restaurantrow' + index} className="card text-center"
                 >
                    <img className="card-img-top" style={{width: "100%" ,  height: "80%"}}
                        src={CAFE} alt="Card image cap" />
                    <div className="card-body" >
                        < div className="card-title" value={resName}><h9>{resName}  {this.renderStars(starAverage)}</h9>

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
                <div className="container-fluid">
                <h5>Daily Pick Up</h5>
                <div className="main">
              
                <div className="wrapper">
                    <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                    <div className="image-container">
                        {/* <div className="card-deck  image" > */}
                        <div className="image" >
                            {this.renderRestaurants()}
                        </div>
                    </div>
                    <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
                </div>
            </div >
            </div>
            </MainContainer >
        )
    }
}

export default Daily;