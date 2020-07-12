import React, { Component } from  'react';
import { Link } from 'react-router-dom';

class CustomerReservtion extends Component {

    render(){
      return   (
          <form className="container mt-sm-5">
                <h1>Make Reservation</h1>
                <div className="form-group">
                    <label> Party Size </label>
                    <input className="form-control" id="reservation" name="reservation"/>
                </div>
                <div className="form-group row">
                    <div className="form-group col-sm-6">
                    <label>Date</label>
                    <input className="form-control col-sm-6"/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label>Time</label>
                        <input className="form-control col-sm-6"/>
                    </div>
                </div>
                <div>
                    
                </div>
                <div>
                    <Link to="">
                    Additional seating options
                    </Link>
                </div>
             </form>
         )
    }
}

export default CustomerReservtion;