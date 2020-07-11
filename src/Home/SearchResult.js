import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numofpeople: 0,
            dateTime: new Date(),
            resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
        }
      
    }


    componentDidMount() {
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                  results here
                </div>
            </MainContainer>

        )
    }
}

export default SearchResult;