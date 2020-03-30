import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infoPage:[],
    cartItems:[],
    items: [
      {
        id: 1,
        artName: "my first art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_5219.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 2,
        artName: "my 2nd art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_4442.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 3,
        artName: "my 3rd art",
        authorName: "Srikanth",
        artURL: "/api/file/FullSizeRender14.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 4,
        artName: "my 4th art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_4167.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 5,
        artName: "my 5th art",
        authorName: "Srikanth",
        artURL: "/api/file/FullSizeRender5.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 6,
        artName: "my 6th art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_4271.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 7,
        artName: "my 7th art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_4296.jpg",
        likes: 0,
        comments: 0
      },
      {
        id: 8,
        artName: "my 8th art",
        authorName: "Srikanth",
        artURL: "/api/file/IMG_5274_sRGB.jpg",
        likes: 0,
        comments: 0
      }
    ]
  },
  // plugins: [createPersistedState()],
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
  },
})
