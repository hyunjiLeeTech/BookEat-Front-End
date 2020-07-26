import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer';
import $ from "jquery";
import { Link } from 'react-router-dom'
import CAFE from '../Image/CAFE.jpg'
import Star from '../component/Style/Stars'
import ScrollMenu from 'react-horizontal-scrolling-menu';

import dailycss from './Daily.css'

class Daily extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rastaurants: [
                { id: "", resName: "Book2", resPicture: "", starAverage: 3.8 },
                // for testing              
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
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

    }

    // scroll(direction) {
    //     let far = $('.image-container').width() / 2 * direction;
    //     let pos = $('.image-container').scrollLeft() + far;
    //     $('.image-container').animate({ scrollLeft: pos }, 1000)
    // }


    // renderStars(stars) {//stars is a number
    //     var starstring = '';
    //     for (var i = 0; i < stars; i++) {
    //         starstring += '⭐';
    //     }
    //     //some magic    
    //     return <span>{starstring}</span>
    // }

    // renderRestaurants() {
    //     return this.state.rastaurants.map((restaurant, index) => {
    //         const { id, resName, resPicture, starAverage } = restaurant
    //         return (
    //             // <form onSubmit={this.handleSubmit} id="rendRes">
    //             <div key={id} id={'restaurantrow' + index} className="card text-center"
    //              >
    //                 <img className="card-img-top" style={{width: "100%" ,  height: "80%"}}
    //                     src={CAFE} alt="Card image cap" />
    //                 <div className="card-body" >
    //                     < div className="card-title" value={resName}><h9>{resName}  {this.renderStars(starAverage)}</h9>

    //                     </div>
    //                 </div>
    //             </div>
    //             // </form>
    //         )
    //     })

    // }


    renderRestaurant(r) {
        return (
            <div style={{ margin: '1rem', border: '1px solid #000', width: '15rem', height: '15rem' }}>
                <p>r.resName</p>
                <img src='https://www.talkwalker.com/uploads/2017/00001/mc1/Image%20recognition%20example.png' height='100%' width='100%' />
                <Star isClickAble={false} type='splitedBar' stars={r.starAverage} />
            </div>
        )

    }

    renderRestaurants() {
        var tr = [];
        for (var r of this.state.rastaurants) {
            tr.push(this.renderRestaurant(r))
        }
        return tr;
    }


    render() {

        const Arrow = ({ text, className }) => {
            return (
              <div style={{fontSize: '12rem'}}
                className={className}
              >{text}</div>
            );
          };
        const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
        const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
        return (
<<<<<<< HEAD
            <MainContainer>
                {/* <div className="container-fluid"> */}
                <h5>Daily Pick Up</h5>
                <div className="main">
              
                <div className="wrapper">
                    <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                    <div className="image-container">
                        <div className="card-deck  image" >
                        {/* <div className="image" > */}
                            {this.renderRestaurants()}
                        </div>
                    </div>
                    <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
                </div>
            </div >
            {/* </div> */}
            </MainContainer >
=======
            // <MainContainer>
            //     <div className="container-fluid">
            //     <h5>Daily Pick Up</h5>
            //     <div className="main">

            //     <div className="wrapper">
            //         <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
            //         <div className="image-container">
            //             {/* <div className="card-deck  image" > */}
            //             <div className="image" >
            //                 {this.renderRestaurants()}
            //             </div>
            //         </div>
            //         <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
            //     </div>
            // </div >
            // </div>
            // </MainContainer >
            <ScrollMenu
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                data={this.renderRestaurants()}
            />
>>>>>>> master
        )
    }
}

export default Daily;