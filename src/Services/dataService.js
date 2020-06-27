import authHeader from './authHeader'
import authService from './AuthService'
import serverAddress from './ServerUrl'
import Axios from 'axios';


export default {
    getCustomerInformation() {
        return Axios.get(serverAddress + '/customers/getcustomerinfo', {
            headers: authHeader() //set auth header
        }).then(res => {
            //console.log(res);
            return res;
        }).catch(err => { throw err }); //TODO: err handling needs to be finished
    },
}

