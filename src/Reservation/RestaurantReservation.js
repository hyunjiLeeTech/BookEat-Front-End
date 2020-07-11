import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../component/Style/MainContainer'
import Parser from 'html-react-parser'
import $ from "jquery";
import dataService from '../Services/dataService';

class RestaurantReservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcoming: [],
            past: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.querypast = this.querypast.bind(this);
        this.renderPast = this.renderPast.bind(this);
        this.queryPresent = this.queryPresent.bind(this);
        this.renderPresent = this.renderPresent.bind(this);
    }

    renderPresent() {
        var rows = [];
        for (var ro of this.state.upcoming) {
            console.log("RO")
            console.log(ro)
            rows.push(   
                <tr key={rows}>
                    <td >
                        {ro.customer.firstName + " " + ro.customer.lastName}
                    </td>

                    <td > 
                        {ro.table.rid}
                    </td>

                    <td >
                        {ro.dateTime}
                    </td>

                    <td >
                        {ro.numOfPeople}
                    </td>

                    <td >
                        {ro.comments}
                    </td>

                </tr>
            )
        }
        return rows;
    }

    queryPresent() {
        dataService.getRestaurantUpcomingReservation().then(res => {
            console.log(res.reservations);
            this.setState({
                upcoming: res.reservations,
            })
        })
    }

    renderPast() {
        var row = [];
        for (var r of this.state.past) {
            row.push(
                <tr key={row}>
                    <td > 
                        {r.customer.firstName + " " + r.customer.lastName}
                    </td>

                    <td >  
                        {r.table.rid}
                    </td>

                    <td >
                        {r.dateTime}
                    </td>

                    <td >
                        {r.numOfPeople}
                    </td>

                    <td >
                        {r.comments}
                    </td>

                </tr>
            )
        }
        return row;
    }

    querypast() {
        dataService.getRestaurantPastReservation().then(res => {
            console.log(res.reservations);
            this.setState({
                past: res.reservations,
            })
        })
    }

    handleChange(e) {
        e.preventDefault();
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    componentWillMount() {
        this.querypast();
        this.queryPresent();
    }

    render() {
        return (
            <MainContainer>
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" role="tab" href="#upcomingRes" aria-controls="upcomingRes" aria-selected="true">
                                    Upcoming Reservation
                                </a>

                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" role="tab" href="#pastRes" aria-controls="pastRes" aria-selected="false">
                                    Past Reservation
                                </a>

                            </li>
                        </ul>
                    </div>


                    <div className="card-body">
                        <div className="tab-content">
                            {/* Start Upcoming Reservation */}
                            <div id="upcomingRes" className="tab-pane fade show active" role="tabpanel" aria-labelledby="upcomingRes">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Table</th>
                                            <th scope="col">Date</th>
                                            <th scope="col"># of People</th>
                                            <th scope="col">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPresent()}

                                    </tbody>
                                </table>
                            </div>
                            {/* End Upcoming Reservation */}

                            {/* Start Past Reservations */}
                            <div id="pastRes" className="tab-pane fade " role="tabpanel" aria-labelledby="pastRes">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Table</th>
                                            <th scope="col">Date</th>
                                            <th scope="col"># of People</th>
                                            <th scope="col">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.renderPast()}


                                    </tbody>
                                </table>
                            </div>
                            {/* End Past Reservations */}


                        </div>
                    </div>



                </div>

            </MainContainer>
        )
    }

}

export default RestaurantReservation;