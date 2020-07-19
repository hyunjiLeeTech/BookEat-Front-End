import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import Daily from './Daily';
import Feature from './Feature';
import Favorite from './Favorite';
import SearchBox from './SearchBox';

class Home extends Component {


    render() {
        return (
            <MainContainer>
                <div className="container">
                    <header className="jumbotron my-4">
                        <h1 className="display-3">Welcome to BookEat!</h1>
                        <p>Find the best restaurants here</p>
                        <div className="container">
                                <SearchBox/>
                        </div>

                    </header>
                    <div className="card" >
                        <div className="card-body">
                            <Daily />
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <Feature />
                        </div>
                    </div>
                    <br></br>
                    <div className="card" >
                        <div className="card-body">
                            <Favorite />
                        </div>
                    </div>
                </div>
            </MainContainer>

        )
    }
}

export default Home;