<template>
  <div class="">
    
    <section class="candidates-profile-bg">
      <div class="bg-overlay"></div>
      <div class="edit"><router-link to="/profile/update" ><i class="material-icons md-light">edit</i></router-link></div>
      <div class="logout-user euser text-white-50 text-uppercase" @click.prevent="logOut">
        <i class="material-icons md-light">logout</i>
      </div>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6">
                  <div class="candidates-profile-details text-center">
                    <img v-if="currentUser.profilePic" :src="API_HOST+currentUser.profilePic" id="profile-img" class="profile-img-card rounded-circle mb-4"/>
                    <img v-else src="@/assets/profile.png" id="profile-img" class="profile-img-card rounded-circle mb-4" />
                  
                    <h4 class="text-white candidates-profile-name mb-2">{{currentUser.firstName}} {{currentUser.lastName}}</h4>
                    <p class="text-white-50 mb-2"><i class="mdi mdi-bank mr-2"></i>{{currentUser.tags[0]}}</p>
                  </div>
                  <div class="text-center"> 
                    <a class="social-icons facebook" :href="currentUser.facebookHandle" />
                    <a class="social-icons twitter" :href="currentUser.twitterHandle" />
                  </div>
              </div>
          </div>
      </div>
    </section>

    <div class="m-5 text-justify text-center">
      <router-link class="btn" to="/art/list">
        List an Art
      </router-link>
    </div>

    <section class=""> 
        <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <h3 class="text-dark text-center">About Me</h3>
              </div>
          </div>

          <div class="row">
              <div class="col-lg-12">
                  <div class="job-detail mt-2 p-4">
                      <div class="job-detail-desc">
                          <p class="text-muted f-14 mb-3">{{currentUser.bio}}</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST
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
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>

  .btn {
    flex: 1 1 auto;
    margin: 10px;
    padding: 20px 50px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    box-shadow: 0 0 20px #585858;
    border-radius: 10px;
  }
  .btn:hover {
    background-position: right center; 
  }
  .btn-gradient {
    background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
    font-weight: bold;
  }

  .candidates-profile-bg {
    border-radius: 10px;
    margin: 10px;
    padding: 50px 0 50px 0;
    background-size: cover;
    position: relative;
    background-position: center center;

    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, 
    rgba(138,50,78,1) 0%, rgba(114,78,109,1) 49%, 
    rgba(85,112,146,1) 100%, rgba(34,171,210,1) 100%, 
    rgba(15,194,235,1) 100%, rgba(94,114,119,1) 100%, 
    rgba(0,212,255,1) 100%);
  }

  .candidates-profile-details img {
    width: 50%;
    background: transparent;
  }

  .candidates-profile-details .candidates-profile-name {
    font-weight: 300;
  }

  .candidates-profile-icons .list-inline-item {
    margin: 0 1px !important;
  }

  .section {
      padding-bottom: 80px;
      padding-top: 80px;
      position: relative;
  }
  .logout-user {
    position: absolute;
    left: 20px;
    bottom: 15px;
    text-decoration: underline;
    cursor: pointer;
  }

  .logout-user i {
    background-color: #0c0000;
    border-radius: 50%;
    padding: 6px;
  }
  .edit {
    position: absolute;
    right: 20px;
    bottom: 15px;
  }

  .edit i {
    color: #888;
    background-color: #000;
    border-radius: 50%;
    padding: 6px;
  }

  .edit a {
    color: #000;
  }

  .fa-pencil:before {
    content: "\f040";
  }

  .social-icons {
    background-size: 30px;
    background-repeat: no-repeat;
    display: inline-block;
    height: 30px;
    width: 30px;
  }

  .facebook {
    margin-right: 3px;
    background-image: url(data:image/png;base64,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);
  }

  .twitter {
    margin-left: 3px;
    background-image: url(data:image/png;base64,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);
  }

</style>