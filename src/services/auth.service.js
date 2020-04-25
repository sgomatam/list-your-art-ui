import axios from 'axios';

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
    return axios.post(API_URL + '/api/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone
    });
  }
}

export default new AuthService();
