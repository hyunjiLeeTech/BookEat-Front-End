import authHeader from "./authHeader";
import authService from "./AuthService";
import serverAddress from "./ServerUrl";
import Axios from "axios";
import $ from "jquery";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  search(info) {
    return Axios.post(serverAddress + "/search", info)
      .then(function (req) {
        return req.data;
      })
      .catch((err) => {
        //TODO: errhandling
        throw err
      });
  },
  restaurantConfirmReservation(reservationId) {
    return Axios.post(serverAddress + '/restaurant/confirmattendence', { reservationId: reservationId }, { headers: authHeader() })
      .then(res => {
        if (res.data.errcode !== 0) {
          throw res.data;
        }
      }).catch(err => {
        console.log(err);
        throw (err);
        //TODO: errhandling
      })
  },
  restaurantCancelReservation(reservationId) {
    return Axios.post(serverAddress + '/restaurant/cancelreservation', { reservationId: reservationId }, { headers: authHeader() })
      .then(res => {
        if (res.data.errcode !== 0) {
          throw res.data;
        }
      }).catch(err => {
        console.log(err);
        throw (err);
        //TODO: errhandling
      })
  },
  customerCancelReservation(reservationId) {
    return Axios.post(serverAddress + '/customer/cancelreservation', { reservationId: reservationId }, { headers: authHeader() })
      .then(res => {
        if (res.data.errcode !== 0) {
          throw res.data;
        }
      }).catch(err => {
        console.log(err);
        throw (err);
        //TODO: errhandling
      })
  },

  async changeAccountPassword(oldPassword, newPassword) {
    await sleep(500)
    return Axios.post(serverAddress + '/account/resetpassword', { oldPassword: oldPassword, newPassword: newPassword }, { headers: authHeader() }).then(res => {
      if (res.data.errcode !== 0) {
        throw res.data;
      }
    }).catch(err => {
      console.log(err);
      throw (err);
      //TODO: errhandling
    })
  },
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
  addMenu(state) {
    return Axios.post(serverAddress + "/menu/addmenu", state, {
      headers: authHeader()
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },
  async getMenus() {
    return await Axios.get(serverAddress + "/menu/getmenus", {
      headers: authHeader()
    }).then((res) => {
      console.log("ds get menu")
      console.log(res.data);
      return res.data
    }).catch((err) => {
      console.log(err)
    })
  },
  editMenu(state) {
    return Axios.post(serverAddress + "/menu/editmenu", state, {
      headers: authHeader()
    }).then((res) => {
      console.log(res);
    }).catch(((err) => {
      console.log(err);
    }))
  },
  deleteMenu(state) {
    return Axios.post(serverAddress + "/menu/deletemenu", state, {
      headers: authHeader()
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },
  addDiscount(state) {
    return Axios.post(serverAddress + "/discount/adddiscount", state, {
      headers: authHeader()
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }, getDiscounts() {
    return Axios.get(serverAddress + "/discount/getdiscounts", {
      headers: authHeader()
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      console.log(err);
    })
  },
  async addMenuImage(formData, config) {
    console.log("add menu image start");
    return await Axios.post(serverAddress + "/addMenuImage", formData, config).then((res) => {
      return res.data.menuImage;
    })
  },
  async getImage(state) {
    return await Axios.get(serverAddress + "/getimage", state)
      .then((res) => {
        console.log(res);
        console.log('success get image');
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
