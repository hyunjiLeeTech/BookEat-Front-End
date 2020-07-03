import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../component/Style/MainContainer'
import Parser from 'html-react-parser'
import $ from "jquery";

class RestaurantReservation extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        e.preventDefault();
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }


    render() {
        const { isError } = this.state;
        return (
            <MainContainer>
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a class="nav-link active" data-toggle="tab" role="tab" href="#upcomingRes" aria-controls="upcomingRes" aria-selected="true">
                                    Upcoming Reservation
                                </a>

                            </li>
                            <li className="nav-item">
                                <a class="nav-link" data-toggle="tab" role="tab" href="#pastRes" aria-controls="pastRes" aria-selected="false">
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
                                        <tr>
                                          
                                        </tr>
                                        
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
                                        <tr>
                                           
                                        </tr>
                                       
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