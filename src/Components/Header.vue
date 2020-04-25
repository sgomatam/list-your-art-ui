<template>
  <div class="container-flex header">

    <header>
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png">
      </router-link>
      <div class="top">
          <img src="@/assets/menu.png" aria-expanded="false">
      </div>

      <div class="user">
        <router-link to="/login">
          <img
            id="my-profile-img"
            src="@/assets/profile.png"
            class="profile-img-card"
          />
        </router-link>
      </div>
    </header>

    <nav class="menu">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/arts">Arts</router-link>
      <router-link class="nav-item" to="/contact">Contact us</router-link>
    </nav>

    <!--User Modal-->

  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  computed: {
    bagItemscount() {
      return this.$store.getters.itemsNumber
    }
  },
  methods: {
    openCart() {
      this.$refs.cartMove.cartON()
    }
  },
  created() {
    $(document).ready(function() {
      $("body").on('click', '.top', function(el) {
        $( this ).toggleClass("nav-open");
        $("nav.menu").toggleClass("menu_show");
      });
      $("body").on('click', 'a.nav-item', function() {
        $("nav.menu").toggleClass("menu_show");
      });
    });
  }
}
</script>

<style>

.header {
  position: sticky;
  top: 0;
  z-index: 999999;
}

img.logo{
    height: 50px;
    width: 200px;
}
header {
	height: 60px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
header > h1 {
	width: calc(100% - 160px);
	text-align: center;
	font-size: 20px;
	color: white;
}
header > .top {
	position: absolute;
	left: 20px;
}
header > .top a.menu_icon i {
	color: #000;
	font-size: 40px;
	padding-top: 5px;
	transition: .2s ease;
}
header > .top a.menu_icon:hover i {
	color: #fff;
}
nav.menu {
	width: 300px;
	min-height: 100vh;
	background-color: #3d3d51;
	position: absolute;
	left: -300px;
	transition: .3s all;
}
nav.menu > a {
    display: block;
    padding: 5px;
    margin: 20px 0 0px 20px;
    color: #ccc;
    text-transform: uppercase;
    font-weight: bold;
}

.menu_show {
	left: 0!important;
}

.user img {
  width: 30px;
  height: 30px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.user:hover {
  text-decoration: underline;
}

.user {
  display: inline-block;
  top: 15px;
  right: 15px;
  position: absolute;
}


</style>
