<template>
  <div class=" art-listing-container py-5">

    <section class="text-white text-center">
        <h2 class="display-6">Your Listing Starts Here!</h2>
        <img src="@/assets/art-listing.svg" alt="" width="150" class="mb-4">
    </section>

    <div class="row ml-4 mr-4 py-4">
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-4 mx-auto">

          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
              <input 
                id="upload"
                class="form-control border-0"
                type="file"
                ref="file"
                @change="onSelect"
              />
              <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
              <div class="input-group-append">
                  <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
              </div>
            </div>

            <div class="input-group mb-3 px-2 py-2 bg-white shadow-sm">
            <input
              id="description"
              type="description"
              ref="description"
              placeholder="Short Description"
              class="border-0"
            />
            </div>
            
            <button class="btn btn-block btn-dark "> Upload</button>

            <div class="image-area mt-4 mb-3">
              <img id="imageResult" src="#" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">
            </div>

            <div class="message">
              <h5>{{message}}</h5>
            </div>

          </form>
        </div>
    </div>
</div>

</template>


<script>
import axios from 'axios';
import artListingService from '../services/art-listing'
import {authHeader} from '../utils/util'

export default {
  name: 'ArtListing',
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      file:"",
      message:"",
      model: {
        'artName': ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    // For Safari
    document.body.scrollTop = 0; 
    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0; 
  },
  methods: {
    onSelect(event) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if(!allowedTypes.includes(file.type)){
        this.message = "Make sure the file type matches: JPEG/JPG/PNG"
      }
      if(file.size>500000){
        this.message = 'File is too large, max size 500kb'
      }

      let reader = new FileReader();
      reader.onload = function (e) {
          $('#imageResult').attr('src', e.target.result);
          $('#upload-label').html(file.name);
      };
      reader.readAsDataURL(file);
    },

    onSubmit() {
      const formData = new FormData();
      formData.append('file', this.file);
      this.model.artName = this.$refs.description.value;
      formData.append('model', JSON.stringify(this.model));
      axios
        .post(this.API_HOST + '/api/art/add', formData, {
          headers: authHeader()
        })
        .then(response => {
          if (response) {
            this.$router.push('/arts');
          }
        }).catch(err => {
          console.log(err);
          this.message = err.response.data.error;
        });
    }
  }

}
</script>

<style scoped>

.art-listing-container {
    min-height: 100vh;
    background-color: #757f9a;
    background-image: linear-gradient(147deg, #757f9a 0%, #d7dde8 100%);
}

#upload {
    opacity: 0;
}

#upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

.image-area {
    border: 2px dashed rgba(255, 255, 255, 0.7);
    padding: 1rem;
    position: relative;
}

.image-area::before {
    content: 'Uploaded image';
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    z-index: 1;
}

.image-area img {
    z-index: 2;
    position: relative;
}

#description {
  width: 100%;
}

</style>