import React, { Component } from 'react'
// import Parser from 'html-react-parser'
import $ from "jquery";
import dataService from '../Services/dataService';
import { toast } from 'react-toastify';
// import { ToastContainer, toast, cssTransition } from 'react-toastify';
import Axios from 'axios';
import authHeader from '../Services/authHeader';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class RestaurantReservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcoming: [],
            past: [],
            isModalShow: false,
            modalTitle: '',
            modalText: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.querypast = this.querypast.bind(this);
        this.renderPast = this.renderPast.bind(this);
        this.queryPresent = this.queryPresent.bind(this);
        this.renderPresent = this.renderPresent.bind(this);
    }

    cancelReservation(reservationId) {
        const infoToast = toast("Please Wait", { autoClose: false })
        dataService.restaurantCancelReservation(reservationId).then(res => {
            toast.update(infoToast, { render: "Reservation cancelled", type: toast.TYPE.SUCCESS, autoClose: 5000, className: 'pulse animated' })
            $("#" + reservationId + "btn").attr('disabled', 'true').text("Cancelled")
        }).catch(err => {
            if (err.errcode) {
                toast.update(infoToast, { render: err.errmsg, type: toast.TYPE.ERROR, autoClose: 5000, className: 'pulse animated' })
            } else {
                toast.update(infoToast, { render: "error occured", type: toast.TYPE.ERROR, autoClose: 5000, className: 'pulse animated' })
            }
        })
    }

    confirmAttandance(reservationId) {
        const infoToast = toast("Please Wait", { autoClose: false })
        dataService.restaurantConfirmReservation(reservationId).then(res => {
            toast.update(infoToast, { render: "Reservation confirm", type: toast.TYPE.SUCCESS, autoClose: 5000, className: 'pulse animated' })
            $("#" + reservationId + "btn").attr('disabled', 'true').text("Confirm")
        }).catch(err => {
            if (err.errcode) {
                toast.update(infoToast, { render: err.errmsg, type: toast.TYPE.ERROR, autoClose: 5000, className: 'pulse animated' })
            } else {
                toast.update(infoToast, { render: "error occured", type: toast.TYPE.ERROR, autoClose: 5000, className: 'pulse animated' })
            }
        })

    }

    viewFoodOrder(foodOrderId) {
        //TODO: Add the food order component 
        this.setState({ isModalShow: true, modalText: "Loading", modalTitle: 'Food order details' })
        Axios.get('http://localhost:5000/restaurant/getfoodorder/' + foodOrderId, { headers: authHeader() }).then((res) => {
            console.log(res);
            var tr = [];
            var totalPrice = 0;
            for (var i of res.data.menus) {
                tr.push(<p>
                    {i.menuName} -
                    ${i.menuPrice}
                </p>)
                totalPrice += Number.parseFloat(i.menuPrice)
            }
            tr.push(<hr />)
            tr.push(<p>Total: ${totalPrice}</p>)
            this.setState({
                modalText: tr
            })
        })
    }

    renderPresent() {
        var rows = [];
        for (var ro of this.state.upcoming) {
            console.log("RO")
            console.log(ro)
            rows.push(
                <tr key={rows} id={ro._id}>
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

                    <td>
                        {
                            ro.FoodOrder ?

                                <button type="button" className="btn btn-primary btn-sm"
                                    id={ro._id + 'btn'}
                                    onClick={() => this.viewFoodOrder(ro.FoodOrder)}>
                                    {/* TODO:Change onClick to foodorder */}
                                    View Order
                                </button> : null
                        }



                    </td>

                    <td>
                        <button type="button" className="btn btn-success btn-sm"
                            id={ro._id + 'btn'}
                            onClick={() => this.confirmAttandance(ro._id)}>
                            Confirm Attandance
                        </button>
                    </td>

                    <td>
                        <button type="button" className="btn btn-danger btn-sm"
                            id={ro._id + 'btn'}
                            onClick={() => this.cancelReservation(ro._id)}
                        >
                            Cancel Reservation </button>


                        {/* Cancel Modal */}
                        {/* This results in mutiple modals in the page. do not put this into a loop */}
                        {/* <div
                            className="modal fade"
                            id="cancelModal"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="cancelLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="cancelModalLabel">
                                            Cancel Reservation
                                        </h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="alert alert-warning" id="signResultText">
                                            Please Wait...
                                        </p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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

    renderPast() { //TODO: display reservation status
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
                    <td>
                    {


                        r.FoodOrder ?

                            <button type="button" className="btn btn-primary btn-sm"
                                id={r._id + 'btn'}
                                onClick={() => this.viewFoodOrder(r.FoodOrder)}>
                                {/* TODO:Change onClick to foodorder */}
        View Order
    </button> : null
                    }</td>
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
        const handleClose = () => {
            this.setState({ isModalShow: false, modalText: '', modalTitle: '' })
        }
        return (
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
                                        <th scope="col">Food Order</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
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
                                        <th scope="col">Operation</th>
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
                <Modal show={this.state.isModalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default RestaurantReservation;