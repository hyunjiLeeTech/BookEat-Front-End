import authHeader from "./authHeader";
import authService from "./AuthService";
import serverAddress from "./ServerUrl";
import Axios from "axios";
import $ from "jquery";

export default {
  customersReserve(info) {
    return Axios.post(serverAddress + "/restaurant/reserve", info, {
      headers: authHeader(),
    })
      .then(function (req) {
        return req.data;
      })
      .catch((err) => {
        //TODO: errhandling
      });
  },

  getTableStatus(info) {
    return Axios.post(serverAddress + "/restaurant/tableinfo", info, {
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
  getManagerInformation() {
    return Axios.get(serverAddress + "/manager/getmanagerinfo", {
      headers: authHeader(),
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  getRestaurantUpcomingReservation() {
    return Axios.get(serverAddress + "/restaurant/upcomingreservations", {
      headers: authHeader(),
    })
      .then(function (res) {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  getRestaurantPastReservation() {
    return Axios.get(serverAddress + "/restaurant/reservationsofpast14days", {
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
  editManagerProfile(state) {
    Axios.post(serverAddress + "/manager/editmanagerprofile", state, {
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#signResultText")
            .text("Profiled is edited")
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
    }) // TODO: need to move jquery
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#manSignResultText")
            .text("Manager account is created")
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-success");
        } else {
          $("#manSignResultText")
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
  getManagerAccounts() {
    return Axios.get(serverAddress + "/restaurantOwners/getmanagers", {
      headers: authHeader(),
    })
      .then(function (res) {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteManagerAccount(managerId) {
    return Axios.post(
      serverAddress + "/restaurantOwners/deletemanager",
      managerId,
      {
        headers: authHeader(),
      }
    ) // TODO: move jquery
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#deleteResultText")
            .text("Manager account is deleted")
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-success");
        } else {
          $("#deleteResultText")
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
  editCustomerProfile(state) {
    return Axios.post(serverAddress + "/customers/editcustomerprofile", state, {
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          $("#customerProfileResultText")
            .text("Customer profile is edited")
            .removeClass("alert-warning")
            .removeClass("alert-danger")
            .removeClass("alert-success")
            .addClass("alert-success");
        } else {
          $("#customerProfileResultText")
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
