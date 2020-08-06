import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"
import { FaThumbsUp } from 'react-icons/fa'
import { IconContext } from "react-icons"
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import ds from "../../Services/dataService";
import moment from 'moment';

class CustomerReviewHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [
        {
          id: "", date: "", resName: "", comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 0, customer: {}, restauarnt: {}, reservation: { menuItem: [] }
        },
        //  For testing
        {
          id: "", date: "2020/05/05", resName: "bookEat", comment: "good", foodRate: 1, serviceRate: 3, satisfactionRate: 3, environmentRate: 2, customer: {}, restauarnt: {}, reservation: { menuItem: [] }
        }
      ],
      // id: "", date: new Date(), comment: "", foodRate: 0, serviceRate: 0, satisfactionRate: 0, environmentRate: 1,
      resId: "",
      disabled: true,
      contenteditable: false
    };

    this.handleClickReview = this.handleClickReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInList = this.handleChangeInList.bind(this);
  }

  handleChangeInList(e, index) {
    e.preventDefault();
    const { name, value } = e.target;

    this.state.reviews[index][e.target.id] = e.target.value; //Set state does not allow to set an object inside of an array
    this.forceUpdate(); //forcing udpate the UI
  }

  handleClickEditReview() {

  }

  handleClickDeleteReview(id) {
    ds.deleteReview({ _id: id });
  }

  componentDidMount() {
    //Query data from the server
    //this.setState();
  }

  componentWillMount() {
    this.queryReviews()
  }

  async queryReviews() {
    let reviews = await ds.getReviewsCustomerSide();

    this.setState({
      reviews: reviews
    });
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
      const { id, date, resName, comment, foodRate, serviceRate, satisfactionRate, environmentRate } = review
      console.log(this.state.reviews[index]);
      return (
        // <form onSubmit={this.handleSubmit} id="rendTab" >
        <tr key={index} id={'reviewrow' + index}>
          <td defaultValue={date.toString()}> {date.toString()}</td>
          <td defaultValue={resName}>{resName}</td>
         
          <td contentEditable={(this.state.reviews[index].contenteditable)}>
            <textarea row="2" type="text" id="comment" name="comment"
              onChange={(e) => this.handleChangeInList(e, index)}
              defaultValue={comment} className="border-none"
              disabled={(!this.state.reviews[index].contenteditable)}
            /></td>



          <td contentEditable={(this.state.reviews[index].contenteditable)}>
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

                <div className="Form-group" >
                  <select className="form-conrol"
                    id="foodRate"
                    name="foodRate"
                    value={this.state.foodRate}
                    onChange={(e) => this.handleChangeInList(e, index)}
                  >
                    <option value="food1">⭐</option>
                    <option value="food2">⭐⭐</option>
                    <option value="food3">⭐⭐⭐</option>
                    <option value="food4">⭐⭐⭐⭐</option>
                    <option value="food5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
                : this.renderStars(this.state.reviews[index].food)

            }
          </td>


          <td contentEditable={(this.state.reviews[index].contenteditable)}>
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

                <div className="Form-group">
                  <select className="form-conrol"
                    id="serviceRate"
                    name="serviceRate"
                    value={this.state.serviceRate}
                    onChange={(e) => this.handleChangeInList(e, index)}
                  >
                    <option value="service1" >⭐</option>
                    <option value="service2">⭐⭐</option>
                    <option value="service3">⭐⭐⭐</option>
                    <option value="service4">⭐⭐⭐⭐</option>
                    <option value="service5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
                : this.renderStars(this.state.reviews[index].service)
            }
          </td>

          <td contentEditable={(this.state.reviews[index].contenteditable)}>
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

                <div className="Form-group">
                  <select className="form-conrol"
                    id="satisfactionRate"
                    name="satisfactionRate"
                    value={this.state.satisfactionRate}
                    onChange={(e) => this.handleChangeInList(e, index)}
                  >
                    <option value="satisfaction1" >⭐</option>
                    <option value="satisfaction2">⭐⭐</option>
                    <option value="satisfaction3">⭐⭐⭐</option>
                    <option value="satisfaction4">⭐⭐⭐⭐</option>
                    <option value="satisfaction5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
                : this.renderStars(this.state.reviews[index].satisfaction)
            }
          </td>

          <td contentEditable={(this.state.reviews[index].contenteditable)}>
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

                <div className="Form-group" >
                  <select className="form-conrol"
                    id="environmentRate"
                    name="environmentRate"
                    value={this.state.environmentRate}
                    onChange={(e) => this.handleChangeInList(e, index)}
                  >
                    {/* <option value="this.state.service1" >⭐</option>
                  <option value="this.stae.service2">⭐⭐</option>
                  <option  value="this.stae.service3">⭐⭐⭐</option> */}
                    <option value="environ1">⭐</option>
                    <option value="environ2">⭐⭐</option>
                    <option value="environ3">⭐⭐⭐</option>
                    <option value="environ4">⭐⭐⭐⭐</option>
                    <option value="environ5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
                : this.renderStars(this.state.reviews[index].environment)
            }
          </td>

          <td >
            {" "}
            <div className="form-inline">
              <div className="form-group">
                {/* <Link to="/"> */}
                <button
                  id='saveReviewChange'
                  onClick={() => this.handleClickEditReview(index)}
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
                  data-target="#DeleteReviewResultModal"
                  onClick={() => this.handleClickDeleteReview(this.state.reviews[index]._id)}
                >
                  Delete
                </button>
                {/* </Link> */}
              </div>
            </div>
          </td>
        </tr>
        // </form>
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
    // this.forceUpdate();
    this.forceUpdate();
    if (!this.state.reviews[index].contenteditable)
      $('#EditeReviewResultModal').modal('show')

    // this.setState.reviews[index]({contenteditable: !this.state.contenteditable})


    //  $('#saveReviewChange').modal('show')
    //this.setState({});

    // this.callModalReview(index);
  }


  callModalReview(index) {
    this.setState(state => {
      //   return {
      // //         // edit: !state.edit
      //     };

    }, () => {
      if (this.state.reviews[index].contenteditable) {
        $('#save_editReview_btn').attr("data-toggle", 'modal').attr("data-target", '#EditeReviewResultModal').attr('type', 'button')
      }
      else {
        $('#save_editReview_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
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
                  <th>Restaurant Name</th>
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
            id="DeleteReviewResultModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="DeleteReviewResultModal"
            aria-hidden="true"
          >

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="DeleteReviewResultModal">
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
            id="EditeReviewResultModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="EditeReviewResultModal"
            aria-hidden="true"
          >

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="EditeReviewResultModal">
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