import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import SearchBox from './SearchBox';
import './SearchResult.css'
import dataService from '../Services/dataService';

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfPeople: '',
            dateTime: new Date(),
            //resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
            restaurants: [],
            filters: [],
        }

    }
    componentWillMount() {
        dataService.search({
            numberOfPeople: this.state.numberOfPeople,
            dateTime: this.state.dateTime,
            filters: this.state.filters,
        })
        .then(res=>{
            console.log(res.restaurants)
            this.setState({restaurants: res.restaurants});
        }).catch(err=>{//TODO: err handling

        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <MainContainer>
                <div className="container">
                    <div className="card text-center">
                        <SearchBox />
                    </div>


                    {/* Filter Side of the Page */}
                    <div className="row">
                        <div className="col-sm-4">
                            <div >
                                <br />
                                <p>Price Range</p>
                                <hr></hr>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="priceLow" />
                                    <label className="form-check-label" htmlFor="priceLow">
                                        $ ($0-$50)
                                 </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="priceMedium" />
                                    <label className="form-check-label" htmlFor="priceMedium">
                                        $$ ($50-$100)
                                 </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="priceHigh" />
                                    <label className="form-check-label" htmlFor="priceHigh">
                                        $$$ ($100+)
                                 </label>
                                </div>
                            </div>

                            <div>
                                <br />
                                <p>Cuisine Style</p>
                                <hr></hr>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleAmerican" />
                                    <label className="form-check-label" htmlFor="styleAmerican">
                                        American
                                 </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleItalian" />
                                    <label className="form-check-label" htmlFor="styleItalian">
                                        Italian
                                 </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleSteak" />
                                    <label className="form-check-label" htmlFor="styleSteak">
                                        Steak House
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleSeafood" />
                                    <label className="form-check-label" htmlFor="styleSeafood">
                                        Seafood
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleFrench" />
                                    <label className="form-check-label" htmlFor="styleFrench">
                                        French
                                 </label>
                                </div>

                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">More</a>
                                <div className="collapse list-unstyled" id="pageSubmenu">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleIndian" />
                                        <label className="form-check-label" htmlFor="styleIndian">
                                            Indian
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleJapanese" />
                                        <label className="form-check-label" htmlFor="styleJapanese">
                                            Japanese
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleBritish" />
                                        <label className="form-check-label" htmlFor="styleBritish">
                                            British
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleBarbecue" />
                                        <label className="form-check-label" htmlFor="styleBarbecue">
                                            Barbecue
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleTapas" />
                                        <label className="form-check-label" htmlFor="styleTapas">
                                            Tapas
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleGrill" />
                                        <label className="form-check-label" htmlFor="styleGrill">
                                            Grill
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleConform" />
                                        <label className="form-check-label" htmlFor="styleConform">
                                            Conform Food
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleAfternoon" />
                                        <label className="form-check-label" htmlFor="styleAfternoon">
                                            Afternoon Tea
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleBurgers" />
                                        <label className="form-check-label" htmlFor="styleBurgers">
                                            Burgers
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleCanadian" />
                                        <label className="form-check-label" htmlFor="styleCanadian">
                                            Canadian
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleVegan" />
                                        <label className="form-check-label" htmlFor="styleVegan">
                                            Vegan
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleVegetarian" />
                                        <label className="form-check-label" htmlFor="styleVegetarian">
                                            Vegetarian
                                 </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleAsian" />
                                        <label className="form-check-label" htmlFor="styleAsian">
                                            Asian
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleEuropean" />
                                        <label className="form-check-label" htmlFor="styleEuropean">
                                            European
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleContinental" />
                                        <label className="form-check-label" htmlFor="styleContinental">
                                            Continental
                                 </label>
                                    </div>

                                </div>
                            </div>


                            <div>
                                <br />
                                <p>Category</p>
                                <hr />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleEthinic" />
                                    <label className="form-check-label" htmlFor="styleEthinic">
                                        Ethinic
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleFast" />
                                    <label className="form-check-label" htmlFor="styleFast">
                                        Fast Food
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleFastCasual" />
                                    <label className="form-check-label" htmlFor="styleFastCasual">
                                        Fast Casual
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="styleCasual" />
                                    <label className="form-check-label" htmlFor="styleCasual">
                                        Casual Dining
                                 </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="stylePremium" />
                                    <label className="form-check-label" htmlFor="stylePremium">
                                        Premium Dining
                                 </label>
                                </div>

                                <a href="#pageSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">More</a>
                                <div className="collapse list-unstyled" id="pageSubmenu2">


                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleFamily" />
                                        <label className="form-check-label" htmlFor="styleFamily">
                                            Family Dining
                                 </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="styleFine" />
                                        <label className="form-check-label" htmlFor="styleFine">
                                            Fine Dining
                                 </label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Results  */}
                        <div className="col-sm-8">
                            <br />
                            <h4>You search for " "</h4>
                            <p> Restaurants availables</p>
                            <hr />

                            <section>
                                <div className="container">
                                    <div className="card">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-block">
                                                    <h6 className="card-title">Restaurant Title</h6>
                                                    <p className="card-text">Starts Price Range Cuisine Style</p>
                                                    <p className="card-text">Restaurant Description</p>
                                                    <button href="#" className="btn btn-primary">Reserve</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-img-bottom">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>


                </div>
            </MainContainer>


        )
    }
}

export default SearchResult;