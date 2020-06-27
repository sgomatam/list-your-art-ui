<template >
  <div v-if="information" class="m-3 pt-3">
    <div class="row mb-5">

      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img class="img-fluid" :src="API_HOST+information.artURL">
      </div>

      <div class=" col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">

        <div class="info col12 col-sm-12 mb-4 pb-4">
          <h1 class="font-weight-bold text-uppercase pt-3">{{ information.artName }}</h1>
        </div>

        <form class="" @submit.prevent="updateArt(information.id)">
            <div class="form-group col12 col-sm-12">
                <label for="description">Description</label>
                <textarea 
                    v-model="information.artDescription"
                    id="description" name="description" 
                    placeholder="A breif description of the art" 
                    ref="artDescription"
                    class="form-control art-description">
                </textarea>
            </div>

            <div class="form-group col12 col-sm-12">
                <label for="artCategory">Art Category</label>
                <div class="input-group input-group-seamless">
                    <input type="text" 
                      v-model="information.artCategory" 
                      placeholder="Painting, Photography, etc..." 
                      class="form-control" 
                      ref="artCategory"
                      id="artCategory">
                </div>
            </div>

            <div class="text-center m-4">
                <button class="btn update-art justify-content-center mr-4">UPDATE</button>
                <router-link class="btn primary-btn update-art p-3" to="/profile">CANCEL</router-link>
            </div>
        </form>

        <div v-if="message" class="message alert alert-danger text-center m-4">
            <h5 >{{message}}</h5>
        </div>

        <div class="info col12 col-sm-12 mt-4 pt-4">
            Dont like the art listed? <span class="text-center underline" @click="deleteArt(information, information.id)"><u>Delete!</u></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBreadcrumb from '@/components/InfoPage/InfoBreadcrumb.vue'
import InfoBox from '@/components/InfoPage/InfoBox.vue'
import InfoText from '@/components/InfoPage/InfoText.vue'
import Art from '@/components/ArtsPage/Art.vue'
import axios from "axios"
import {authHeader} from '../utils/util'

export default {
  name:'Info',
  components: {
    InfoBox, InfoText, Art
  },
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      information: {},
      message: ""
    }
  },
  created(){
    let artId = this.artId;
    this.information = this.$store.state.arts.items.find(function(art) {
      return art.id == artId
    })

    /* TODO: Move this to VUEX */
    if (!this.information) {
      axios.get(this.API_HOST + '/api/art/all')
        .then(arts => { 
            this.$store.state.arts.items = arts.data;
            this.information = arts.data.find(function(art) {
                return art.id == artId
            })
        })
        .catch(error => {
            throw new Error(`API ${error}`);
        });
    }
    /* End of TODO */
  },
  computed: {
    artId() {
      return this.$route.params.artId
    }
  },
  watch: {
    '$route.params.artId': function(artId){
      this.information = this.$store.state.arts.items.find(function(art) {
        return art.id == artId
      })
    }
  },
  methods: {
    deleteArt(it, id) {
        // Replace native confirmation with custom one
        if( confirm("Do you really want to delete?") ){
            axios
            .delete(this.API_HOST + '/api/art/delete/'+ id, {
                headers: authHeader()
            })
            .then(response => { 
                this.$router.push('/profile');
            })
            .catch(error => {
                throw new Error(`Unable to delete art! ${error}`);
                this.message = "Delete Failed";
            });
        }
    },
    updateArt (id) {
        let formData = new FormData();
        let model = {};
        
        model.artDescription = this.$refs.artDescription.value;
        model.artCategory = this.$refs.artCategory.value;
        formData.append('model', JSON.stringify(model));

        axios
            .put(this.API_HOST + '/api/art/update/'+ id, formData, {
                headers: authHeader()
            })
            .then(response => {
                if (response) {
                    this.$router.push('/info/'+id);
                }
            }).catch(err => {
                console.log(err);
                this.message = err;
            });
    }

  }
}
</script>

<style scoped>
hr {
  width: 50px;
  border-bottom: 1px solid black;
}

.update-art {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 120px;
  height: 55px;
  background-color: #2c3539;
  color: #fff;
  font-size: 15px;
  padding: 0px 20px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.update-art:hover, .update-art:focus {
  background-color: inherit;
  color: black;
}

.art-description {
    min-height: 200px;
}
</style>
