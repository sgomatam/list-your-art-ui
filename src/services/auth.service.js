import axios from 'axios';

const API_URL = 'http://lya-api.us-east-2.elasticbeanstalk.com/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
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
    return axios.post(API_URL + 'signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone
    });
  }
}

export default new AuthService();
