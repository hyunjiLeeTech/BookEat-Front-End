import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"

class CustomerReservationHistory extends Component {

  delteReservation = (e) => {
    e.preventDefault();
    
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
                <td>2020-06-01</td>
                <td>stake</td>
                <td>5</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div form id="changeReservation" className="form-inline">
          <div className="form-group">
            <Link to="/">
                    <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
              >
                Change reservation
                    </button>
            </Link>
          </div>
          <div id="cancelReservation" className="form-group">
            <Link to="/">
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
                onClick={this.delteReservation}
              >
                Cancel reservation
                    </button>
            </Link>
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
              <tr>
                <td>2020-06-01</td>
                <td>stake</td>
                <td>5</td>
                <td> 1</td>
              </tr>
              <tr>
                <td>2020-06-01</td>
                <td>stake</td>
                <td>5</td>
                <td> 1</td>
              </tr>
              <tr>
                <td>2020-06-01</td>
                <td>stake</td>
                <td>5</td>
                <td> 1</td>
              </tr>
            </tbody>
          </table>
        </div>

      </Maincontainer>
    )
  }
}

export default CustomerReservationHistory;