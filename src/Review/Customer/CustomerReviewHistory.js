import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"
import { FaThumbsUp } from 'react-icons/fa'
import { IconContext } from "react-icons"

class CustomerReviewHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [
        {
          id: "", date: new Date(), comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 0, customer: {}, restauarnt: {}, reservation: { menuItem: [] },
        },
        //  For testing
        {
          id: "1", date: new Date(), comment: "good", foodRate: 1, serviceRate: 10, satisfactionRate: 3, environmentRate: 2, customer: {}, restauarnt: {}, reservation: { menuItem: [] },
        }
      ],
      id: "", date: new Date(), comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 1,
      disabled: true,
      contenteditable: false,
      open: false
    };

    this.handleClickReview = this.handleClickReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //Query data from the server
    //this.setState();
  }



  toggle(index) {
    this.setState({
      open: !this.state.reviews[index].open
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("saved")
    // if (formValid(this.state)) {
    //   console.log(this.state)
    //   // ds.reviewHistory(this.state);
    // } else {
    //   console.log("Form is invalid!");
    // }
  };

  renderStars(stars) {//stars is a number
    //'⭐'
    var starstring = '';
    for (var i = 0; i < stars; i++) {
      starstring += '⭐';
    }
    //some magic    
    return <span>{starstring}</span>
  }

  renderTable() {
    return this.state.reviews.map((review, index) => {
      const { id, date, comment, foodRate, serviceRate, satisfactionRate, environmentRate } = review
      return (
        //<form onSubmit={this.handleSubmit} id="rendTab" >
        <tr key={id} id={'reviewrow' + index}>
          <td defaultValue={date.toString()}> {date.toString()}</td>
          {/* <td contenteditable="true"> {comment}</td> */}
          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <textarea row="2" type="text" id="comment" name="comment"
              defaultValue={comment} className="border-none"
              disabled={(!this.state.reviews[index].contenteditable)} /></td>


          {/* <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="foodRate" name="foodRate"
              defaultValue={foodRate} className="border-none" disabled={(!this.state.reviews[index].contenteditable)} /></td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="serviceRate" name="serviceRate"
              defaultValue={serviceRate} className="border-none" disabled={(!this.state.reviews[index].contenteditable)} /></td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="satisfactionRate" name="satisfactionRate"
              defaultValue={serviceRate} className="border-none" disabled={(!this.state.reviews[index].contenteditable)} /></td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="environmentRate" name="environmentRate"
              defaultValue={serviceRate} className="border-none"
              disabled={(!this.state.reviews[index].contenteditable)} /></td> \
              
               <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="serviceRate" name="serviceRate"
              defaultValue={serviceRate} className="border-none" disabled={(!this.state.reviews[index].contenteditable)} /></td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="satisfactionRate" name="satisfactionRate"
              defaultValue={serviceRate} className="border-none" disabled={(!this.state.reviews[index].contenteditable)} /></td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <input type="text" id="environmentRate" name="environmentRate"
              defaultValue={serviceRate} className="border-none"
              disabled={(!this.state.reviews[index].contenteditable)} /></td>

              */}



          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {/* <container>
            <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                  // onChange={(e) => this.onImageChange(e, index)}
                  disabled={(!this.state.reviews[index].contenteditable)} />
                {
                  !this.state.reviews[index].contenteditable ? src={this.state.reviews[index].foodRate}
                    : null
                }
              </div>
            </container> */}
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                disabled={(!this.state.reviews[index].contenteditable)}
                defaultValue={foodRate}
              >
                Food Rate
                </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href='#' value={this.state.food1}> <FaThumbsUp /> </a>
                <a class="dropdown-item" href='#' value={this.state.food2}> <FaThumbsUp />  <FaThumbsUp />  </a>
                <a class="dropdown-item" href='#' value={this.state.food3}> <FaThumbsUp />  <FaThumbsUp /> <FaThumbsUp /> </a>
              </div>
            </div>
          </td>

          {/* <td contenteditable={(this.state.reviews[index].contenteditable)}>
              <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                  disabled={(!this.state.reviews[index].contenteditable)}
                >
                  Service Rate
                </button>
                <div class="dropdown-menu">
                <a class="dropdown-item" href='#' value={this.state.service1}> <FaThumbsUp /> </a>
                  <a class="dropdown-item" href='#' value={this.state.service2}> <FaThumbsUp />  <FaThumbsUp />  </a>
                  <a class="dropdown-item" href='#' value={this.state.service3}> <FaThumbsUp />  <FaThumbsUp /> <FaThumbsUp /> </a>
                </div>
              </div>
            </td> */}


          {/* test for showUp button when Edit button is clicked -------------------------*/}
          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {
              this.state.reviews[index].contenteditable ?
                <div class="dropdown">
                  <button type="button" onClick={this.toggle.bind(this)} className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                    disabled={(!this.state.reviews[index].contenteditable)}
                    defaultValue={serviceRate}
                  >
                    Service Rate
              </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href='#' value={this.state.service1}> <FaThumbsUp /> </a>
                    <a class="dropdown-item" href='#' value={this.state.service2}> <FaThumbsUp />  <FaThumbsUp />  </a>
                    <a class="dropdown-item" href='#' value={this.state.service3}> <FaThumbsUp />  <FaThumbsUp /> <FaThumbsUp /> </a>
                  </div>
                </div> : this.renderStars(this.state.reviews[index].serviceRate)

            }


          </td>



          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                disabled={(!this.state.reviews[index].contenteditable)}
                defaultValue={satisfactionRate}
              >
                Satisfaction Rate
                </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href='#' value={this.state.satify1} > <FaThumbsUp /> </a>
                <a class="dropdown-item" href='#' value={this.state.satify2}> <FaThumbsUp />  <FaThumbsUp />  </a>
                <a class="dropdown-item" href='#' value={this.state.satify3}> <FaThumbsUp />  <FaThumbsUp /> <FaThumbsUp /> </a>
              </div>
            </div>
          </td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                disabled={(!this.state.reviews[index].contenteditable)}
                defaultValue={environmentRate}
              >
                Environment Rate
                </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href='#' value={this.state.environ1}> <FaThumbsUp /> </a>
                <a class="dropdown-item" href='#' value={this.state.environ2}> <FaThumbsUp />  <FaThumbsUp />  </a>
                <a class="dropdown-item" href='#' value={this.state.environ3}> <FaThumbsUp />  <FaThumbsUp /> <FaThumbsUp /> </a>
              </div>
            </div>
          </td>

          <td >
            {" "}
            <div className="form-inline">
              <div className="form-group">
                {/* <Link to="/"> */}
                <button
                  id='save_edit_btn'
                  onClick={() => this.handleClickReview(index)}
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2"
                >
                  {this.state.reviews[index].contenteditable ? "Save Change" : "Edit"}

                </button>
                {/* </Link> */}
              </div>
              <div className="form-group">
                {/* <Link to="/"> */}
                <button
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2"
                  data-toggle="modal" data-target="#DeleteResultModal"
                >
                  Delete
                </button>
                {/* </Link> */}
              </div>
            </div>
          </td>
        </tr>
        //</form>
      )
    })
  }



  handleClickReview(index) {
    if(this.state.reviews[index].contenteditable){
      //This is updating
      //call server API to update database
      //Show feedback
      
    }
    
    
    this.state.reviews[index].contenteditable = !this.state.reviews[index].contenteditable;

    this.forceUpdate();
    //this.setState({});
  
    this.callModalReview();
  }


  callModalReview(index) {
    this.setState(state => {
      this.setState(state =>
        //     {
        //     return {
        //         // edit: !state.edit
        //     };
        // },

        () => {
          if (this.state.menus[index].contenteditable) {
            $('this.state.reviews[index].#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#EditResultModal').attr('type', 'button')
          }
          else {
            $('this.state.reviews[index].#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
          }
        });
    })
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ id: e.target.value });
  }

  render() {
    const { isError } = this.state;
    const { customer } = this.props;
    return (
      <Maincontainer>
        <form onSubmit={this.handleSubmit} id="reviewHistory">
          <div className="form-group">
            <br />
            <br />
            <h3> My Review List</h3>
            <table id='reivews' className="table table-striped col-md-12">
              <thead>
                <tr>
                  <th>Date</th>
                  <th className="col-md-5">Review</th>
                  <th >Food Rate</th>
                  <th>Service Rate</th>
                  <th>Satisfaction Rate</th>
                  <th>Environment Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </div>

          {/* DeleteReviewModal */}

          <div
            className="modal fade"
            id="DeleteResultModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="DeleteResultModal"
            aria-hidden="true"
          >

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="DeleteResultModal">
                    Delete Menu
                            </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="alert alert-warning" id="DeleteResultModalText">
                    Please Wait...
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Maincontainer>
    )
  }
}

export default CustomerReviewHistory;