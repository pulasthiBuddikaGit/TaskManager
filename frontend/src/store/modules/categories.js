// store/modules/categories.js
import axios from 'axios'

const state = () => ({
  categories: []
})

const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  }
}

const actions = {
  async fetchCategories({ commit, rootGetters }) {
    const token = rootGetters['auth/token']
    const res = await axios.get('/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('setCategories', res.data)
  }
}

const getters = {
  categories: state => state.categories
}

export default { namespaced: true, state, mutations, actions, getters }
