import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import Daily from './Daily';
import Feature from './Feature';
import Favorite from './Favorite';
import SearchBox from './SearchBox';


import Star from '../component/Style/Stars'
class Home extends Component {


    render() {
        return (
            <MainContainer>

                <div style={{ width: '20%' }}>
                    {/* type: can be star, btns, splitedBar, bar
                    bar: unclickable, can display float value
                    splitedBar: unclickable, can display float value
                    star: clickable or unclickable, cannot display float value
                    btns: clickable or unclickable, cannot display float value
                stars: number 1-5
                callback: (StarClicked) => void starClicked is what user clicked
                 */}
                    <Star />
                    <hr />
                    <Star type='bar' stars={3.8} />
                    <hr />
                    <Star type='splitedBar' stars={3.8} /> 
                    <hr />
                    <Star isClickAble={true} type='star' stars={2} callback={
                        (e) => { console.log(e) }
                    } />
                    <hr />
                    <Star isClickAble={true} type='btns' stars={4} callback={
                        (e) => { console.log(e) }
                    } />
                </div>


                <div className="container">
                    <header className="jumbotron my-4">
                        <h1 className="display-3">Welcome to BookEat!</h1>
                        <p>Find the best restaurants here</p>
                        <div className="container">
                            <SearchBox />
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