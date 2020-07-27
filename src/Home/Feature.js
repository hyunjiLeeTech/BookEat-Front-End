import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer';
import $ from "jquery";
import { Link } from 'react-router-dom'
import CAFE from '../Image/CAFE.jpg'
import Star from '../component/Style/Stars'
import ScrollMenu from 'react-horizontal-scrolling-menu';


class Feature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rastaurants: [
                { id: "", resName: "Book2", resPicture: "", starAverage: 0.0 },
                // for testing              
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 5.0 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 4.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 2.0 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: 3.5 },
                { id: "", resName: "Book", resPicture: "CAFE", starAverage: .5 },
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
            ]
        }

    }



    renderRestaurant(r) {
        return (
            <div style={{ margin: '2rem', border: '1px solid #000', width: '15rem', height: '15rem' }}>

                <img src={r.resPicture} height='100%' width='100%' />
                <Link to={'/restaurant/' + r._id}>{r.resName} </Link>
                <Star isClickAble={false} type='splitedBar' stars={r.starAverage} style={{ margin: '1rem', border: '1px solid #000', width: '10rem', height: '15rem' }} />

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
                <div style={{ fontSize: '3rem' }}
                    className={className}
                >{text}</div>
            );
        };
        // const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
        // const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

        const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
        const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

        return (
            <ScrollMenu
                // arrowLeft={ArrowLeft}
                // arrowRight={ArrowRight}
                data={this.renderRestaurants()}
            />
        )
    }
    
}
export default Feature;