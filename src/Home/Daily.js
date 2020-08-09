import React, { Component } from 'react'
// import MainContainer from '../component/Style/MainContainer';
// import $ from "jquery";
import { Link } from 'react-router-dom'
// import CAFE from '../Image/CAFE.jpg'
import Star from '../component/Style/Stars'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import dataService from '../Services/dataService';
import restaurant from '../Restaurant/restaurant';
import { toast } from 'react-toastify';
import serverAddress from '../Services/ServerUrl';

// import dailycss from './Daily.css'

class Daily extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaruants: [
            ]
        }
        dataService.getDaily().then(res=>{
            this.setState({restaruants: res.restaruants})
            console.log(this.state);
        }).catch(err=>{
            toast('error', {type: 'error'})
        })
    }



    renderRestaurant(r) {
        return (
            <div style={{ margin: '2rem', border: '1px solid #000', width: '15rem', height: '15rem' }}>
                <img src={ serverAddress + '/getImage/'+r.pictures[0]} height='100%' width='100%' />
                <Link to={'/restaurant/' + r._id}>{r.resName} </Link>
            </div>
        )
    }

    renderRestaurants() {
        var tr = [];
        for (var r of this.state.restaruants) {
            tr.push(this.renderRestaurant(r))
        }
        return tr;
    }


    render() {
        // const Arrow = ({ text, className }) => {
        //     return (
        //         <div style={{ fontSize: '3rem' }}
        //             className={className}
        //         >{text}</div>
        //     );
        // };
        // const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
        // const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

        // const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
        // const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

        return (
            <ScrollMenu
                // arrowLeft={ArrowLeft}
                // arrowRight={ArrowRight}
                data={this.renderRestaurants()}
            />
        )
    }
}

export default Daily;