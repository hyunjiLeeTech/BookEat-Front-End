import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"

class CustomerReviewHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      reviews: [
       {id:"", date:"",comment:"", foodRate:"",serviceRate:"", satisfactionRate:"", environmentRate:""},
      //  For testing
       {id:"1", date:"20200505",comment:"gooooooooooooooooooooood", foodRate:"*",serviceRate:"**", satisfactionRate:"**", environmentRate:"**"}
      ],
      disabled: true,
      contenteditable: false
    }
  }

  renterTable(){
    return this.state.reviews.map((review, index) => {
      const { id, date, comment, foodRate, serviceRate, satisfactionRate, environmentRate } = review
      return(
        <tr key={id}>
        <td >{date}</td>
        {/* <td contenteditable="true"> {comment}</td> */}
        <td contenteditable={(this.state.contenteditable)}>
        <input type="text" id="comment" name="comment" defaultValue ={comment} class="border-none"  disabled={(this.state.disabled)}/></td>
        
        {/* <td >{foodRate}</td> */}
        <td contenteditable={(this.state.contenteditable)}>
        <input type="text" id="foodRate" name="foodRate" defaultValue ={foodRate} class="border-none"  disabled={(this.state.disabled)}/></td>       
       
        {/* <td> {serviceRate} </td> */}
        <td contenteditable={(this.state.contenteditable)}>
        <input type="text" id="serviceRate" name="serviceRate" defaultValue ={serviceRate} class="border-none"  disabled={(this.state.disabled)}/></td>       
       
        {/* <td contenteditable="true">{satisfactionRate}</td> */}
        <td contenteditable={(this.state.contenteditable)}>
        <input type="text" id="satisfactionRate" name="satisfactionRate" defaultValue ={serviceRate} class="border-none"  disabled={(this.state.disabled)}/></td>       
       
        {/* <td contenteditable="true">{environmentRate}</td> */}
        <td contenteditable={(this.state.contenteditable)}>
        <input type="text" id="environmentRate" name="environmentRate" defaultValue ={serviceRate} class="border-none"  disabled={(this.state.disabled)}/></td>       
       

        <td >
          {" "}
          <div className="form-inline">
            <div className="form-group">
              {/* <Link to="/"> */}
                <button
                  onClick={this.handleClick.bind(this)}
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2"
                >
                  {this.state.edit ? "Save Change" : "Edit"}

                </button>
              {/* </Link> */}
            </div>
            <div className="form-group">
              {/* <Link to="/"> */}
                <button
                  type="button"
                  className="btn btn-primary btn-sm mr-sm-2"
                >
                  Delete
                </button>
              {/* </Link> */}
            </div>
          </div>
        </td>
      </tr>
      )
    })
  }

  

  handleClick() {
    this.setState({ disabled: !this.state.disabled })
    this.setState({ contenteditable: !this.state.contenteditable })
    this.changeText();
  }

  //Edit profile - button
  changeText() {
    this.setState(state => {
      return {
        edit: !state.edit
      };
    });
  }

  handleChange(e){
    console.log(e.target.value);
    this.setState ({id:e.target.value});
  }

    render(){
      const { isError } = this.state;
      const { customer } = this.props;
        return(
            <Maincontainer>
<div className="form-group">
                <br />
                <br />
                <h3> My Rievew List</h3>
                <div form id="review">
                  <table className="table table-striped ">
                    <thead>
                      <tr className>
                        <th>Date</th>
                        <th>Review</th>
                        <th>Food Rate</th>
                        <th>Service Rate</th>
                        <th>Satisfaction Rate</th>
                        <th>Environment Rate</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                     {this.renterTable()}
                    </tbody>
                  </table>
                </div>
              </div>
            </Maincontainer>
        )}}

        export default CustomerReviewHistory;