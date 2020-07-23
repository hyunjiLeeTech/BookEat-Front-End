import React, { Component } from 'react'
import MainContainer from '../component/Style/MainContainer'
import SearchBox from './SearchBox';
import './SearchResult.css'
import dataService from '../Services/dataService';
import { data, type } from 'jquery';
import ReactLoading from 'react-loading';
import FullscreenLoading from '../component/Style/FullscreenLoading'
import { Link } from 'react-router-dom';

import FullscreenError from '../component/Style/FullscreenError'

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfPeople: 8,
            dateTime: new Date('2020-07-21 23:00'),
            //resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
            restaurants: [],
            filters: {
                priceRange: new Set(),
                cuisine:new Set(),
                category: new Set(),
            },
            categoriesReady: false,
            cuisinesReady: false,
            priceRangesReady: false,
            resultsReady: false,
            resultsErr: false,
            keyword: '',
            times: [],
        }
        this.querySearchResults = this.querySearchResults.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

    }
    componentWillMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var dt = new Date(urlParams.get('dateTime'))
        var numberOfPeople = urlParams.get('numOfPeople')
        var keyword = urlParams.get('keyword')

        //var restopentime = this.state.restaurants[0].monOpenTime; //ID
        //find this ID in times array 
        // for(var time of this.state.times){
        //     if(restopentime === time._id){
        //         restopentime = time.storeTimeName; // 7:00AM
        //     }
        // }
        if(this.state.keyword != null)
        this.state.keyword = keyword;

        if (Object.prototype.toString.call(dt) === "[object Date]") {
            // it is a date
            if (isNaN(dt.getTime())) {  // d.valueOf() could also work
                this.setState({ resultsErr: true })
            } else {
                //set state is an async function. we need sync set date time here
                this.state.dateTime = urlParams.get('dateTime')
            }
        } else {
            // not a date
        }

        //TODO: filter information from url

        if(!isNaN(Number.parseInt(numberOfPeople))){
            console.log('settting number of people')
            this.state.numberOfPeople = Number.parseInt(numberOfPeople)
        }else{
            console.log("setting error")
            this.state.resultsErr = true
            this.forceUpdate();
        }

        console.log(this.state)
        if (!this.state.resultsErr){
            dataService.getCategories().then(res => {
                this.categories = res;
                this.setState({ categoriesReady: true })
            })
    
            dataService.getCuisines().then(res => {
                this.cuisines = res;
                this.setState({ cuisinesReady: true })
            })
    
            dataService.getPriceRanges().then(res => {
                this.priceRanges = res;
                this.setState({ priceRangesReady: true })
            })
            
            this.querySearchResults();
        }
    }

    querySearchResults() {
        this.setState({
            resultsReady: false
        })
        console.log(this.state.keyword);
        dataService.search({
            numberOfPeople: this.state.numberOfPeople,
            dateTime: this.state.dateTime,
            filters: {
                priceRanges: Array.from(this.state.filters.priceRange),
                cuisines: Array.from(this.state.filters.cuisine),
                categories: Array.from(this.state.filters.category)
            },
            keyword: this.state.keyword,
        })
            .then(res => {
                console.log(res.restaurants)
                this.setState({
                    restaurants: res.restaurants,
                    resultsReady: true
                });

            }).catch(err => {//TODO: err handling
                this.setState({
                    resultsErr: true
                }); 
            })

            //TODO; update filters in url
    }

    handleCheck(e){
        const checked = e.target.checked
        const name = e.target.name
        switch(name){
            case 'priceRange':
                if(checked){
                    this.state.filters.priceRange.add(e.target.value)
                }else{
                    this.state.filters.priceRange.delete(e.target.value)
                }
                break;
            case 'categories':
                if(checked){
                    this.state.filters.category.add(e.target.value)
                }else{
                    this.state.filters.category.delete(e.target.value)
                }
                break;
            case 'cuisines':
                if(checked){
                    this.state.filters.cuisine.add(e.target.value)
                }else{
                    this.state.filters.cuisine.delete(e.target.value)
                }
                break;
        }
    
    }

    renderPriceRange(priceRanges) {
        var tr = [];
        var renderPriceRangeText = function (name) {
            switch (name) {
                case 'low':
                    return '$ ($0-$50)'
                case 'medium':
                    return '$$ ($50-$100)'
                case 'high':
                    return '$$$ ($100+)'
                default:
                    return ''
            }
        }

        for (var pr of priceRanges) {
            if (pr.priceRangeName !== '')
                tr.push(
                    <div className="form-check" key={'pr' + pr._id}>
                        <input name='priceRange' className="form-check-input" type="checkbox" value={pr._id} id={pr.priceRangeName} onChange={this.handleCheck} />
                        <label className="form-check-label" htmlFor={pr.priceRangeName}>
                            {
                                renderPriceRangeText(pr.priceRangeName)
                            }
                        </label>
                    </div>
                )
        }
        return tr;
    }


    renderCategory(categories) {
        var tr = [];
        for (var c of categories) {
            if (c.categoryVal !== '')
                tr.push(
                    <div className="form-check" key={'category' + c._id}>
                        <input name='categories' className="form-check-input" type="checkbox" value={c._id} id={c.categoryVal} onChange={this.handleCheck}/>
                        <label className="form-check-label" htmlFor={c.categoryVal}>
                            {c.categoryName}
                        </label>
                    </div>
                )
        }
        return tr;
    }


    renderCuisineFirst5(cuisines) {
        var tr = [];
        var m = [];
        var len = cuisines.length;
        if (len > 5) len = 5
        for (var i = 0; i < len; i++) {
            m.push(cuisines[i]);
        }
        for (var c of m) {
            if (c.cuisineVal !== '')
                tr.push(
                    <div className="form-check" key={'cuisine' + c._id}>
                        <input name='cuisines' className="form-check-input" type="checkbox" value={c._id} id={c.cuisineVal} onChange={this.handleCheck}/>
                        <label className="form-check-label" htmlFor={c.cuisineVal}>
                            {c.cuisineName}
                        </label>
                    </div>
                )
        }
        return tr
    }

    renderCuisineAfter5(cuisines) {
        var tr = [];
        var m = [];
        if (cuisines.length < 5) return [];
        for (var i = 5; i < cuisines.length; i++) {
            m.push(cuisines[i]);
        }
        for (var c of m) {
            if (c.cuisineVal !== '')
                tr.push(
                    <div className="form-check" key={'cuisine' + c._id}>
                        <input className="form-check-input" type="checkbox" value={c._id} id={c.cuisineVal} />
                        <label className="form-check-label" htmlFor={c.cuisineVal}>
                            {c.cuisineName}
                        </label>
                    </div>
                )
        }
        return tr
    }

    getCuisineNameById(id) {
        try {
            for (var c of this.cuisines) {
                if (c._id == id) return c.cuisineName;
            }
        } catch (err) {
            return null
        }

        return null;
    }

    getCategoryNameById(id) {
        try {
            for (var c of this.categories) {
                if (c._id == id) return c.categoryName;
            }
        } catch (err) {
            return null
        }

        return null;
    }

    getPriceRnageById(id) {
        var renderPriceRangeText = function (name) {
            switch (name) {
                case 'low':
                    return '$ ($0-$50)'
                case 'medium':
                    return '$$ ($50-$100)'
                case 'high':
                    return '$$$ ($100+)'
                default:
                    return ''
            }
        }
        try {
            for (var c of this.priceRanges) {
                if (c._id == id) return renderPriceRangeText(c.priceRangeName)
            }
        } catch (err) {
            return null
        }

        return null;
    }

    renderRestaurants(restaurants) {
        var tr = []
        for (var r of restaurants) {
            tr.push(
                <div className="card" key={"restaurant" + r._id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card-block">
                            <Link to={'/restaurant/' + r._id}><h6 className="card-title">{r.resName ? r.resName : 'unknown'}</h6> </Link> 
                                <p className="card-text">Starts {this.getPriceRnageById(r.priceRangeId)} {this.getCuisineNameById(r.cuisineStyleId)} {this.getCategoryNameById(r.categoryId)}</p>
                                <p className="card-text">{r.restaurantDescription}</p>
                                <Link to={'/customerreserve/' + r._id} className="btn btn-primary">Reserve</Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-img-bottom">
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return tr;


    }

    render() {
        return (
            <MainContainer>

                {this.state.resultsErr
                    ?
                    FullscreenError("An error occured, please try again later")
                    :
                    null
                }


                {(!this.state.categoriesReady || !this.state.priceRangesReady || !this.state.cuisinesReady || !this.state.resultsReady) && !this.state.resultsErr
                    ?
                    FullscreenLoading({ type: 'cylon', color: '#000' })
                    :
                    null
                }

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

                                {/* <div className="form-check">
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
                                </div> */}
                                {this.state.priceRangesReady ? this.renderPriceRange(this.priceRanges) : null}

                            </div>

                            <div>
                                <br />
                                <p>Cuisine Style</p>
                                <hr></hr>
                                {/* <div className="form-check">
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
                                </div> */}
                                {this.state.cuisinesReady ? this.renderCuisineFirst5(this.cuisines) : null}

                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">More</a>


                                <div className="collapse list-unstyled" id="pageSubmenu">
                                    {this.state.cuisinesReady ? this.renderCuisineAfter5(this.cuisines) : null}
                                    {/*   <div className="form-check">
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
                                    </div> */}

                                </div>
                            </div>


                            <div>
                                <br />
                                <p>Category</p>
                                <hr />
                                {/* <div className="form-check">
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
                                    </div> */}
                                {this.state.categoriesReady ? this.renderCategory(this.categories) : null}



                            </div>
                            <hr />
                            <button className='btn btn-primary' onClick={this.querySearchResults}>Apply filters</button>
                        </div>

                        {/* Results  */}
                        <div className="col-sm-8">
                            <br />
                            <h4>You search for " "</h4>
                            <p> Restaurants availables</p>
                            <hr />

                            <section>
                                <div className="container">
                                    {/* <div className="card">
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
                                    </div> */}
                                    {this.renderRestaurants(this.state.restaurants)}


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