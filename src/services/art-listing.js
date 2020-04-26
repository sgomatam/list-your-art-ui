import axios from 'axios';

const API_URL = process.env.VUE_APP_API_HOST;

class ArtListingService {
  listAnArt(data) {
    axios
      .post(API_URL + '/api/art/add', data)
      .then(response => {
        if (response) {
          console.log("POSTED");
        }
      }).catch(err => {
        console.log(err);
        this.message = err.response.data.error;
      });
  }
}

export default new ArtListingService();
