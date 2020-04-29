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
            
            <div class="content d-none" id="cropper">
              <section class="cropper-area">
                <div class="img-cropper">
                  <vue-cropper
                    ref="cropper"
                    :aspect-ratio="16 / 16"
                    :src="imgSrc"
                  />
                </div>
                <div class="text-center">
                  <a href="#" class="" role="button" @click.prevent="rotate(90)"> <img src="@/assets/rotate.png" alt="" width="30" class="mb-3 mt-3"> </a>
                </div>
                
              </section>
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

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'ArtListing',
  components: {
    VueCropper,
  },
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      file:"",
      message:"",
      imgSrc: '@/assets/art-listing.svg',
      model: {
        'artName': 'testing image crop'
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

    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    onSelect(e) {
      const file = e.target.files[0];

      document.getElementById('cropper').classList.remove('d-none');

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },

    onSubmit() {
      const canvas = this.$refs.cropper.getCroppedCanvas();
      
      canvas.toBlob((blob) => {
        let formData = new FormData();

        // Add name for our image
        formData.append('name', "image-name-"+(new Date()).getTime());

        // Append image file
        formData.append('file', blob, 'art.jpeg');

        //this.model.artName = this.$refs.description.value;
        //formData.append('model', JSON.stringify(this.model));
        formData.append('model', '{"artName": "testing image crop"}');
        
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








.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 100%;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  height: 100px;
}

.preview-area {
  width: 307px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}

</style>