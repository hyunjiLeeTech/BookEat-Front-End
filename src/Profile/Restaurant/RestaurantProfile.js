import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../../component/Style/MainContainer";
import "./RestaurantProfile.css";
import Parser from "html-react-parser";
import $ from "jquery";
import authService from "../../Services/AuthService";
import ds from "../../Services/dataService";
import Manager from "./Manager";
import ChangePassword from "../../component/Forms/Customer/ChangePassword";
import Menu from "../../Menu/Menu"
import RestaurantReservation from "../../Reservation/RestaurantReservation";
import RestaurantLayout from "../../Restaurant/RestaurantLayout";
import FullscreenError from '../../component/Style/FullscreenError'
import FullScrrenLoading from '../../component/Style/FullscreenLoading';

//Validation
const regExpEmail = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const regExpPhone = RegExp(
  /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
);

const regExpPostal = RegExp(/^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/);

const regExpNumbers = RegExp(/^[0-9]*$/);


const formValid = ({ isError, ...rest }) => {
  let isValid = false;
  Object.values(isError).forEach((val) => {
    if (val !== '&#160;') {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  Object.values(rest).forEach((val) => {
    console.log(rest);
    if (val === null) {
      isValid = false;
    } else {
      isValid = true;
    }
  });
  return isValid;
};

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //user
      email: "",
      phonenumber: "",
      businessnumber: "",

      resname: "",

      //address
      streetnumber: "",
      streetname: "",
      province: "",
      city: "",
      postalcode: "",

      //cuisine style
      cuisineStyle: "",

      //category
      category: "",

      //price range
      priceRange: "",

      // eating time
      eatingTime: "",

      // open and close time
      monOpenTime: "",
      monCloseTime: "",
      tueOpenTime: "",
      tueCloseTime: "",
      wedOpenTime: "",
      wedCloseTime: "",
      thuOpenTime: "",
      thuCloseTime: "",
      friOpenTime: "",
      friCloseTime: "",
      satOpenTime: "",
      satCloseTime: "",
      sunOpenTime: "",
      sunCloseTime: "",
      description: "",
      picture: "",

      //Discount
      discdescription: '',
      promdescription: '',
      discounts: [],
      contentTable: false,
      resultsErr: false,
      isResLoaded: false,

      isError: {
        resname: "&#160;",
        streetnumber: "&#160;",
        streetname: "&#160;",
        province: "&#160;",
        city: "&#160;",
        postalcode: "&#160;",
        phonenumber: "&#160;",
        email: "&#160;",
        businessnumber: "&#160;",
        cuisineStyle: "&#160;",
        category: "&#160;",
        priceRange: "&#160;",
        description: "&#160;",
        picture: "&#160;",
        discdescription: "&#160;",
        promdescription: "&#160;",
        eatingTime: "&#160;"
      }

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddDiscount = this.handleAddDiscount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitResProfile = this.handleSubmitResProfile.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleChangeInList = this.handleChangeInList.bind(this);

  }
  onImageChange = (event, index) => {
    if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        // this.setState({
        //   image: URL.createObjectURL(img)
        // });
        if (index !== undefined) {//in menu item  TRY YOUR BEST REWRITE THIS CODE 
            this.state.picture[index].MenuPicture = URL.createObjectURL(img)
            this.forceUpdate();
        } else {
            this.setState({
                //image: URL.createObjectURL(img),
                picture: event.target.files[0]
            })
        }

    }
};

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = this.state.isError;
    switch (name) {
      case "resname":
        isError.resname =
          value.length >= 3 && value.length <= 50
            ? "&#160;"
            : "Atleast 3 character required";
        break;
      case "streetnumber":
        isError.streetnumber = regExpNumbers.test(value)
          ? "&#160;"
          : "Atleast 1 number required";
        break;
      case "streetname":
        isError.streetname =
          value.length >= 4 && value.length <= 255
            ? "&#160;"
            : "Atleast 4 character required";
        break;
      case "city":
        isError.city =
          value.length >= 2 && value.length <= 50
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "province":
        isError.province =
          value.length >= 2 && value.length <= 32
            ? "&#160;"
            : "Atleast 2 character required";
        break;
      case "postalcode":
        isError.postalcode = regExpPostal.test(value)
          ? "&#160;"
          : "Invalid postal code";
        break;
      case "email":
        isError.email = regExpEmail.test(value)
          ? "&#160;"
          : "Invalid email address";
        break;
      case "phonenumber":
        isError.phonenumber = regExpPhone.test(value)
          ? "&#160;"
          : "Phone Number is invalid";
        break;
      case "businessnumber":
        isError.businessnumber = regExpNumbers.test(value)
          ? "&#160;"
          : "Invalid business number";
        break;
      case "description":
        isError.description =
          value.length >= 1 && value.length <= 255
            ? "&#160;"
            : "Atleast write something";
        break;
      case "discdescription":
        isError.discdescription = regExpNumbers.test(value)
          ? "&#160;"
          : "Please put some promotional numbers";
        break;
      case "promdescription":
        isError.promdescription =
          value.length >= 1 && value.length <= 255
            ? "&#160;"
            : "Atleast write something";
        break;
      default:
        break;
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleChangeInList(e, index) {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "discdescription":
        isError.discdescription = regExpNumbers.test(value)
          ? "&#160;"
          : "Please put some promotional numbers";
        break;
      case "promdescription":
        isError.promdescription =
          value.length >= 1 && value.length <= 255
            ? "&#160;"
            : "Atleast write something";
        break;
      default:
        break;
    }
    this.state.discounts[index][e.target.id] = e.target.value;
    this.forceUpdate();
  }

  handleSubmitResProfile = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      ds.editRestaurantProfile(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };

  handleAddDiscount = (e) => {
    e.preventDefault();
    var discount = {
      percent: this.state.discdescription,
      descript: this.state.promdescription
    }

    ds.addDiscount(discount).then((res) => {
      this.queryDiscounts();
      console.log("add discount success")
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      ds.createManagerAccount(this.state);
    } else {
      console.log("Form is invalid!");
    }
  };

  // handleMultiplePictures = (e) => {
  //   this.setState({
  //     picture: [...this.state.picture, ...e.target.pictures],
  //   });
  // };

  componentWillMount() {
    this.queryDiscounts();
  }

  queryDiscounts() {
    ds.getDiscounts().then((res) => {
      // console.log("this is discounts");
      // console.log(res.discounts);
      this.setState({
        discounts: res.discounts
      })
      for (var discount of this.state.discounts) {
        discount.contentTable = false;
      }
    }).catch(err => {
      //TODO handling err
    })
  }

  async componentDidMount() {
    const usr = authService.getCurrentUser();
    const restaurant = await ds.getRestaurantInformation();
    console.log(restaurant);
    console.log(restaurant.resName);
    console.log("eating time: " + restaurant.eatingTime);

    // this.state = { resName: restaurant.resName };
    this.setState((state, props) => {
      return {
        resname:
          typeof restaurant.resName != "undefined" ? restaurant.resName : "",
        phonenumber:
          typeof restaurant.phoneNumber != "undefined"
            ? restaurant.phoneNumber
            : "",
        email: typeof usr.user.email != "undefined" ? usr.user.email : "",
        businessnumber:
          typeof restaurant.businessNum != "undefined"
            ? restaurant.businessNum
            : "",
        postalcode:
          typeof restaurant.addressId != "undefined"
            ? restaurant.addressId.postalCode
            : "",
        streetname:
          typeof restaurant.addressId != "undefined"
            ? restaurant.addressId.streetName
            : "",
        streetnumber:
          typeof restaurant.addressId != "undefined"
            ? restaurant.addressId.streetNum
            : "",
        city:
          typeof restaurant.addressId != "undefined"
            ? restaurant.addressId.city
            : "",
        province:
          typeof restaurant.addressId != "undefined"
            ? restaurant.addressId.province
            : "",
        description:
          typeof restaurant.restaurantDescription != "undefined"
            ? restaurant.restaurantDescription
            : "",
        eatingTime:
          typeof restaurant.eatingTime != "undefined"
            ? restaurant.eatingTime
            : "",
        cuisineStyle:
          typeof restaurant.cuisineStyleId != "undefined"
            ? restaurant.cuisineStyleId.cuisineVal
            : "",
        category:
          typeof restaurant.categoryId != "undefined"
            ? restaurant.categoryId.categoryVal
            : "",
        priceRange:
          typeof restaurant.priceRangeId != "undefined"
            ? restaurant.priceRangeId.priceRangeName
            : "",
        monOpenTime:
          typeof restaurant.monOpenTimeId != "undefined"
            ? restaurant.monOpenTimeId.storeTimeVal
            : "",
        tueOpenTime:
          typeof restaurant.tueOpenTimeId != "undefined"
            ? restaurant.tueOpenTimeId.storeTimeVal
            : "",
        wedOpenTime:
          typeof restaurant.wedOpenTimeId != "undefined"
            ? restaurant.wedOpenTimeId.storeTimeVal
            : "",
        thuOpenTime:
          typeof restaurant.thuOpenTimeId != "undefined"
            ? restaurant.thuOpenTimeId.storeTimeVal
            : "",
        friOpenTime:
          typeof restaurant.friOpenTimeId != "undefined"
            ? restaurant.friOpenTimeId.storeTimeVal
            : "",
        satOpenTime:
          typeof restaurant.satOpenTimeId != "undefined"
            ? restaurant.satOpenTimeId.storeTimeVal
            : "",
        sunOpenTime:
          typeof restaurant.sunOpenTimeId != "undefined"
            ? restaurant.sunOpenTimeId.storeTimeVal
            : "",
        monCloseTime:
          typeof restaurant.monCloseTimeId != "undefined"
            ? restaurant.monCloseTimeId.storeTimeVal
            : "",
        tueCloseTime:
          typeof restaurant.tueCloseTimeId != "undefined"
            ? restaurant.tueCloseTimeId.storeTimeVal
            : "",
        wedCloseTime:
          typeof restaurant.wedCloseTimeId != "undefined"
            ? restaurant.wedCloseTimeId.storeTimeVal
            : "",
        thuCloseTime:
          typeof restaurant.thuCloseTimeId != "undefined"
            ? restaurant.thuCloseTimeId.storeTimeVal
            : "",
        friCloseTime:
          typeof restaurant.friCloseTimeId != "undefined"
            ? restaurant.friCloseTimeId.storeTimeVal
            : "",
        satCloseTime:
          typeof restaurant.satCloseTimeId != "undefined"
            ? restaurant.satCloseTimeId.storeTimeVal
            : "",
        sunCloseTime:
          typeof restaurant.sunCloseTimeId != "undefined"
            ? restaurant.sunCloseTimeId.storeTimeVal
            : "",
      };
    });

    // Avoid spacing on the form
    var t1 = document.getElementById("streetnumber");
    t1.onkeypress = function (event) {
      if (event.keyCode === 32) return false;
    };
    var t2 = document.getElementById("email");
    t2.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t5 = document.getElementById("businessnumber");
    t5.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t6 = document.getElementById("phonenumber");
    t6.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };
    var t3 = document.getElementById("discdescription");
    t3.onkeypress = function (e) {
      if (e.keyCode === 32) return false;
    };

    //Disable Button
    $(document).ready(function () {
      $("#mondisablebutton").click(function () {
        if ($("#monOpenTime").prop("disabled")) {
          $("#monOpenTime").prop("disabled", false);
          $("#monCloseTime").prop("disabled", false);
        } else {
          $("#monOpenTime").prop("disabled", true);
          $("#monCloseTime").prop("disabled", true);
        }
      });

      $("#tuedisablebutton").click(function () {
        if ($("#tueOpenTime").prop("disabled")) {
          $("#tueOpenTime").prop("disabled", false);
          $("#tueCloseTime").prop("disabled", false);
        } else {
          $("#tueOpenTime").prop("disabled", true);
          $("#tueCloseTime").prop("disabled", true);
        }
      });

      $("#weddisablebutton").click(function () {
        if ($("#wedOpenTime").prop("disabled")) {
          $("#wedOpenTime").prop("disabled", false);
          $("#wedCloseTime").prop("disabled", false);
        } else {
          $("#wedOpenTime").prop("disabled", true);
          $("#wedCloseTime").prop("disabled", true);
        }
      });

      $("#thudisablebutton").click(function () {
        if ($("#thuOpenTime").prop("disabled")) {
          $("#thuOpenTime").prop("disabled", false);
          $("#thuCloseTime").prop("disabled", false);
        } else {
          $("#thuOpenTime").prop("disabled", true);
          $("#thuCloseTime").prop("disabled", true);
        }
      });

      $("#fridisablebutton").click(function () {
        if ($("#friOpenTime").prop("disabled")) {
          $("#friOpenTime").prop("disabled", false);
          $("#friCloseTime").prop("disabled", false);
        } else {
          $("#friOpenTime").prop("disabled", true);
          $("#friCloseTime").prop("disabled", true);
        }
      });

      $("#satdisablebutton").click(function () {
        if ($("#satOpenTime").prop("disabled")) {
          $("#satOpenTime").prop("disabled", false);
          $("#satCloseTime").prop("disabled", false);
        } else {
          $("#satOpenTime").prop("disabled", true);
          $("#satCloseTime").prop("disabled", true);
        }
      });

      $("#sundisablebutton").click(function () {
        if ($("#sunOpenTime").prop("disabled")) {
          $("#sunOpenTime").prop("disabled", false);
          $("#sunCloseTime").prop("disabled", false);
        } else {
          $("#sunOpenTime").prop("disabled", true);
          $("#sunCloseTime").prop("disabled", true);
        }
      });

      //Restaurant Image Upload
      // $('#upload').on('click', function () {
      //   var file_data = $('#upload').prop('upload')[0];
      //   var form_data = new FormData();
      //   form_data.append('upload', file_data);
      //   $.ajax({
      //     url: 'http://localhost:3000/Image', // point to server-side controller method
      //     dataType: 'text', // what to expect back from the server
      //     cache: false,
      //     contentType: false,
      //     processData: false,
      //     data: form_data,
      //     type: 'post',
      //     success: function (response) {
      //       $('#msg').html(response); // display success response from the server
      //     },
      //     error: function (response) {
      //       $('#msg').html(response); // display error response from the server
      //     }
      //   });
      // });

    });
  }

  //Manager Create Button Form 

  onClick() {
    const usr = authService.getCurrentUser();
    console.log(usr.user._id);
    this.setState({
      accountId: usr.user._id
    });

    this.setState({
      contentTable: !this.state.contentTable
    })


  }

  //  Edit profile disable button
  handleEdit() {
    this.setState({
      disabled: !this.state.disabled
    });
    this.setState({
      contentTable: !this.state.contentTable
    })
    this.changeText();

  }

  //Edit profile - button
  changeText() {
    this.setState(state => {
      return {
        edit: !state.edit
      };
    }, () => {
      if (this.state.edit) {
        $('#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#resProfileResultModal').attr('type', 'button')
      } else {
        $('#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
      }
    });
  }


  // Discount

  discountEditButton(index) {
    console.log(this.state.discounts);
    console.log(index);
    this.state.discounts[index].contentTable = !this.state.discounts[index].contentTable;

    if (!this.state.discounts[index].contenteditable) {
      ds.editDiscount(this.state.discounts[index])
        .then(() => {
          this.queryDiscounts();
        });
    }

    this.callModal();
  }

  discountDeleteButton(index) {
    ds.deleteDiscount(this.state.discounts[index]).then(() => {
      this.queryDiscounts();
    })
  }

  callModal(index) {
    this.setState(state => {
      //   return {
      //     discount: !state.discount
      //   };
      // },
      this.setState(state =>

        () => {
          if (this.state.discount[index].contentTable) {
            $('this.state.discount[index].#save_edit_disc_btn').attr("data-toggle", 'modal').attr("data-target", '#DiscountEditResultModal').attr('type', 'button')
          }
          else {
            $('this.state.discount[index].#save_edit_disc_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
          }
        })
    })

  }


  renderDataDiscount() {
    return this.state.discounts.map((discount, index) => {
      const { id, discdescription, promdescription } = discount
      return (
        <tr key={id} id={'discountrow' + index}>
          <td contentTable={(this.state.discounts[index].contentTable)}>

            <input type="text" id="discdescription" name="discdescription"
              defaultValue={this.state.discounts[index].percent} disabled={(!this.state.discounts[index].contentTable)}
              onChange={(e) => this.handleChangeInList(e, index)} />


          </td>
          <td contentTable={(this.state.discounts[index].contentTable)} >
            <textarea
              rows="5"
              id="promdescription"
              name="promdescription"
              defaultValue={this.state.discounts[index].description}
              disabled={(!this.state.discounts[index].contentTable)}
              onChange={(e) => this.handleChangeInList(e, index)}
            ></textarea>


          </td>
          <td>
            <button id='save_edit_disc_btn'
              onClick={() => { this.discountEditButton(index) }
              }
              type="button" className="btn btn-primary mr-sm-4 "
              data-target="#DiscountEditResultModal">
              {this.state.discounts[index].contentTable ? "Save Change" : "Edit"}

            </button>
          </td>
          <td>
            <button
              id='delete_btn'
              type="button"
              className="btn btn-primary btn-sm mr-sm-2"
              onClick={() => { this.discountDeleteButton(index) }}
              data-toggle="modal"
              data-target="#DiscountDDeleteResultModal"
            >
              Delete
                    </button>
          </td>
        </tr>
      )
    })
  }



  render() {
    const { isError } = this.state;
    return (
      <MainContainer>
        {this.state.resultsErr
          ?
          FullscreenError("An error occured, please try again later")
          :
          null
        }


        {/* {!this.state.isResLoaded
                    ?
                    FullScrrenLoading({ type: 'cubes', color: '#000' })
                    :
                    null
                } */}
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                {/* <Link to='#restaurantProfile'>
                                    <button className="nav-link active" data-toggle="tab">  My Profile</button>
                                </Link> */}
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  role="tab"
                  href="#restaurantProfile"
                  aria-controls="restaurantProfile"
                  aria-selected="true"
                >
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/'>
                                    <button className="nav-link" data-toggle="tab">Menu</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#menu"
                  aria-controls="menu"
                  aria-selected="false"
                >
                  Menu
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/'>
                                    <button className="nav-link" data-toggle="tab">Menu</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#layout"
                  aria-controls="layout"
                  aria-selected="false"
                >
                  Restaurant Layout
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/ChangePassword'>
                                    <button className="nav-link" data-toggle="tab">Password</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#discount"
                  aria-controls="discount"
                  aria-selected="false"
                >
                  Discount
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='#managerAccount'>
                                    <button className="nav-link" data-toggle="tab">Manager</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#managerAccount"
                  aria-controls="managerAccount"
                  aria-selected="false"
                >
                  Manager
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/ChangePassword'>
                                    <button className="nav-link" data-toggle="tab">Password</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#reservation"
                  aria-controls="reservation"
                  aria-selected="false"
                >
                  Reservations
                </a>
              </li>
              <li className="nav-item">
                {/* <Link to='/ChangePassword'>
                                    <button className="nav-link" data-toggle="tab">Password</button>
                                </Link> */}
                <a
                  className="nav-link"
                  data-toggle="tab"
                  role="tab"
                  href="#changePassword"
                  aria-controls="changePassword"
                  aria-selected="false"
                >
                  Password
                </a>
              </li>

            </ul>
          </div>

          <div className="card-body">
            {/* Start of Restaurant Profile */}
            <div className="tab-content">
              <div
                id="restaurantProfile"
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="restaurantProfile"
              >
                <form id="resFormTag" onSubmit={this.handleSubmitResProfile} noValidate>
                  <div id="resForm">
                    <div className="form-group row">
                      <label
                        htmlFor="resname"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Restaurant Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="resname"
                          name="resname"
                          value={this.state.resname}
                          placeholder="Restaurant Name"
                          className={
                            isError.resname.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.resname)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="streetnumber"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Street Number
                      </label>
                      <div className="col-sm-3">
                        <input
                          type="text"
                          id="streetnumber"
                          name="streetnumber"
                          value={this.state.streetnumber}
                          placeholder="Street Number"
                          className={
                            isError.streetnumber.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.streetnumber)}
                        </span>
                      </div>

                      <label
                        htmlFor="streetname"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Street Name
                      </label>
                      <div className="col-sm-5">
                        <input
                          type="text"
                          id="streetname"
                          name="streetname"
                          value={this.state.streetname}
                          placeholder="Street Name"
                          className={
                            isError.streetname.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.streetname)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="city" className="col-sm-2 col-form-label">
                        {" "}
                        City
                      </label>
                      <div className="col-md-3">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={this.state.city}
                          placeholder="City"
                          className={
                            isError.city.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.city)}
                        </span>
                      </div>

                      <label
                        htmlFor="province"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Province
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="province"
                          name="province"
                          value={this.state.province}
                          placeholder="Province"
                          className={
                            isError.province.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.province)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="postalcode"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Postal Code
                      </label>
                      <div className="col-md-3">
                        <input
                          type="text"
                          id="postalcode"
                          name="postalcode"
                          value={this.state.postalcode}
                          placeholder="Postal Code"
                          className={
                            isError.postalcode.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.postalcode)}
                        </span>
                      </div>
                      <label
                        htmlFor="phonenumber"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Phone Number
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="phonenumber"
                          name="phonenumber"
                          value={this.state.phonenumber}
                          placeholder="Phone Number"
                          className={
                            isError.phonenumber.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.phonenumber)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Email
                      </label>
                      <div className="col-md-10">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={this.state.email}
                          placeholder="Email"
                          className={
                            isError.email.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={true}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.email)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="businessnumber"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Business Number
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          id="businessnumber"
                          name="businessnumber"
                          value={this.state.businessnumber}
                          placeholder="Business Number"
                          className={
                            isError.businessnumber.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                          required
                        />
                        <span className="invalid-feedback">
                          {Parser(isError.businessnumber)}
                        </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="eatingTime"
                        className="col-sm-2 col-form-label"
                      >
                        Eating Time
                      </label>

                      <div className="col-md-10 row">
                        <select
                          className="custom-select col-md-5"
                          id="eatingTime"
                          name="cuisineStyle"
                          value={this.state.eatingTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Max Eating Time</option>
                          <option value="1">1 hour</option>
                          <option value="2">2 hour</option>
                          <option value="3">3 hour</option>
                        </select>
                        <p className="text-right">*This is the max hour customers can dine in</p>

                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="cuisineStyle"
                        className="col-sm-2 col-form-label"
                      >
                        Cuisine Style
                      </label>
                      <div className="col-md-10">
                        <select
                          className="custom-select "
                          id="cuisineStyle"
                          name="cuisineStyle"
                          value={this.state.cuisineStyle}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Style</option>
                          <option value="american">American</option>
                          <option value="italian">Italian</option>
                          <option value="steakhouse">Steak House</option>
                          <option value="seafood">Seafood</option>
                          <option value="french">French</option>
                          <option value="indian">Indian</option>
                          <option value="japanese">Japanese</option>
                          <option value="british">British</option>
                          <option value="barbecue">Barbecue</option>
                          <option value="tapas">Tapas</option>
                          <option value="grill">Grill</option>
                          <option value="conformfood">Conform Food</option>
                          <option value="afternoontea">Afternoon Tea</option>
                          <option value="burgers">Burgers</option>
                          <option value="canadian">Canadian</option>
                          <option value="vegan">Vegan</option>
                          <option value="vegiterian">Vegetarian</option>
                          <option value="asian">Asian</option>
                          <option value="european">European</option>
                          <option value="continental">Continental</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="category"
                        className="col-sm-2 col-form-label"
                      >
                        Category
                      </label>
                      <div className="col-md-10">
                        <select
                          className="custom-select "
                          id="category"
                          name="category"
                          value={this.state.category}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Category</option>
                          <option value="ethinic">Ethinic</option>
                          <option value="fastfood">Fast Food</option>
                          <option value="fastcasual">Fast Casual</option>
                          <option value="casualdining">Casual Dining</option>
                          <option value="premiumdining">Premium Dining</option>
                          <option value="familydining">Family Dining</option>
                          <option value="finedining">Fine Dining</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="priceRange"
                        className="col-sm-2 col-form-label"
                      >
                        Price Range
                      </label>
                      <div className="col-md-10">
                        <select
                          className="custom-select "
                          id="priceRange"
                          name="priceRange"
                          value={this.state.priceRange}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Range</option>
                          <option value="low">$0-$50</option>
                          <option value="medium">$50-$100</option>
                          <option value="high">$100+</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="openHours"
                        className="col-sm-2 col-form-label"
                      >
                        Open Hours
                      </label>
                      <div className="col-md-10">
                        <label
                          htmlFor="monday"
                          className="col-sm-2 col-form-label"
                        >
                          Monday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="monOpenTime"
                          name="monOpenTime"
                          value={this.state.monOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="monCloseTime"
                          name="monCloseTime"
                          value={this.state.monCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="mondisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="tuesday"
                          className="col-sm-2 col-form-label"
                        >
                          Tuesday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="tueOpenTime"
                          name="tueOpenTime"
                          value={this.state.tuesOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="tueCloseTime"
                          name="tueCloseTime"
                          value={this.state.tueCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="tuedisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="wednesday"
                          className="col-sm-2 col-form-label"
                        >
                          Wednesday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="wedOpenTime"
                          name="wedOpenTime"
                          value={this.state.wedOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="wedCloseTime"
                          name="wedCloseTime"
                          value={this.state.wedCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="weddisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="thursday"
                          className="col-sm-2 col-form-label"
                        >
                          Thursday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="thuOpenTime"
                          name="thuOpenTime"
                          value={this.state.thuOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="thuCloseTime"
                          name="thuCloseTime"
                          value={this.state.thuCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="thudisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="friday"
                          className="col-sm-2 col-form-label"
                        >
                          Friday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="friOpenTime"
                          name="friOpenTime"
                          value={this.state.friOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="friCloseTime"
                          name="friCloseTime"
                          value={this.state.friCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="fridisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="saturday"
                          className="col-sm-2 col-form-label"
                        >
                          Saturday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="satOpenTime"
                          name="satOpenTime"
                          value={this.state.satOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="satCloseTime"
                          name="satCloseTime"
                          value={this.state.satCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="satdisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>

                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-md-10">
                        <label
                          htmlFor="sunday"
                          className="col-sm-2 col-form-label"
                        >
                          Sunday
                        </label>
                        <select
                          className="custom-select col-md-3"
                          id="sunOpenTime"
                          name="sunOpenTime"
                          value={this.state.sunOpenTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Open Time</option>
                          <option value="7am">7:00 AM</option>
                          <option value="730am">7:30 AM</option>
                          <option value="8am">8:00 AM</option>
                          <option value="830am">8:30 AM</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                        </select>
                        ~
                        <select
                          className="custom-select col-md-3"
                          id="sunCloseTime"
                          name="sunCloseTime"
                          value={this.state.sunCloseTime}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        >
                          <option value="">Choose Close Time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="930am">9:30 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="1030am">10:30 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="1130am">11:30 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="1230pm">12:30 PM</option>
                          <option value="1pm">1:00 PM</option>
                          <option value="130pm">1:30 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="230pm">2:30 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="330pm">3:30 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="430pm">4:30 PM</option>
                          <option value="5pm">5:00 PM</option>
                          <option value="530pm">5:30 PM</option>
                          <option value="6pm">6:00 PM</option>
                          <option value="630pm">6:30 PM</option>
                          <option value="7pm">7:00 PM</option>
                          <option value="730pm">7:30 PM</option>
                          <option value="8pm">8:00 PM</option>
                          <option value="830pm">8:30 PM</option>
                          <option value="9pm">9:00 PM</option>
                          <option value="930pm">9:30 PM</option>
                          <option value="10pm">10:00 PM</option>
                          <option value="1030pm">10:30 PM</option>
                          <option value="11pm">11:00 PM</option>
                          <option value="1130pm">11:30 PM</option>
                          <option value="12am">12:00 AM</option>
                          <option value="1230am">12:30 AM</option>
                          <option value="1am">1:00 AM</option>
                          <option value="130am">1:30 AM</option>
                        </select>
                        <label className="col-sm-1 col-form-label"></label>
                        <button
                          type="button"
                          className="btn btn-outline-dark col-sm-2"
                          id="sundisablebutton"
                          disabled={(!this.state.disabled)}
                        >
                          {" "}
                          Not Open{" "}
                        </button>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="picture"
                        className="col-sm-2 col-form-label"
                      >
                        Restaurant Picture
                      </label>

                      {/* <div className="custom-file col-md-9">
                        <input
                          type="file"
                          multiple
                          className="custom-file-input col-md-8"
                          id="picture"
                          name="picture"
                          value={this.state.picture}
                          onChange={this.onImageChange}
                          disabled={(!this.state.disabled)}
                        />
                        <label
                          className="custom-file-label form-group"
                          htmlFor="picture"
                        >
                          Upload Picture
                        </label>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="upload">Upload</button>
                      </div>
                      <p id="msg"></p> */}

                      <input type="file" name="picture" id="picture" value={this.state.picture}
                        onChange={this.onImageChange} disabled={(!this.state.disabled)} />

                      <img src={this.state.picture} style={{ maxHeight: '100%', maxWidth: '100%' }} />



                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="description"
                        className="col-sm-2 col-form-label"
                      >
                        Restaurant Description
                      </label>
                      <div className="col-md-10">
                        <textarea
                          className={
                            isError.description.length > 6
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          rows="5"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          disabled={(!this.state.disabled)}
                        ></textarea>
                        <span className="invalid-feedback">
                          {Parser(isError.description)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-inline">
                    <div className="form-group text-center ">
                      <button id='save_edit_btn' onClick={this.handleEdit.bind(this)} type="button" className="btn btn-primary mr-sm-4 ">
                        {this.state.edit ? "Save Change" : "Edit"}

                      </button>
                    </div>
                    <div className="form-group text-center ">

                      <button type="button" className="btn btn-primary mr-sm-4 "
                        data-toggle="modal"
                        data-target="#deleteRestaurantModal">
                        {/* When the user click the delete button, their account will be deleted and redirect to homepage as log out status. */}
                      Delete
                    </button>
                      {/* Delete Modal */}
                      <div
                        className="modal fade"
                        id="deleteRestaurantModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="deleteRestaurantLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="deleteRestaurantModalLabel">
                                Delete Restaurant Profile
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
                              <p className="alert alert-warning" id="signResultText">
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

                    </div>
                  </div>

                  {/* Restaurant profile result Modal */}
                  <div
                    className="modal fade"
                    id="resProfileResultModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="resProfileResultModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="resProfileResultModalLabel"
                          >
                            Restaurant profile
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
                          <p
                            className="alert alert-warning"
                            id="resProfileResultText"
                          >
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

                  {/* </div> */}
                  {/* </div> */}
                </form>
              </div>

              {/* End of Restaurant Profile */}

              {/* Start of Manager Account*/}

              <div
                id="managerAccount"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="managerAccount"
              >
                <Manager />
              </div>

              {/* End of Manager Account */}

              {/* Start Password */}
              <div
                id="changePassword"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="changePassword"
              >
                <ChangePassword />
              </div>
              {/* End Password */}

              {/* Start Menu */}
              <div id="menu" className="tab-pane fade" role="tabpanel" aria-labelledby="menu">
                <Menu />
              </div>
              {/* End Menu */}

              {/* Start Reservation */}
              <div id="reservation" className="tab-pane fade" role="tabpanel" aria-labelledby="reservation">
                <RestaurantReservation />
              </div>
              {/* End Reservation */}

              {/* Start Restaurant Layout */}
              <div id="layout" className="tab-pane fade" role="tabpanel" aria-labelledby="layout">
                <RestaurantLayout />
              </div>
              {/* End Restaurant Layout */}

              {/* Start Discount */}
              <div id="discount" className="tab-pane fade" role="tabpanel" aria-labelledby="discount">
                <br />
                <h4>Discount Promotion</h4>
                <hr />
                <p>Add discounts or promotions here</p>
                <div className="form-group row">
                  <label
                    htmlFor="discdescription"
                    className="col-sm-2 col-form-label"
                  >
                    Discount/Promotion
                      </label>
                  <div className="col-sm-2">
                    <input
                      className={
                        isError.discdescription.length > 6
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      rows="1"
                      id="discdescription"
                      name="discdescription"
                      value={this.state.discdescription}
                      onChange={this.handleChange}

                    ></input>
                    <span className="invalid-feedback">
                      {Parser(isError.discdescription)}
                    </span>
                  </div>
                  <label
                    htmlFor="discdescription"
                    className="col-sm-2 col-form-label"
                  >
                    %
                      </label>


                </div>

                <div className="form-group row">
                  <label
                    htmlFor="promdescription"
                    className="col-sm-2 col-form-label"
                  >
                    Discount/Promotion Description
                      </label>
                  <div className="col-md-10">
                    <textarea
                      className={
                        isError.promdescription.length > 6
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      rows="5"
                      id="promdescription"
                      name="promdescription"
                      value={this.state.promdescription}
                      onChange={this.handleChange}

                    ></textarea>
                    <span className="invalid-feedback">
                      {Parser(isError.promdescription)}
                    </span>
                  </div>
                </div>

                <button type="button"
                  onClick={this.handleAddDiscount.bind(this)}
                  className="btn btn-primary">
                  Add Discount
                </button>
                <br />
                <br />
                <h4>Discount/Promotion List</h4>
                <hr />
                <table id="discount" className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">%</th>
                      <th scope="col">Description</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {this.renderDiscountTable()} */}
                    {this.renderDataDiscount()}
                  </tbody>
                </table>

            </div>
          </div>
           {/* DeleteDiscountModal */}

           <div
                  className="modal fade"
                  id="DiscountDDeleteResultModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="DiscountDDeleteResultModal"
                  aria-hidden="true"
                >

                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="DiscountDDeleteResultModal">
                          Delete Discount
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
                        <p className="alert alert-warning" id="DiscountDDeleteResultModalText">
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

                {/* Edit Discount Modal */}

                <div
                  className="modal fade"
                  id="DiscountEditResultModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="DiscountEditResultModal"
                  aria-hidden="true"
                >

                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="DiscountEditResultModal">
                          Edit Discount
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
                        <p className="alert alert-warning" id="DiscountEditResultModalText">
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
              </div>

              {/* End Discount */}
        </div>
      </MainContainer>
    );
  }
}

export default RestaurantProfile;
