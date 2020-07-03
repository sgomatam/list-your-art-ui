<template>
  <div>
    <transition-group name="fade" class="row" tag="div">
      <div v-for="item in artArray" class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 pb-3" :key="item.id">

          <div class="card">
            <img class="card-img-top" :src="API_HOST+item.artURL" alt="Card image cap">
            <div class="overlay">
              <router-link v-if="CanEdit" :to="'/edit/art/'+ item.id"><button type="button" class="btn btn-outline-secondary btn-lg btn-dark text-light" @click="scrollToTop()">Edit</button></router-link>
              <router-link v-else :to="'/info/'+ item.id"><button type="button" class="btn btn-outline-secondary btn-lg btn-dark text-light" @click="scrollToTop()">Info</button></router-link>

            </div>
            <div class="card-body">
              <h5 class="card-item"> <a href="#" class="text-dark">{{ item.artName }}</a></h5>
              <p v-if="item.authorName" class="small text-muted font-italic">by: {{ item.authorName }}</p>
              
              <div class="like-button-wrapper"> 
                <button @click="toggleLike(item, $event)" v-bind:class="{'like-button material-icons':true, 'liked':item.liked}">favorite</button>
                <span class="like-count">{{item.likes}}</span>
              </div>
              
            </div>
          </div>
      </div>
    </transition-group>
  </div>

</template>

<script>
import axios from "axios"
import {authHeader} from '../../utils/util'

export default {
  name: 'Art',

  props: ['CardArray', 'CanEdit'],

  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      liked: false,
      text: ''
    }
  },

  created(){
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    artArray() {
      let currentArtist = this.currentUser;
      if (currentArtist) {
        this.CardArray.forEach(art => {
          art.liked = false;
          if(art.likedByArtist && art.likedByArtist.length > 0) {
            art.likedByArtist.forEach(artist => {
              if (artist.email === currentArtist.email) {
                art.liked = true;
              }
            });
          }
        });
      }
      return this.CardArray;
    }
  },

  methods: {
    scrollToTop() {
      // For Safari
      document.body.scrollTop = 0; 
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTop = 0; 
    },

    toggleLike(art, event) {
      if (!this.currentUser) {
        this.$router.push('/login');
        return;
      }
      if (navigator && navigator.vibrate) {
        navigator.vibrate(500);
      }
      event.target.classList.toggle("liked");
      let likeCountEle = event.target.nextElementSibling;
      let count = parseInt(likeCountEle.textContent);
      if(art.liked) {
        count = count >= 1 ? count-1 : 0;
        this.unlikePhoto(art)
      } else {
        count++;
        this.likePhoto(art)
      }
      likeCountEle.innerHTML = count.toString();
    },

    likePhoto(art) {
        axios.post('/art/like/' + art.id, '', {
          headers: authHeader()
        })
        .then(response=>{
            art.liked = true;
        })
        .catch(errors =>{
            if(errors.response.status === 401){
              this.$router.push('/login');
            }
        })
    },

    unlikePhoto(art) {
        axios.delete('/art/like/' + art.id, {
          headers: authHeader()
        })
        .then(response=>{
            art.liked = false;
        })
        .catch(errors =>{
            if(errors.response.status === 401){
              this.$router.push('/login');
            }
        })
    }

  }
}
</script>

<style scoped>
/* transition Group style */
.card button.like-button {
  text-align:center;
  width: auto;
  border: none;
  background: none;
  margin-bottom: 0;
  vertical-align: text-bottom;
}

.card button.like-button:focus {
  outline: none;
}

.card button.like-button.liked {
  color: #e62eac;
}
.card button.like-button {
  color: lightgray;
}

.like-button-wrapper {
  text-align: center;
}

.like-button-wrapper span {
  vertical-align: super;
    font-size: 12px;
}

.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.card img {
  z-index: 1;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

.card:hover img {
  filter: blur(2px);
}

.card:hover .overlay {
  opacity: 0.8;
}

.card-body {
  padding: 10px 5px 0 5px;
}

.card-body p {
  font-size: 12px;
  margin-bottom: 5px;
}

.card-body .card-item {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 15px;
  margin-bottom: 5px;
}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}


</style>
