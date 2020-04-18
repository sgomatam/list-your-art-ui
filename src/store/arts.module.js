import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = "http://listyourart-stage.us-east-2.elasticbeanstalk.com/api/";

export const arts = {
  namespaced: true,
  state: {
    infoPage:[],
    cartItems:[],
    items: []
  },
  actions: {
    fetchArts({commit}) {
      Vue.axios.get('getAllArts').then(arts => {
        commit('SAVE_ARTS', arts.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    }
  },
  getters: {
    itemsNumber(state){  // Cart Component
      return state.cartItems.length
    },
    totalPrice(state) { // Cart Component
      if (state.cartItems.length != 0){
       return state.cartItems.reduce((a, b) => {
         return (b.price == null ) ? a : a + b.price
       }, 0)
      }
    },
    infoLength(state) { // Info Component
      if(state.infoPage.length > 0) {
        return state.infoPage.splice(0, 1)
      }
    }
  },
  mutations: {
    SAVE_ARTS(state, items) {
      state.items = items;
    },
    inCart(state, n) { // Cart Component
      return state.cartItems.push(n)
    },
    outCart(state, n) { // Cart Component
      let index = state.cartItems.findIndex(x => x.id === n)
      return state.cartItems.splice(index, 1)
    },
    addtoInfo(state, n) { // Info Component
       return state.infoPage.push(n)
    }
  }
};
