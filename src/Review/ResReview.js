import React, { Component } from 'react'
import './ResReview.css'




class ResReview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviews: [
                {
                    id: "", date: "", comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 0, customer: {}, restauarnt: {}, reservation: { menuItem: [] }
                }
            ],
            disabled: true,
            contenteditable: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log("saved")

    };

    renderStars(stars) {//stars is a number
        //'⭐'
        var starstring = '';
        for (var i = 0; i < stars; i++) {
            starstring += '⭐';
        }
        //some magic    
        return <span role="img">{starstring}</span>
    }

    renderTable() {
        return this.state.reviews.map((review, index) => {
            const { id, comment, foodRate, serviceRate, satisfactionRate, environmentRate } = review
            return (
                // <form onSubmit={this.handleSubmit} id="rendTab" >
                <tr key={id} id={'reviewrow' + index}>


                    <td contenteditable={(this.state.reviews[index].contenteditable)}>
                        <textarea row="5" type="text" id="comment" name="comment"
                            defaultValue={comment} className="border-none"

                        /></td>



                    <td contenteditable={(this.state.reviews[index].contenteditable)}>
                        {
                            this.state.reviews[index].contenteditable ?

                                <div class="dropdown">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"

                                        defaultValue={foodRate}
                                    >
                                        Food Rate
                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href='#' value={this.state.food1}> <span role="img">⭐</span> </a>
                                        <a class="dropdown-item" href='#' value={this.state.food2}> <span role="img">⭐⭐</span> </a>
                                        <a class="dropdown-item" href='#' value={this.state.food3}> <span role="img">⭐⭐⭐</span></a>
                                    </div>
                                </div>
                                : this.renderStars(this.state.reviews[index].foodRate)
                        }
                    </td>


                    <td contenteditable={(this.state.reviews[index].contenteditable)}>
                        {
                            this.state.reviews[index].contenteditable ?
                                <div class="dropdown">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"

                                        defaultValue={serviceRate}
                                    >
                                        Service Rate
                  </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href='#' value={this.state.service1}> <span role="img">⭐</span> </a>
                                        <a class="dropdown-item" href='#' value={this.state.service2}> <span role="img">⭐⭐</span>  </a>
                                        <a class="dropdown-item" href='#' value={this.state.service3}> <span role="img">⭐⭐⭐</span> </a>
                                    </div>
                                </div> : this.renderStars(this.state.reviews[index].serviceRate)
                        }
                    </td>

                    <td contenteditable={(this.state.reviews[index].contenteditable)}>
                        {
                            this.state.reviews[index].contenteditable ?
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"

                                        defaultValue={satisfactionRate}
                                    >
                                        Satisfaction Rate
                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href='#' value={this.state.satisfy1} ><span role="img">⭐ </span> </a>
                                        <a class="dropdown-item" href='#' value={this.state.satisfy2}> <span role="img">⭐⭐</span>  </a>
                                        <a class="dropdown-item" href='#' value={this.state.satisfy3}> <span role="img">⭐⭐⭐ </span></a>
                                    </div>
                                </div>
                                : this.renderStars(this.state.reviews[index].satisfactionRate)
                        }
                    </td>

                    <td contenteditable={(this.state.reviews[index].contenteditable)}>
                        {

                            this.state.reviews[index].contenteditable ?
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"

                                        defaultValue={environmentRate}
                                    >
                                        Environment Rate
                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href='#' value={this.state.environ1}> <span role="img">⭐</span> </a>
                                        <a class="dropdown-item" href='#' value={this.state.environ2}> <span role="img">⭐⭐</span>  </a>
                                        <a class="dropdown-item" href='#' value={this.state.environ3}> <span role="img">⭐⭐⭐</span> </a>
                                    </div>
                                </div> : this.renderStars(this.state.reviews[index].serviceRate)
                        }
                    </td>


                </tr>
                // </form> 
            )
        })
    }






    handleChange(e) {
        console.log(e.target.value);
        this.setState({ id: e.target.value });
    }


    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <div className="rating-block">
                            <h4>Users Rating</h4>
                            <h2 className="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div class="dropdown">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                Food Rate
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href='#' value={this.state.food1}> <span role="img">⭐</span> </a>
                                <a className="dropdown-item" href='#' value={this.state.food2}> <span role="img">⭐⭐</span> </a>
                                <a className="dropdown-item" href='#' value={this.state.food3}> <span role="img">⭐⭐⭐</span></a>
                            </div>
                        </div>
                        <div class="dropdown">
                            {/* <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"

                            >
                                Service Rate
                                </button>
                            <ul class="dropdown-menu">
                                <li className="dropdown-item"  value={this.state.service1}> <span role="img">⭐</span> </li>
                                <li className="dropdown-item"  value={this.state.service2}> <span role="img">⭐⭐</span>  </li>
                                <li className="dropdown-item"  value={this.state.service3}> <span role="img">⭐⭐⭐</span> </li>
                            </ul> */}

                            <select className="custom-select"
                                id="serviceRate"
                                name="serviceRate"
                            >
                                <option value="">Service Rate</option>
                                <option value="">⭐</option>
                                <option value="">⭐⭐</option>
                                <option value="">⭐⭐⭐</option>
                            </select>
                        </div>

                        <div className="dropdown">
                            <label>Service Rate</label>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                            <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                <span aria-hidden="true">⭐</span>
                            </button>
                        </div>

                        <textarea
                            className="col-sm-12"
                            rows="4"
                            id="description"
                            name="description"
                        //   value={this.state.description}
                        //   onChange={this.handleChange}
                        //   disabled={(!this.state.disabled)}
                        ></textarea>
                        {/* <span className="invalid-feedback">
                          {Parser(isError.description)}
                        </span> */}
                        <button type="button" className="btn btn-primary float-right"> Add Review</button>
                    </div>
                </div>


                <div className="row">
                    <div className="col-sm-12">
                        <hr />
                        <div className="col-sm-12">


                            {/* <p>{this.renderTable()}</p>

                            <textarea
                                className="col-sm-12"
                                rows="4"
                                id="description"
                                name="description"
                            //   value={this.state.description}
                            //   onChange={this.handleChange}
                            //   disabled={(!this.state.disabled)}
                            ></textarea>
                            {/* <span className="invalid-feedback">
                          {Parser(isError.description)}
                        </span> */}
                            {/* <button type="button" className="btn btn-primary float-right"> Add Review</button> */}
                        </div>

                        <br />
                        <br />



                        <div className="review-block">
                            <div className="row">

                                <div className="col-sm-3">
                                    <div className="review-block-name"><a href="#">nktailor</a></div>
                                    <div className="review-block-date">January 29, 2016<br />1 day ago</div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="review-block-rate">
                                        <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                    <div className="review-block-title">this was nice in buy</div>
                                    <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                </div>
                            </div>
                            <hr />

                        </div>
                    </div>
                </div>


            </div>

        )
    }

}

export default ResReview;
