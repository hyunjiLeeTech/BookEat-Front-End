import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'

class Home extends Component {

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <header className="jumbotron my-4">
                        <h1 className="display-3">Welcome to BookEat!</h1>
                        <p>Find the best restaurants here</p>
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </header>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Daily Pick Up</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                     <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Feature Restaurants</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Favorite Restaurant</h5>
                            <p className="card-text">Some Restaurants</p>
                        </div>
                    </div>
                </div>
            </MainContainer>

        )
    }
}

export default Home;