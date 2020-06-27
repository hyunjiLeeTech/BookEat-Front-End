import axios from "axios";
import serverAddress from './ServerUrl'
import authHeader from './authHeader'

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
                } else {
                    console.log('login failed: ');
                    console.log(response.data)
                }
                return response;
            }).catch(err => console.log("AuthService Login: err: " + err));
    }
    logout() {
        console.log(authHeader());
        return axios
            .get(API_URL + "/logout", {
                headers: authHeader()
            })
            .then(res=>{
                if(res.errcode !== 0){
                    console.log('logout error returned from server side')
                    console.log(res.data)
                }
                localStorage.removeItem("user");
                return res;
            }).catch(err =>{
                console.log("logout error")
                console.log(err);
                localStorage.removeItem("user");
                throw err;
                //return err;
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
    //TODO: get suer from server side
    getCurrentUserFromServer(){
        return {};
    }
}

export default new AuthService();