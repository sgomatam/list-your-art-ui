<template>
  <div>
    <div class="row mb-5">
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img class="img-fluid" :src="API_HOST+information.artURL">
      </div>
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
        <div class="info pt-xl-4 pt-lg-0 pt-5">
          <span class="float-left pr-3">★★★★★</span><h6 style="width:190px;">{{ information.likes }} reviews</h6>
          <h1 class="font-weight-bold text-uppercase pt-3">{{ information.artName }}</h1>
          <br>
          <!-- <button class="add-to-cart-button" @click="addtoCart(information, information.id)">ADD TO CART</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['information'],
  name: 'InfoBox',
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      quan: 1,
    }
  },
  methods:{
    inc() { // Info box Incrememnt button
      if (this.quan <= 8 )
       return this.quan ++
    },
    dec() { // Info box Decrememnt button
      if (this.quan >= 2)
       return this.quan --
    },
    addtoCart(it, id) { // Info box Add to cart button
      for (var i = 0; i < this.quan; i++) {
        this.$store.commit('arts/inCart', it, id)
      }
    },
  }
}

</script>

<style scoped>
.img-fluid{
  min-width: 90% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.control.number {
  border: 0.2px solid lightgrey;
  font-size: 19px;
  font-weight: bold;
  height: 35px;
  width: 155px;
  margin-bottom: 30px;
}
.control.number button{
  border:none;
  background: inherit;
  width: 56px;
  height: 35px;
  outline-style: none;
}
.control.number button:active{
  background-color: lightgrey;
}
.control.number h5 {
  margin-left: 13px;
  margin-right: 13px;
}
.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  background-color: #2c3539;
  color: #fff;
  font-size: 15px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.add-to-cart-button:hover, .add-to-cart-button:focus {
  background-color: inherit;
  color: black;
}

</style>
