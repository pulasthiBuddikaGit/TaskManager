// store/modules/categories.js
import axios from 'axios'

const state = () => ({
  categories: [],
  loading: false // 🔴 ADD: Loading state for UI feedback
})

const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  // 🔴 ADD: Loading mutation
  setLoading(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async fetchCategories({ commit, rootGetters }) {
    const token = rootGetters['auth/token']
    const res = await axios.get('http://localhost:8000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('setCategories', res.data)
  },

  // 🔴 ADD: Create category action
  async createCategory({ commit, rootGetters }, categoryData) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.post('http://localhost:8000/api/categories', categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      // Response returns list of categories, so update the state with all categories
      commit('setCategories', res.data)
      return res.data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  // 🔴 ADD: Update category action
  async updateCategory({ commit, rootGetters }, { id, categoryData }) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.put(`http://localhost:8000/api/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      // Response returns list of categories, so update the state with all categories
      commit('setCategories', res.data)
      return res.data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  // 🔴 ADD: Delete category action
  async deleteCategory({ commit, rootGetters }, categoryId) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.delete(`http://localhost:8000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Response returns list of categories, so update the state with all categories
      commit('setCategories', res.data)
      return res.data
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  }
}

const getters = {
  categories: state => state.categories,
  loading: state => state.loading // 🔴 ADD: Loading getter
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
