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
        { id: "", date: "", restaurantName:"", KindOfFood: "", NumOfPeople: "", NumOfTable: "" },
        // testing
        { id: "", date: "", restaurantName:"rest", KindOfFood: "apple", NumOfPeople: "10", NumOfTable: "5" },
      ]
    }

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
    return this.state.reservations.map((reservation, index) => {
      const { id, date, restaurantName, KindOfFood, NumOfPeople, NumOfTable } = reservation
      return (
        <tr key={id}>
          <td>{date}</td>
          <td>{restaurantName}</td>
          <td>{KindOfFood}</td>
          <td>{NumOfPeople}</td>
          <td>{NumOfTable}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Maincontainer>
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
            <tbody> <tr>
                <th value={this.state.UpDate}></th>                
                <th value={this.state.UpRestaurant}></th>
                <th value={this.state.UpKindOfFood}></th>
                <th value={this.state.UpNumOfPeople}></th>
                <th value={this.state.NumOfTable}> </th>
              </tr>
            </tbody>
          </table>
        </div>
        </form>

        {/* Todo: Do it after finishing reservation  */}
        <div id="changeReservation" className="form-inline">
          <div className="form-group">
            {/* <Link to="/"> */}
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"    >
                Change reservation
                    </button>
            {/* </Link> */}
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
        <form id="reservationhistory" onSubmit={this.handleSubmit}>
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
                <th>Restaurant</th>
                <th>Ordered Food</th>
                <th># of Visitor</th>
                <th># of Table</th>
              </tr>
            </thead>
            <tbody>
            {this.renderTable()}
            </tbody>
          </table>
        </div>
</form>
         {/* DeleteREservationModal */}

         <div
                    className="modal fade"
                    id="DeleteResultModal"
                    tabindex="-1"
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