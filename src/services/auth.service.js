import axios from 'axios';
import {authHeader} from '../utils/util'

const API_URL = process.env.VUE_APP_API_HOST;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/api/login', {
        username: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.
      post(API_URL + '/api/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  updateProfile(formData) {
    return axios.
      put(API_URL + '/api/profile/update', formData, {
        headers: authHeader()
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

}

export default new AuthService();
