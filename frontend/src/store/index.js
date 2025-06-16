import { createStore } from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import categories from './modules/categories'

export default createStore({
  modules: {
    auth,
    tasks,
    categories
  }
})
// This file sets up the Vuex store for state management in your Vue.js application.
