import axios from 'axios'

const state = {
  user: null,
  error: null,
  loading: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOADING(state, status) {
    state.loading = status
  }
}

const actions = {
  async register({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', payload)
      commit('SET_USER', response.data.user || null)
      // You can also handle token here if returned
    } catch (error) {
      if (error.response && error.response.data) {        //show error message from server or 'Registration failed'
        commit('SET_ERROR', error.response.data.message || 'Registration failed')
      } else {
        commit('SET_ERROR', 'Server error')
      }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
// This file defines the Vuex store module for authentication, handling user registration and state management.
// It includes state for user data, error messages, and loading status.
