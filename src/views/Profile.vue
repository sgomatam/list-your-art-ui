<template>
  <div class="">
    
    <section class="candidates-profile-bg">
      <div class="bg-overlay"></div>

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
                    <a class="social-icons email" :href="'mailto:' + currentUser.email" />
                  </div>
              </div>
          </div>
      </div>

      <div class="edit"><router-link to="/profile/update" ><i class="material-icons md-light">edit</i></router-link></div>
      
      <div class="logout-user euser text-white-50 text-uppercase" @click.prevent="logOut">
        <i class="material-icons md-light">logout</i>
      </div>

      <div class="text-justify text-center list-art-btn">
        <router-link class="btn" to="/art/list">
          <i class="material-icons md-light">post_add</i>
        </router-link>
      </div>
    </section>

    <div class="m-4">
      <div class="col-lg-12 pt-4 pb-4">
          <h3 class="text-dark ">Biography</h3>
          <p class="text-muted f-14 mb-3">{{currentUser.bio}}</p>
      </div>

      <div class="col-lg-12  pt-4 pb-4">
          <h3 class="text-dark ">Related Categories</h3>
          <ul id="tags">
            <li v-for="tag in currentUser.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>
      </div>

      <div class="col-lg-12  pt-4 pb-4">
          <h3 class="text-dark ">Arts Collection</h3>
          <ul id="collection">
            <li v-for="tag in currentUser.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {authHeader} from '../utils/util'

