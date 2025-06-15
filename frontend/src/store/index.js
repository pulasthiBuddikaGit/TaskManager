import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
  modules: {
    auth
  }
})
// This file sets up the Vuex store for state management in your Vue.js application.
