import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MainContainer from '../../component/Style/MainContainer'
import './RestaurantProfile.css'

class RestaurantProfile extends Component {

    render() {
        return (
            <MainContainer>

                <div className="row">

                   
                    <div className="col-md-3 col-sm-3 col-xs-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <Link className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" to="#list-home" role="tab" aria-controls="home">Home</Link>
                            <Link className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" to="#list-profile" role="tab" aria-controls="profile">Profile</Link>
                            <Link className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" to="#list-messages" role="tab" aria-controls="messages">Messages</Link>
                            <Link className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" to="#list-settings" role="tab" aria-controls="settings">Settings</Link>
                        </div>
                    </div>

                
                    <div className="col-md-9 col-sm-9 col-xs-9">
                        <div className="card">
                            <div className="card-header">
                                My Profile
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <Link to="/" className="btn btn-primary"> Go </Link>
                            </div>
                        </div>
                    </div>


                </div>

            </MainContainer>
        )
    }

}

export default RestaurantProfile;