export default {
  name: 'Profile',
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      artsCollection: {}
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    axios
      .get(this.API_HOST + '/api/art/artist/all', {
          headers: authHeader()
        })
      .then(response => {
        if (response) {
          this.artsCollection = response.data;
        }
      }).catch(err => {
        console.log(err);
        this.message = err.response.data.error;
      });
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

  .list-art-btn .btn {
    flex: 1 1 auto;
    margin: 10px;
    padding: 15px;
    width: 80px;
    height: 80px;
    text-transform: uppercase;
    border-radius: 50%;
    border: 4px solid #000;
  }

  .list-art-btn .btn i {
    font-size: 40px;
    color: #ccc;
  }
  
  #tags {
    padding: 0;
  }

  #tags li {
    display: inline-block;
    padding: 5px 5px;
    background-color: #ececec;
    margin: 5px;
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
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNjdweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY3IDY3OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjcgNjciIHdpZHRoPSI2N3B4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNMjguNzY1LDUwLjMyaDYuNzQ0VjMzLjk5OGg0LjQ5OWwwLjU5Ni01LjYyNGgtNS4wOTUgIGwwLjAwNy0yLjgxNmMwLTEuNDY2LDAuMTQtMi4yNTMsMi4yNDQtMi4yNTNoMi44MTJWMTcuNjhoLTQuNWMtNS40MDUsMC03LjMwNywyLjcyOS03LjMwNyw3LjMxN3YzLjM3N2gtMy4zNjl2NS42MjVoMy4zNjlWNTAuMzJ6ICAgTTMzLDY0QzE2LjQzMiw2NCwzLDUwLjU2OCwzLDM0QzMsMTcuNDMxLDE2LjQzMiw0LDMzLDRzMzAsMTMuNDMxLDMwLDMwQzYzLDUwLjU2OCw0OS41NjgsNjQsMzMsNjR6IiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDEwMTAxOyIvPjwvc3ZnPg==);
  }

  .twitter {
    margin-left: 3px;
    margin-right: 3px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDU2LjY5MyA1Ni42OTMiIGhlaWdodD0iNTYuNjkzcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1Ni42OTMgNTYuNjkzIiB3aWR0aD0iNTYuNjkzcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yOC4zNDgsNS4xNTdjLTEzLjYsMC0yNC42MjUsMTEuMDI3LTI0LjYyNSwyNC42MjVjMCwxMy42LDExLjAyNSwyNC42MjMsMjQuNjI1LDI0LjYyM2MxMy42LDAsMjQuNjIzLTExLjAyMywyNC42MjMtMjQuNjIzICBDNTIuOTcxLDE2LjE4NCw0MS45NDcsNS4xNTcsMjguMzQ4LDUuMTU3eiBNNDAuNzUyLDI0LjgxN2MwLjAxMywwLjI2NiwwLjAxOCwwLjUzMywwLjAxOCwwLjgwM2MwLDguMjAxLTYuMjQyLDE3LjY1Ni0xNy42NTYsMTcuNjU2ICBjLTMuNTA0LDAtNi43NjctMS4wMjctOS41MTMtMi43ODdjMC40ODYsMC4wNTcsMC45NzksMC4wODYsMS40OCwwLjA4NmMyLjkwOCwwLDUuNTg0LTAuOTkyLDcuNzA3LTIuNjU2ICBjLTIuNzE1LTAuMDUxLTUuMDA2LTEuODQ2LTUuNzk2LTQuMzExYzAuMzc4LDAuMDc0LDAuNzY3LDAuMTExLDEuMTY3LDAuMTExYzAuNTY2LDAsMS4xMTQtMC4wNzQsMS42MzUtMC4yMTcgIGMtMi44NC0wLjU3LTQuOTc5LTMuMDgtNC45NzktNi4wODRjMC0wLjAyNywwLTAuMDUzLDAuMDAxLTAuMDhjMC44MzYsMC40NjUsMS43OTMsMC43NDQsMi44MTEsMC43NzcgIGMtMS42NjYtMS4xMTUtMi43NjEtMy4wMTItMi43NjEtNS4xNjZjMC0xLjEzNywwLjMwNi0yLjIwNCwwLjg0LTMuMTJjMy4wNjEsMy43NTQsNy42MzQsNi4yMjUsMTIuNzkyLDYuNDgzICBjLTAuMTA2LTAuNDUzLTAuMTYxLTAuOTI4LTAuMTYxLTEuNDE0YzAtMy40MjYsMi43NzgtNi4yMDUsNi4yMDYtNi4yMDVjMS43ODUsMCwzLjM5NywwLjc1NCw0LjUyOSwxLjk1OSAgYzEuNDE0LTAuMjc3LDIuNzQyLTAuNzk1LDMuOTQxLTEuNTA2Yy0wLjQ2NSwxLjQ1LTEuNDQ4LDIuNjY2LTIuNzMsMy40MzNjMS4yNTctMC4xNSwyLjQ1My0wLjQ4NCwzLjU2NS0wLjk3NyAgQzQzLjAxOCwyMi44NDksNDEuOTY1LDIzLjk0Miw0MC43NTIsMjQuODE3eiIvPjwvc3ZnPg==);
  }

  .email {
    margin-left: 4px;
    height: 27px;
    width: 27px;
    background-size: 26px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MTIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICMwMDA7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yNTYuMDAwLDUxMi4wMDAgQzExNC42MTUsNTEyLjAwMCAwLjAwMCwzOTcuMzg1IDAuMDAwLDI1Ni4wMDAgQzAuMDAwLDExNC42MTUgMTE0LjYxNSwwLjAwMCAyNTYuMDAwLDAuMDAwIEMzOTcuMzg1LDAuMDAwIDUxMi4wMDAsMTE0LjYxNSA1MTIuMDAwLDI1Ni4wMDAgQzUxMi4wMDAsMzk3LjM4NSAzOTcuMzg1LDUxMi4wMDAgMjU2LjAwMCw1MTIuMDAwIFpNMTA4LjE1OSwzNDQuNDkzIEwxOTEuMzE5LDI2NS44MzEgTDEwOC4xNTksMTk3LjAwMiBMMTA4LjE1OSwzNDQuNDkzIFpNNDAzLjgzOSwxNDcuODM4IEwxMDguMTU5LDE0Ny44MzggTDEwOC4xNTksMTc3LjMzNyBMMjU1Ljk5OSwzMDUuMTYyIEw0MDMuODM5LDE3Ny4zMzcgTDQwMy44MzksMTQ3LjgzOCBaTTQwMy44MzksMTk3LjAwMiBMMzIwLjY3OSwyNjUuODMxIEw0MDMuODM5LDM0NC40OTMgTDQwMy44MzksMTk3LjAwMiBaTTMxMS40MzksMjc1LjY2MyBMMjU1Ljk5OSwzMjQuODI3IEwyMDAuNTU5LDI3NS42NjMgTDEwOC4xNTksMzY0LjE1OCBMNDAzLjgzOSwzNjQuMTU4IEwzMTEuNDM5LDI3NS42NjMgWiIvPjwvc3ZnPg==);
  }

</style>