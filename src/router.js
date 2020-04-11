import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue');
const Arts = () => import('@/views/Arts.vue');
const Contact = () => import('@/views/Contact.vue');
const Info = () => import('@/views/Info.vue');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/arts',
      name: 'Arts',
      component: Arts
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
    }
  ],
  mode: 'history'
})
