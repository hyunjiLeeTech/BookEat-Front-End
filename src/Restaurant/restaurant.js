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

class Restaurant extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            res: {},
        }
    }

    componentWillMount(){
        Axios.get("http://localhost:5000/restaurants/" + this.state.id)//TODO: remove if production
            .then(res=>{
                if(res.data.errcode === 0)
                this.setState({
                    res: res.data.restaurant
                })
            })
    }

    componentDidMount(){
    }

    render(){
        return(<div>
            {JSON.stringify(this.state.res)}<br/><br/><br/>
            <Link to={'/customerreserve/' + this.state.id} >Reserve</Link>
        </div>)
    }

}

export default withRouter(Restaurant)