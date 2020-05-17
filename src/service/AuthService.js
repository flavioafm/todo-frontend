import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/auth/`;

class AuthService {
    async login(email, password) {
        return await axios
        .post(API_URL + "authenticate", {
            email,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response;
        })
        .catch(err =>{
            return err.response;
        });
    }

    async logout() {
        localStorage.removeItem("user");
    }

    async register(name, email, password) {
        return await axios
        .post(API_URL + "register", {
            name,
            email,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response;
        })
        .catch(err =>{
            return err.response;
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        const user = this.getCurrentUser();
        return user;
    }
}

export default new AuthService();