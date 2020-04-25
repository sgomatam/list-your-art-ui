import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue');
const Arts = () => import('@/views/Arts.vue');
const Login = () => import('@/views/Login.vue');
const SignUp = () => import('@/views/SignUp.vue');
const Contact = () => import('@/views/Contact.vue');
const Info = () => import('@/views/Info.vue');
const Profile = () => import('@/views/Profile.vue');
const List = () => import('@/views/List.vue');

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
      name: 'Sign Up',
      component: SignUp 
    },
    { 
      path: '/profile',
      name: 'Profile',
      component: Profile 
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
      path: '/art/list',
      name: 'Listing',
      component: List
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ],
  mode: 'history'
})
