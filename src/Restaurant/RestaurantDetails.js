import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";

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
                Display Search Result Here
            </MainContainer>


        )
    }
}

export default RestaurantDetails;