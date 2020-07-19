import React, { Component, useState } from "react";
import MainContainer from "../../Style/MainContainer";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import "../../../Profile/Customer/ViewCustomerProfile.css";
import { Tab } from "bootstrap";
import authService from "../../../Services/AuthService";
// import serverAddress from "../../../Services/ServerUrl";
// import ds from "../../../Services/dataService";
import Axios from "axios";
import ChangePassword from "../Customer/ChangePassword"
import CustomerReservationHistory from "../../../Reservation/Customer/CustomerReservationHistory"
import CustomerReviewHistory from "../../../Review/Customer/CustomerReviewHistory"


const regExpPrice = RegExp(
  /(\d+\.\d{2,2})/g
);

const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach((val) => {
    if (val.length > 0) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  Object.values(rest).forEach((val) => {
    if (val === null) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  return isValid;
};

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [{
        id: 1, MenuPicture: "",
        menuName: "",
        menuPrice: "",
        menuDescript: "",
        contenteditable: false,
      },

      // For testing - after connecting with DB, delete

      {
        id: 2, MenuPicture: "picture",
        menuName: "Noodle",
        menuPrice: "25.50",
        menuDescript: "gooooooood!!!!!",
        contenteditable: false,
      }],
      disabled: true,
      contenteditable: false,
      // image: null,
      isError: {
        MenuPicture: '&#160;',
        menuName: '&#160;',
        menuPrice: '&#160;',
        menuDescript: '&#160;'
      }
    };
    this.onImageChange = this.onImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.menuItemEditButton = this.menuItemEditButton.bind(this);

  }

  onImageChange = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // this.setState({
      //   image: URL.createObjectURL(img)
      // });
      if (index !== undefined) {//in menu item  TRY YOUR BEST REWRITE THIS CODE 
        this.state.menus[index].MenuPicture = URL.createObjectURL(img)
        this.forceUpdate();
      } else {
        this.setState({
          image: URL.createObjectURL(img),
        })
      }

    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "menuName":
        isError.menuName =
          value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";
        break;
      case "menuPrice":
        isError.menuPrice =
          regExpPrice.test(value) ? "&#160;" : "Atleast 1 character required";
        break;
      case "menuDescript":
        isError.menuDescript =
          value.length >= 5 && value.length <= 100 ? "&#160;" : "Atleast 5 character required";
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("saved")
    if (formValid(this.state)) {
      console.log(this.state)
    } else {
      console.log("Form is invalid!");
    }
  };


  menuItemEditButton(index) {
    this.state.menus[index].contenteditable = !this.state.menus[index].contenteditable;
    this.forceUpdate();
    this.setState({});

    this.dataPass()
  }



  renderTableData() {
    return this.state.menus.map((menu, index) => {
      const { id, MenuPicture, menuName, menuPrice, menuDescript } = menu
      return (
        <tr key={id} id={'menurow' + index}>
          {/* <td>{MenuPicture}</td> */}
          <td contenteditable={(this.state.contenteditable)} >
            <div>

            </div>
            <div>
              {/* <row> 
              <input type="file" name="menuPicture" disabled={(this.state.disabled)}
                onChange={this.onImageChange} />
              <img src={this.state.image} />
               </row>   */}
              <container>
                <row>
                  <input type="file" name="menuPicture"
                    onChange={(e) => this.onImageChange(e, index)} disabled={(!this.state.menus[index].contenteditable)} />


                  {
                    !this.state.menus[index].contenteditable ? <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={this.state.menus[index].MenuPicture} />
                      : null
                  }



                </row>
              </container>
            </div>
          </td>
          {/* <tr>{menuName}</tr>
                  <tr>{menuPrice}</tr>
                  <tr>{menuDescript}</tr> */}
          <td>
            <tr contenteditable={(this.state.menus[index].contenteditable)} >
              <input type="text" id="menuName" name="menuName" defaultValue={menuName}
                className="border-none" disabled={(!this.state.menus[index].contenteditable)} />
            </tr>

            <tr contenteditable={(this.state.menus[index].contenteditable)}>
              <input type="text" id="menuPrice" name="menuPrice" defaultValue={menuPrice}
                className="border-none" disabled={(!this.state.menus[index].contenteditable)} /></tr>

            <div className="form-group" >
              <tr contenteditable={(this.state.menus[index].contenteditable)}>
                <textarea  row="3" id="menuDescript" name="menuDescript" defaultValue={menuDescript}
                  className="form-control border-none " disabled={(!this.state.menus[index].contenteditable)} />            
            </tr>
            </div>

          </td>
          <td >
            <div className="form-group row">
              {/* <Link to="/EditMenu"> */}
              <button
                button id='save_edit_btn'
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
                onClick={() => this.menuItemEditButton(index)}
              >
                {this.state.menus[index].contenteditable ? "Save Change" : "Edit"}
              </button>
              {/* </Link> */}
            </div>
          </td>
          <td >
            <div className="form-group row">
              <button
                type="button"
                className="btn btn-primary btn-sm mr-sm-2"
              >
                Delete
                  </button>
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
  //this.state.menus[index]
  //Edit profile - button
  dataPass() {
    this.setState(state => {
      this.setState(state => {
        return {
          // edit: !state.edit
        };
      }, () => {
        if (this.state.edit) {
          // change #signResultModal with your code id
          $('#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#signResultModal').attr('type', 'button')
        } else {
          $('#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
        }
      });
    })
  }


  render() {
    const { isError } = this.state;
    return (
      <MainContainer>
        <div form onSubmit={this.handleSubmit} id="addMenu">
          <div className="form-inline form-group mt-sm-4">
            <h3> Add Menu </h3>
            <button type="submit" className="btn btn-primary ml-sm-5"> Save </button>
          </div>

          {/* add menu */}
          <div id="menu">
            <div className="row">
              <div className="col-sm-3 border">
                <container>
                  <row>
                    <input type="file" name="menuPicture" onChange={this.onImageChange} />
                    <img src={this.state.image} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  </row>
                </container>
              </div>
              <div className="col-sm-9 border">
                <div className="col container-fluid">
                  <div className="form-inline">
                    <label htmlFor="menuName" className="col-sm-2 border-0">Name </label>
                    <input type="text" id="menuName" name="menuName" className="form-control col-smd-10 mt-sm-2"
                      className={isError.menuName.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                    />
                  </div>
                  <div className=" form-inline">
                    <label htmlFor="menuPrice" className="col-sm-2 border-0">Price</label>
                    <input type="text" id="menuPrice" name="menuPrice" className="form-control col-sm-10 mt-sm-2" placeholder="price format: 12.30"
                      className={isError.menuPrice.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                  </div>
                  <div className="form-inline">
                    <label htmlFor="menuDescript" className="col-sm-2 border-0">Description</label>
                    <textarea row="3" required type="text" id="menuDescript" name="menuDescript" className="form-control col-sm-10 mt-sm-2 mb-sm-2"
                      className={isError.menuDescript.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Menu List */}
        <h3><br />
          <br />Menu List</h3>
        {/* <div className="col-md-12"> */}
        <table id='menus' className="table table-striped col-md-12">
          <thead>
            <tr>
              <th >Image</th>
              <th className="col-md-5" >Menu Detail</th>
              <th >Edit</th>
              <th>Delete</th>

              {/* <th className="col-md-3">Image</th>
              <th className="col-md-5" >Menu Detail</th>
              <th className="col-md-2">Edit</th>
              <th className="col-md-2">Delete</th> */}

              {/* <th scope="col.sm.3" class="col-sm-3">Image</th>
              <th scope="col">Menu Detail</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
        {/* </div> */}
      </MainContainer>
    );
  }
}





export default Test;

