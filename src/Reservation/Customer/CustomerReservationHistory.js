import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"

class CustomerReservationHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reservations: [
        { id: "", date: "", orderFood: "", visotorNum: "", tableNum: "" },
        // testing
        { id: "1", date: "2020-05-05", orderFood: "noodle", visotorNum: "2", tableNum: "3" }
      ]
    }

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    return this.state.reservations.map((reservation, index) => {
      const { id, date, orderFood, visotorNum, tableNum } = reservation
      return (
        <tr key={id}>
          <td>{date}</td>
          <td>{orderFood}</td>
          <td>{visotorNum}</td>
          <td>{tableNum}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Maincontainer>
        <div className="form-group mt-5">
          <h3> Upcomming reservation</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order Food</th>
                <th>Visitor #</th>
                <th>Table #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Todo: Do it after finishing reservation  */}
        <div form id="changeReservation" className="form-inline">
          <div className="form-group">
            {/* <Link to="/"> */}
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
              >
                Change reservation
                    </button>
            {/* </Link> */}
          </div>
          <div id="cancelReservation" className="form-group">
            {/* <Link to="/"> */}
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
                onClick={this.delteReservation}
              >
                Cancel reservation
                    </button>
            {/* </Link> */}
          </div>
        </div>
        <div className="form-group">
          <br />
          <br />
          <h3> Reservation History</h3>
          <p>
            Thank you for loving BookEat. <br />
                  Here is your BookEat history.{" "}
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order Food</th>
                <th>Visitor #</th>
                <th>Table # </th>
              </tr>
            </thead>
            <tbody>
            {this.renderTable()}
            </tbody>
          </table>
        </div>

      </Maincontainer>
    )
  }
}

export default CustomerReservationHistory;