import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ds from "../Services/dataService"

class EmailConfirmation extends Component {

    //TODO: email confirmation
    //use: this.props.match.params.id

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id
        }
    }

    emailConfirmation(){
        console.log("this is user" + this.props.match.params.id);
        ds.confirmEmail(this.props.match.params.id).then((user) => {
            console.log(user.id);
            this.setState({
                id: user.id
            })
        })
    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    {this.props.match.params.id}
                    <div className=" card-body text-center">
                        <br />
                        <br />
                        <br />
                        <h3>Success email verification</h3>
                        <p>Click the following button to log in to your account and start exploring</p>
                        <Link to='/Login' className="btn btn-primary"> Log In </Link>
                        <br />
                        <br />
                        <p>Thank you for choosing BookEat!</p>

                    </div>
                </div>
            </MainContainer>
        )
    }
}

export default withRouter(EmailConfirmation);