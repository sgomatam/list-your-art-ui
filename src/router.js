import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue');
const Arts = () => import('@/views/Arts.vue');
const Login = () => import('@/views/Login.vue');
const SignUp = () => import('@/views/SignUp.vue');
const Contact = () => import('@/views/Contact.vue');
const Info = () => import('@/views/Info.vue');
const EditArt = () => import('@/views/EditArt.vue');
const Profile = () => import('@/views/Profile.vue');
const ArtListing = () => import('@/views/ArtListing.vue');
const UpdateProfile = () => import('@/views/UpdateProfile.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/arts',
      name: 'Arts',
      component: Arts
    },
    { 
      path: '/login',
      name: 'Log In',
      component: Login
    },
    { 
      path: '/signup',
      name: 'SignUp',
      component: SignUp 
    },
    { 
      path: '/profile',
      name: 'Profile',
      component: Profile 
    },
    { 
      path: '/profile/update',
      name: 'UpdateProfile',
      component: UpdateProfile 
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/info/:artId',
      name: 'Info',
      component: Info
    },
    {
      path: '/edit/:artId',
      name: 'EditArt',
      component: EditArt
    },
    {
      path: '/art/list',
      name: 'Art Listing',
      component: ArtListing
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ],
  mode: 'history'
})
