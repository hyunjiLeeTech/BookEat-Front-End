import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import $ from "jquery";
import Daily from './Daily';
import Feature from './Feature';
import Favorite from './Favorite';

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

                                    <select
                                        className="custom-select"
                                        id="time"
                                        name="time"
                                        value={this.state.time}
                                        required
                                    >
                                        <option value="">Time</option>
                                        <option value="7am">7:00 AM</option>
                                        <option value="730am">7:30 AM</option>
                                        <option value="8am">8:00 AM</option>
                                        <option value="830am">8:30 AM</option>
                                        <option value="9am">9:00 AM</option>
                                        <option value="930am">9:30 AM</option>
                                        <option value="10am">10:00 AM</option>
                                        <option value="1030am">10:30 AM</option>
                                        <option value="11am">11:00 AM</option>
                                        <option value="1130am">11:30 AM</option>
                                        <option value="12pm">12:00 PM</option>
                                        <option value="1230pm">12:30 PM</option>
                                        <option value="1pm">1:00 PM</option>
                                        <option value="130pm">1:30 PM</option>
                                        <option value="2pm">2:00 PM</option>
                                        <option value="230pm">2:30 PM</option>
                                        <option value="3pm">3:00 PM</option>
                                        <option value="330pm">3:30 PM</option>
                                        <option value="4pm">4:00 PM</option>
                                        <option value="430pm">4:30 PM</option>
                                        <option value="5pm">5:00 PM</option>
                                        <option value="530pm">5:30 PM</option>
                                        <option value="6pm">6:00 PM</option>
                                        <option value="630pm">6:30 PM</option>
                                        <option value="7pm">7:00 PM</option>
                                        <option value="730pm">7:30 PM</option>
                                        <option value="8pm">8:00 PM</option>
                                        <option value="830pm">8:30 PM</option>
                                        <option value="9pm">9:00 PM</option>
                                        <option value="930pm">9:30 PM</option>
                                        <option value="10pm">10:00 PM</option>
                                        <option value="1030pm">10:30 PM</option>
                                        <option value="11pm">11:00 PM</option>
                                        <option value="1130pm">11:30 PM</option>
                                        <option value="12am">12:00 AM</option>
                                        <option value="1230am">12:30 AM</option>
                                        <option value="1am">1:00 AM</option>
                                        <option value="130am">1:30 AM</option>
                                    </select>


                                </div>

                                <div className="row col-md-2">

                                    <select
                                        className="custom-select"
                                        id="numberOfPeople"
                                        name="numberOfPeople"
                                        value={this.state.numberOfPeople}
                                        required
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
                            <Daily />
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <Feature />
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <Favorite />
                        </div>
                    </div>
                </div>
            </MainContainer>

        )
    }
}

export default Home;