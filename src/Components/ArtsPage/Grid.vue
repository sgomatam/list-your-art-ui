<template>
  <div class="grid">
    <div class="row pb-5 m-1">
      <div v-if="this.cards == 0" class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
        <h4 class="text-center">Sorry, there are currently no arts listed!</h4>
      </div>

      <Art :CardArray="slicedCards" />

      <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5">
        <button type="button" @click="incCardNumber" class="btn btn-outline-secondary btn-lg btn-block">More +</button>
      </div>
    </div>
  </div>
</template>

<script>
import Art from './Art.vue';
import {mapState} from "vuex";
import axios from "axios"

export default {
  name:'Grid',
  components: {
    Art
  },
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      cards: [],
      showCards: 8
    }
  },
  created(){
    this.cards = this.it

    /* TODO: Move this to VUEX */
    axios
      .get(this.API_HOST + '/api/art/all')
      .then(arts => this.cards = arts.data)
      .catch(error => {
        throw new Error(`API ${error}`);
      });
    /* End of TODO */
  },
  computed: {
    it(){
      return this.$store.state.arts.items
    },
    slicedCards(){
      return this.cards.slice(0, this.showCards)
    }
  },
  methods: {
    incCardNumber() {
      return this.showCards += 4
    }
  },
  }
</script>

<style scoped>
.container.grid {
  min-height: 60rem;
}

.container.grid a {
  cursor: pointer !important;
}

.btn-light {
  color: black !important;
  background: white;
  border-radius: 0 !important;
  border: 1px solid grey !important;
}
.dropdown-menu{
  background-color: #eee;
  color: #2c3539;
}

.dropdown-menu > a:hover{
  background-color: #dae0e5

}

.btn-outline-secondary {
  border-radius: 0 !important;
}

/*search options*/

.card-selector {
  color: #DCDCDC;
  height: 40rem;
  background: #2c3539 !important;
  box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 26px 70px 0 rgba(0, 0, 0, 0.69);
}

.search-title h6 {
  cursor: pointer;
}

.circle {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  border: 0.7px solid #2c3539;
  display: inline-block;
  margin-left: 6px;
  cursor:pointer
}
</style>
