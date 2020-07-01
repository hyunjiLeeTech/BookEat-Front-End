import authHeader from "./authHeader";
import authService from "./AuthService";
import serverAddress from "./ServerUrl";
import Axios from "axios";
import $ from "jquery";

export default {
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
    return Axios.post(serverAddress + "/restaurant/editresprofile", state, {
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
};
