<template>
  <div>
    <transition-group name="fade" class="row" tag="div">
      <div v-for="item in CardArray" class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 pb-3" :key="item.id">
          <div class="card">
            <img class="card-img-top" :src="API_HOST+item.artURL" alt="Card image cap">
            <div class="overlay">
              <router-link :to="'/Info/'+ item.id"><button type="button" class="btn btn-outline-secondary btn-lg" @click="scrollToTop()">Info</button></router-link>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.artName }}</h5>
              <p class="card-text">{{ item.authorName }}</p>
            </div>
          </div>
      </div>
    </transition-group>
  </div>

</template>

<script>
export default {
  props: ['CardArray'],
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST
    }
  },
  name: 'Art',
  methods: {
    scrollToTop() {
      // For Safari
      document.body.scrollTop = 0; 
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTop = 0; 
    }
  }
}
</script>

<style scoped>
/* transition Group style */
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
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.8;

}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover, .card:active {
  transform: scaleY(1.0) scaleX(1.00);
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>
