import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"
import { FaThumbsUp } from 'react-icons/fa'
import { IconContext } from "react-icons"
import { ToastContainer, toast, cssTransition } from 'react-toastify';

class CustomerReviewHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [
        {
          id: "", date: "", comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 0, customer: {}, restauarnt: {}, reservation: { menuItem: [] }
        },
        //  For testing
        {
          id: "", date: "", comment: "good", foodRate: 1, serviceRate: 3, satisfactionRate: 3, environmentRate: 2, customer: {}, restauarnt: {}, reservation: { menuItem: [] }
        }
      ],
      // id: "", date: new Date(), comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 1,
      disabled: true,
      contenteditable: false
    };

    this.handleClickReview = this.handleClickReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //Query data from the server
    //this.setState();
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
        <form onSubmit={this.handleSubmit} id="rendTab" >
        <tr key={id} id={'reviewrow' + index}>
          <td defaultValue={date.toString()}> {date.toString()}</td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            <textarea row="2" type="text" id="comment" name="comment"
              defaultValue={comment} className="border-none"
              disabled={(!this.state.reviews[index].contenteditable)}
            /></td>



          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {
              this.state.reviews[index].contenteditable ?

                // <div class="dropdown">
                //   <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                //     disabled={(!this.state.reviews[index].contenteditable)}
                //     defaultValue={foodRate}
                //   >
                //     Food Rate
                // </button>
                //   <div class="dropdown-menu">
                //     <a class="dropdown-item" href='#' value={this.state.food1}> ⭐ </a>
                //     <a class="dropdown-item" href='#' value={this.state.food2}> ⭐⭐ </a>
                //     <a class="dropdown-item" href='#' value={this.state.food3}> ⭐⭐⭐</a>
                //   </div>
                // </div>

                <div className="Form-group" value={foodRate}>
                  <select className="form-conrol" id="foodRate"
                   >
                    <option value="this.state.food1" >⭐</option>
                    <option value="this.state.food2">⭐⭐</option>
                    <option value="this.state.food3">⭐⭐⭐</option>
                  </select>
                </div>
                : this.renderStars(this.state.reviews[index].foodRate)

            }
          </td>


          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {
              this.state.reviews[index].contenteditable ?
              //   <div class="dropdown">
              //     <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
              //       disabled={(!this.state.reviews[index].contenteditable)}
              //       defaultValue={serviceRate}
              //     >
              //       Service Rate
              // </button>
              //     <div class="dropdown-menu">
              //       <a class="dropdown-item" href='#' value={this.state.service1}> ⭐ </a>
              //       <a class="dropdown-item" href='#' value={this.state.service2}> ⭐⭐  </a>
              //       <a class="dropdown-item" href='#' value={this.state.service3}> ⭐⭐⭐ </a>
              //     </div>
                // </div> 

                <div className="Form-group" value={serviceRate}>
                <select className="form-conrol" id="serviceRate" >
                  <option value="this.state.service1" >⭐</option>
                  <option value="this.stae.service2">⭐⭐</option>
                  <option  value="this.stae.service2">⭐⭐⭐</option>
                </select>
              </div>
                : this.renderStars(this.state.reviews[index].serviceRate)
            }
          </td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {
              this.state.reviews[index].contenteditable ?
                // <div class="dropdown">
                //   <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                //     disabled={(!this.state.reviews[index].contenteditable)}
                //     defaultValue={satisfactionRate}
                //   >
                //     Satisfaction Rate
                // </button>
                //   <div class="dropdown-menu">
                //     <a class="dropdown-item" href='#' value={this.state.satisfy1} >⭐ </a>
                //     <a class="dropdown-item" href='#' value={this.state.satisfy2}> ⭐⭐  </a>
                //     <a class="dropdown-item" href='#' value={this.state.satisfy3}> ⭐⭐⭐ </a>
                //   </div>
                // </div>

                <div className="Form-group" value={satisfactionRate}>
                <select className="form-conrol" id="satisfactionRate" >
                  <option value="this.state.satisfaction1" >⭐</option>
                  <option value="this.stae.satisfaction2">⭐⭐</option>
                  <option  value="this.stae.satisfaction3">⭐⭐⭐</option>
                </select>
              </div>
                : this.renderStars(this.state.reviews[index].satisfactionRate)
            }
          </td>

          <td contenteditable={(this.state.reviews[index].contenteditable)}>
            {

              this.state.reviews[index].contenteditable ?
                // <div class="dropdown">
                //   <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                //     disabled={(!this.state.reviews[index].contenteditable)}
                //     defaultValue={environmentRate}
                //   >
                //     Environment Rate
                // </button>
                //   <div class="dropdown-menu">
                //     <a class="dropdown-item" href='#' value={this.state.environ1}> ⭐ </a>
                //     <a class="dropdown-item" href='#' value={this.state.environ2}> ⭐⭐  </a>
                //     <a class="dropdown-item" href='#' value={this.state.environ3}> ⭐⭐⭐ </a>
                //   </div>
                // </div>
                
                <div className="Form-group" value={serviceRate}>
                <select className="form-conrol" id="serviceRate">
                  {/* <option value="this.state.service1" >⭐</option>
                  <option value="this.stae.service2">⭐⭐</option>
                  <option  value="this.stae.service3">⭐⭐⭐</option> */}
                  <option >⭐</option>
                  <option >⭐⭐</option>
                  <option >⭐⭐⭐</option>
                </select>
              </div>
                : this.renderStars(this.state.reviews[index].serviceRate)
            }
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
                  id='delete_btn'
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2"
                  data-toggle="modal"
                  data-target="#DeleteResultModal"
                // onClick={() => this.handleClickReview(index,id)}
                >
                  Delete
                </button>
                {/* </Link> */}
              </div>
            </div>
          </td>
        </tr>
      </form> 
      )
    })
  }



  handleClickReview(index) {
    // sample
    // if (this.state.reviews[index].contenteditable) {
    //   //This is updating
    //   //call server API to update database
    //   //Show UI feedback

    //   console.log("Showing toast")
    //   //communicating with server
    //   var t = toast("Updating, please wait", { type: toast.TYPE.INFO, autoClose: false, })

    //   setTimeout(() => { //get the feedback from server
    //     toast.update(t, { render: "Saved!", type: toast.TYPE.SUCCESS, autoClose: 5000, className: 'pulse animated' })
    //   }, 1000)

    // }


    this.state.reviews[index].contenteditable = !this.state.reviews[index].contenteditable;

    // this.setState.reviews[index]({contenteditable: !this.state.contenteditable})

    this.forceUpdate();
    //this.setState({});

    this.callModalReview(index);
  }


  callModalReview(index) {
    this.setState(state => {
      //   return {
      // //         // edit: !state.edit
      //     };
    }, () => {
      if (this.state.reviews[index].contenteditable) {
        $('#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#EditeResultModal').attr('type', 'button')
      }
      else {
        $('#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
      }
    });
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
                    Delete Review
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

          {/* EditeReviewModal */}

          <div
            className="modal fade"
            id="EditeResultModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="EditeResultModal"
            aria-hidden="true"
          >

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="EditeResultModal">
                    Saving Changes
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
                  <p className="alert alert-warning" id="EditeResultModalText">
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