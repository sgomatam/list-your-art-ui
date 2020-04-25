<template>
  <div class="">
    
    <section class="candidates-profile-bg">
      <div class="bg-overlay"></div>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6">
                  <div class="candidates-profile-details text-center">
                    <img
                      id="profile-img"
                      src="@/assets/profile.png"
                      class="profile-img-card img-fluid d-block mx-auto rounded-circle img-thumbnail mb-4"
                    />
                      <h4 class="text-white candidates-profile-name mb-2">{{currentUser.username}}</h4>
                      <p class="text-white-50 mb-2"><i class="mdi mdi-bank mr-2"></i>Graphic Artist</p>
                      <div class="logout-user euser text-white-50 text-uppercase" @click.prevent="logOut">
                        <a class="">Log Out</a>
                      </div>
                      
                  </div>
              </div>
          </div>
      </div>
    </section>

    <div class="section text-justify text-center">
      <router-link class="btn btn-gradient" to="/art/list">
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
                          <p class="text-muted f-14 mb-3">Aliquam erat volutpat Etiam vitae tortor Morbi vestibulum volutpat enim Aliquam nunc Nunc sed turpis sed mollis eros et ultrices tempus mauris ipsum aliquam libero non adipiscing dolor urna a orci Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos hymenaeos pellentesque dapibus hendrerit tortor Praesent egestas tristique nibh sed a libero cras us varius donec vitae orci sed dolor rutrum auctor fusce egestas elit eget lorem.</p>

                          <p class="text-muted f-14 mb-0">Libero venenatis faucibus ullam quis ante tiam sit amet orci eget eros faucibus tincidunt ed fringilla mauris sit amet nibh Donec sodales sagittis magna ed consequat leo eget bibendum sodales augue velit cursus nunc quis gravida magna mi libero usce vulputate eleifend sapien estibulum purus qua scelerisque ut mollis sed nonummy id metus ullam accumsan lorem Vivamus elementum semper enean vulputate eleifend tellus enean leo ligula porttitor.</p>
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
    padding: 30px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    box-shadow: 0 0 20px #eee;
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
    padding: 180px 0px 80px 0px;
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
    max-width: 130px;
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
    text-decoration: underline;
    cursor: pointer;
  }


</style>