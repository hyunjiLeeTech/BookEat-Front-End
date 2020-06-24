import axios from "axios";
import serverAddress from './ServerUrl'

const API_URL = serverAddress;

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.errcode === 0) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            }).catch(err => console.log("AuthService Login: err: " + err));
    }
    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();