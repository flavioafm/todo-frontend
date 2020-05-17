
import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:3001/api/";

class ProtectedServices {

    async getRequest(){
        const token = await AuthService.getCurrentUser().token;
        return axios.create({
            baseURL: API_URL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token,
            }
        });
    }
}

export default ProtectedServices;