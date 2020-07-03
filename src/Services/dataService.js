import authHeader from "./authHeader";
import authService from "./AuthService";
import serverAddress from "./ServerUrl";
import Axios from "axios";

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
  getRestaurantUpcomingReservation(){
    return Axios.get(serverAddress + "/upcomingreservations", {
      headers: authHeader(),
    })
    .then (function (res){
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
  },
  getRestaurantPastReservation(){
    return Axios.get(serverAddress + "/restaurant/reservationsofpast14days", {
      headers: authHeader(),
    })
    .then (function (res){
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
  },
};
