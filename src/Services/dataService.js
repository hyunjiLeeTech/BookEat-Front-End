import authHeader from "./authHeader";
import authService from "./AuthService";
import serverAddress from "./ServerUrl";
import Axios from "axios";
import $ from "jquery";

export default {
  customersReserve(info){
    return Axios.post(serverAddress + "/restaurant/reserve", info, {
      headers: authHeader(),
    }).then(function (req){
      return req.data;
    }).catch((err) => {
      //TODO: errhandling
    })
  },

  getTableStatus(info){
    return Axios.post(serverAddress + "/restaurant/tableinfo",info, {
      headers: authHeader(), //set auth header
    })
      .then(function (res) {
        //console.log(res);
        return res.data;
      })
      .catch((err) => {
        throw err;
      }); //TODO: err handling needs to be finished
  },
  getRestaurantReservations(){
    
  },
  getCustomerReservations(){

  },


  getCustomerInformation() {
    return Axios.get(serverAddress + "/customers/getcustomerinfo", {
      headers: authHeader(), //set auth header
    })
      .then(function (res) {
        //console.log(res);
        return res.data;
      })
      .catch((err) => {
        throw err;
      }); //TODO: err handling needs to be finished
  },
  getRestaurantInformation() {
    return Axios.get(serverAddress + "/restaurantOwners/getrestaurantinfo", {
      headers: authHeader(),
    })
      .then(function (res) {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  editRestaurantProfile(state) {
    Axios.post(serverAddress + "/restaurant/editresprofile", state, {
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#resProfileResultText")
            .text("Profiled is edited")
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-success");
        } else {
          $("#resProfileResultText")
            .text("Sorry, " + res.data.errmsg)
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateCustomerInformation(state) {
    Axios.post(serverAddress + "/updatecustomerinfo", state, {
      headers: authHeader(),
    }).then((res) => {
      console.log(res);
      if (res.data.errcode === 0) {
        $("#updateResultText")
          .text("Profile update is finished.")
          .removeClass("alert-warning")
          .removeClass("alert-danger")
          .removeClass("alert-success")
          .addClass("alert-success");
      } else {
        $("#updateResultText")
          .text("Sorry, " + res.data.errmsg)
          .removeClass("alert-warning")
          .removeClass("alert-danger")
          .removeClass("alert-success");
      }
    });
  },
  createManagerAccount(state) {
    Axios.post(serverAddress + "/managersignup", state, {
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#signResultText")
            .text("Manager account is created")
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-success");
        } else {
          $("#signResultText")
            .text("Sorry, " + res.data.errmsg)
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
