import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfPeople: '',
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
                        <div className="container">

                            <div className="row justify-content-start">
                                <div className=" row col-sm-2">
                                    <input type="date" id="date" name="date" placeholder="Date"
                                        className='form-control' required />

                                </div>

                                <div className="row col-sm-2">
                                    <input type="text" id="time" name="time" placeholder="Time"
                                        className='form-control' required />
                                </div>

                                <div className="row col-md-2">
                                    {/* <span className="fa fa-search form-control-feedback"></span>
                                    <input type="text" id="numofpeople" name="numofpeople" placeholder="Number of People"
                                        className='form-control' required /> */}
                                    <select
                                        className="custom-select"
                                        id="numberOfPeople"
                                        name="numberOfPeople"
                                        value={this.state.numberOfPeople}
                                    >
                                        <option value=""># Of People</option>
                                        <option value="1">1 People</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5">5 People</option>
                                        <option value="6">6 People</option>
                                        <option value="7">7 People</option>
                                        <option value="8">8 People</option>
                                        <option value="9">9 People</option>
                                        <option value="10">10 People</option>
                                        <option value="11">11 People</option>
                                        <option value="12">12 People</option>
                                        <option value="13">13 People</option>
                                        <option value="14">14 People</option>       
                                    </select>

                                </div>

                                <div className="col-sm-5 form-group has-search">
                                    <span className="fa fa-search form-control-feedback"></span>
                                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />

                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary mr-sm-4"> Find</button>
                                </div>


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