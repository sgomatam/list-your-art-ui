<template>
  <div id="app">
    <Header />
    <div id="content-wrap">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default{
  name: 'app',
  components: {
    Header, Footer
  },
  mounted() {
    this.$store.dispatch('arts/fetchArts');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo+2');

html,
    body {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      overflow-x: hidden;
    }

#app {
  background-color: #F8F8F8 !important;
  font-family: 'Exo 2', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;    /* Footer height */
}
</style>
