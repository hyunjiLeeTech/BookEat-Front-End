import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numofpeople: 0,
            dateTime: new Date(),
            resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        var react = this;
        e.preventDefault();
        console.log("submit")
        var numofpeople = $('#numofpeople').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var resId = '5efa8fc9dd9918ba08ac9ade';
        var dateTime = new Date(Date.parse(date + ' ' + time));
        console.log(numofpeople)
        console.log(date)
        console.log(time)
        this.setState({
            resId: resId,
            dateTime: dateTime,
            numofpeople: numofpeople
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <header className="jumbotron my-4">
                        <h1 className="display-3">Welcome to BookEat!</h1>
                        <p>Find the best restaurants here</p>
                        <div className="form-group row">
                        <div className="row justify-content-start">
                            <div className="col-sm-3">
                                <input type="date" id="date" name="date" placeholder="date"
                                    className='form-control' required />
                            </div>

                            <div className="col-sm-3">
                                <input type="text" id="time" name="time" placeholder="time"
                                    className='form-control' required />
                            </div>

                            <div className="col-sm-3">
                                <input type="number" id="numofpeople" name="numofpeople" placeholder="Number of People"
                                    className='form-control' required />
                            </div>
                            
                            </div>
                            
                            <div className="col-sm-6">
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                            </div>
                            
                        </div>




                    </header>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Daily Pick Up</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Feature Restaurants</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Favorite Restaurant</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                </div>
            </MainContainer>

        )
    }
}

export default Home;