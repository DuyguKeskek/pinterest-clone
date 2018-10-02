import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { defaultClient as apolloClient} from './main'

import { 
  GET_CURRENT_USER, 
  GET_POSTS,
  ADD_POST,
  SIGNIN_USER, 
  SIGNUP_USER 
} from './queries' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null),
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    }
  },
  actions: {

    getPosts: ({ commit }) => {
      commit('setLoading', true)
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
      })
      .then(({ data }) => {
        commit('setLoading', false)
        // Get data from actions to state via mutations
        // commit passes data from actions along to mutation functions
        commit('setPosts', data.getPosts)
      })
      .catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },

    /* Auth Actions */
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient
        .query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', false)
        // Add user data to state
        commit('setUser', data.getCurrentUser)
        console.log(data.getCurrentUser)
      })
      .catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },

    signupUser: ({ commit }, payload) => {
      commit('clearError')
      // clear token to prevent errors (if malformed)
      localStorage.setItem('token', '')
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signupUser.token)
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          console.log(err)
        })
    },

    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            // First read the query you want to update
            const data = cache.readQuery({ query: GET_POSTS })
            // Create updated data
            data.getPosts.unshift(addPost) // Add to the beginning of the array
            // write updated data back to query
            console.log(data)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
          },
          // op.res. ensures data is added immediately as we specified for the update function
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1, // make sure it is added to the beginning of the array
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data.addPost)
        })
        .catch(err => {
          console.log(err)
        })
    },

    signinUser: ({ commit }, payload) => {
      commit('clearError')
      // clear token to prevent errors (if malformed)
      localStorage.setItem('token', '')
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token)
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          console.log(err)
        })
    },

    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser')
      // remove token in localStorage
      localStorage.setItem('token', '')
      // end session
      await apolloClient.resetStore()
      // redirect to home - kick users out of private pages
      router.push('/')
    }
  },

  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
