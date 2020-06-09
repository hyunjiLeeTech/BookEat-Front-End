import React from 'react';
import './manageReservation.css';


class ManageReservation extends React.Component{
    render(){
        return(
            <div>
                <p id="logo">My Rservations</p>
                <div className="reservation res-upcoming row">
                    <div className="info col-md-8">                    <p>Feb. 27th 10:00 PM, Demo restaurant</p>
                    <p>5 Persons</p></div>

                    <div className="operation col-md-4"><a className="btn btn-info">Cancel</a>
                    <a className="btn btn-primary">Reschedule</a></div>
                </div>
                <div className="reservation res-error row">
                    <div className="info col-md-8">                    <p>Feb. 27th 10:00 PM, Demo restaurant</p>
                    <p>5 Persons</p></div>

                    <div className="operation col-md-4"><a className="btn btn-error">Not Attend</a></div>
                </div>
                <div className="reservation res-done row">
                    <div className="info col-md-8"><p>Feb. 27th 10:00 PM, Demo restaurant</p>
                    <p>5 Persons</p></div>
                    <div className="operation col-md-4"><a className="btn btn-success">Finished</a></div>
                </div>
                <div className="reservation res-done row">
                    <div className="info col-md-8"><p>Feb. 27th 10:00 PM, Demo restaurant</p>
                    <p>5 Persons</p></div>
                    <div className="operation col-md-4"><a className="btn btn-success">Finished</a></div>
                </div>
                <div className="reservation res-done row">
                    <div className="info col-md-8"><p>Feb. 27th 10:00 PM, Demo restaurant</p>
                    <p>5 Persons</p></div>
                    <div className="operation col-md-4"><a className="btn btn-success">Finished</a></div>
                </div>
            </div>
            
        )
    }
}

export default ManageReservation;