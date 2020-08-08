import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Parser from "html-react-parser";
// import $ from "jquery";
// import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"
// import customerReserve from "../customerReserve"
import FullscreenError from '../../component/Style/FullscreenError'
import DataService from "../../Services/dataService";
import moment from "moment";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import dataService from "../../Services/dataService";
import { toast } from "react-toastify";

//TODO: Edit reservation button
class CustomerReservationHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reservations: [
      ],
      resultsErr: false,
      isModalShow: false,
      modalText: 'Loading',
      modalTitle: 'Food Order Details'
    }
    DataService.getCustomerReservations().then((res) => {
      for (var r of res.reservations) r.buttonDisabled = false;
      this.setState({ reservations: res.reservations });
      console.log(res.reservations)
    }).catch(err => {
      console.log(err)
    })
    this.renderTable = this.renderTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("saved")
    // if (formValid(this.state)) {
    //     console.log(this.state)
    //     ds.addMenu(this.state);
    // } else {
    //     console.log("Form is invalid!");
    // }
  };



  renderTable() {
    const btnclick = (foodOrderId) => {
      console.log(foodOrderId)
      this.setState({ isModalShow: true, modalText: "Loading", modalTitle: 'Food order details' })
      DataService.getFoodOrder(foodOrderId).then((res) => {
        var tr = [];
        var totalPrice = 0;
        for (var i of res.menus) {
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

    const renderStatus = (status) => {
      switch (status) {
        case 0: return <td>Finished</td>
        case 1: return <td>Not Attend</td>
        case 2: return <td>Scheduled</td>
        case 3: return <td>Customer Cancelled</td>
        case 4: return <td>Restaurant Cancelled</td>
        default: return <td>Unknown</td>
      }
    }
    const renderStatusClassName = (status) => {
      switch (status) {
        case 0: return 'alert alert-success'
        case 1: return 'alert alert-error'
        case 2: return 'alert alert-info'
        case 3:
        case 4: return 'alert alert-warning'
        default: return ''
      }
    }

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        This reservation comes in 12 hours. Please contact the restaurant to cancel it.
      </Tooltip>
    );

    const btnCancel = (resv) => {
      resv.buttonDisabled = true;
      this.forceUpdate();
      dataService.customerCancelReservation(resv._id).then(res => {
        toast('Reservation successfully cancelled', { type: 'success', autoClose: 3000 });
        resv.status = 3;
      }).catch(err => {
        toast('Error', { type: 'error', autoClose: 3000 })
      }).finally(() => {
        resv.buttonDisabled = false;
        this.forceUpdate();
      })
    }

    var notUpcoming = new Set(this.state.reservations);
    var upcoming = new Set();
    for (var resv of notUpcoming) {
      if (resv.status === 2) {
        upcoming.add(resv);
        notUpcoming.delete(resv);
      }
    }
    const renderCancelButton = (resv) => {
      const { _id, dateTime, status, reserveTime, numOfPeople, restaurant } = resv
      if (resv.status === 2) return moment(new Date(dateTime)).diff(new Date(), 'h') < 12
        ?
        <OverlayTrigger
          placement="top"
          delay={{ show: 0, hide: 1000 }}
          overlay={renderTooltip}
        >
          <Button className='btn btn-grey disabled' aria-disabled="true">Cancel</Button>
        </OverlayTrigger>
        : <Button className='btn btn-danger' onClick={() => btnCancel(resv)} >Cancel</Button>

      else return null;

    }

    this.state.reservations = [...upcoming, ...notUpcoming];

    return this.state.reservations.map((reservation, index, reservations) => {

      const { _id, dateTime, status, reserveTime, numOfPeople, restaurant } = reservation
      return (
        <tr key={_id} className={renderStatusClassName(status)}>
          {
            renderStatus(status)
          }

          <td>{moment(dateTime).format('YYYY-MM-DD HH:mm')}</td>
          <td><Link to={'/restaurant/' + restaurant._id}>{restaurant.resName}</Link> </td>
          <td>{numOfPeople}</td>

          {
            reservations[index].buttonDisabled ?
              <td><Button className='btn btn-info'>Please Wait...</Button></td>
              :
              <td>

                {renderCancelButton(reservations[index])}
                {reservations[index].status === 2 ? <span>&nbsp;</span> : null}
                {reservations[index].status === 2 ? <Link className='btn btn-warning' to={'customerreserve/' + restaurant._id + '/' + 
                moment(dateTime).format('YYYY-MM-DD') + '/' + moment(dateTime).format('HH:mm') + '/' + numOfPeople +'/true/' + _id 
              }>Edit</Link> : null}
                <span>&nbsp;</span>
                {
                  reservations[index].FoodOrder ?
                    <Button className='btn btn-primary' onClick={() => btnclick(reservations[index].FoodOrder)} >View Food Order</Button>
                    : null
                }
              </td>
          }

          <td>{moment(reserveTime).format('YYYY-MM-DD HH:mm')}</td>
        </tr>
      )
    })
  }

  render() {
    const handleClose = () => {
      this.setState({ isModalShow: false, modalText: '', modalTitle: '' })
    }
    return (
      <Maincontainer>
        {this.state.resultsErr
          ?
          FullscreenError("An error occured, please try again later")
          :
          null
        }
        <form id="reservationEdit"
        // onSubmit={this.handleSubmit} 
        >
          <div className="form-group mt-5">
            <h3> Upcomming reservation</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Restaurant</th>
                  <th>Ordered Food</th>
                  <th># of Visitor</th>
                  <th># of Table </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th value={this.state.UpDate}></th>
                  <th value={this.state.UpRestaurant}></th>
                  <th value={this.state.UpKindOfFood}></th>
                  <th value={this.state.UpNumOfPeople}></th>
                  <th value={this.state.NumOfTable}> </th>
                </tr>
              </tbody>
            </table>
          </div>


          {/* Todo: Do it after finishing reservation  */}
          <div id="changeReservation" className="form-inline">
            <div className="form-group">
              {/* <Link to={'/customerreserve/' + restaurantId._id} className="btn btn-primary"> */}
              <Link to={"/customerReserve"} >
                <button
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2 lm-5rem">
                  Change reservation
                    </button>
              </Link>
            </div>

            <div id="cancelReservation" className="form-group">
              {/* <Link to="/"> */}
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
                data-toggle="modal" data-target="#DeleteResultModal"
              >
                Cancel reservation
                    </button>
              {/* </Link> */}
            </div>
          </div>
        </form>
        <form id="reservationhistory" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <br />
            <br />
            <h3> Reservation History</h3>
            <p>
              Thank you for loving BookEat. <br />
                  Here is your BookEat history.{" "}
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Restaurant</th>
                  <th># of Visitor</th>
                  <th>Operation</th>
                  <th>Reserve date</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </div>
        </form>
        
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


        {/* DeleteREservationModal */}
        <div
          className="modal fade"
          id="DeleteResultModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="DeleteResultModal"
          aria-hidden="true"
        >

          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="DeleteResultModal">
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
                <p className="alert alert-warning" id="DeleteResultModalText">
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
        </div>

      </Maincontainer>
    )
  }
}

export default CustomerReservationHistory;