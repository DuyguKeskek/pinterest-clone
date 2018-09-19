import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import store from './store'

import AddPost from './components/Posts/AddPost'
import Posts from './components/Posts/Posts'

import Profile from './components/Auth/Profile'
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'

import VueRouter from 'vue-router';

Vue.use(Router)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})

export default router

router.beforeEach ((to, from, next) => {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
      if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (!store.getters.user) {
              next({
                  path: '/signin'
              })
          } else {
              next()
          }
      } else {
          next() // make sure to always call next()!
      }
})