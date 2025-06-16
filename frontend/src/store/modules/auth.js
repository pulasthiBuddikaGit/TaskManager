import axios from 'axios'

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  error: null,
  loading: false,
  isAuthenticated: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.isAuthenticated = !!user
  },
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
      // Set axios default header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  CLEAR_AUTH(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }
}

const actions = {
  // Register action (existing)
  async register({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', payload)
      commit('SET_USER', response.data.user || null)
      // Handle token if returned during registration
      if (response.data.token) {
        commit('SET_TOKEN', response.data.token)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        commit('SET_ERROR', error.response.data.message || 'Registration failed')
      } else {
        commit('SET_ERROR', 'Server error')
      }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Login action (new)
  async login({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', payload)

      // Store token and user data
      commit('SET_TOKEN', response.data.token)
      //user state is now filled with user data
      commit('SET_USER', response.data.user)
      console.log('user state:', state.user)

    } catch (error) {
      if (error.response && error.response.data) {
        commit('SET_ERROR', error.response.data.message || 'Login failed')
      } else {
        commit('SET_ERROR', 'Server error')
      }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Logout action (new)
  async logout({ commit }) {
    commit('SET_LOADING', true)

    try {
      await axios.post('http://127.0.0.1:8000/api/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      commit('CLEAR_AUTH')
      commit('SET_LOADING', false)
    }
  },

  // Get current user (new)
  async fetchUser({ commit }) {
    commit('SET_LOADING', true)

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user')
      commit('SET_USER', response.data)
    } catch (error) {
      commit('CLEAR_AUTH')
      commit('SET_ERROR', 'Failed to fetch user data')
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Initialize auth on app start (new)
  initializeAuth({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    if (token) {
      commit('SET_TOKEN', token)
      // Fetch user data to verify token is still valid
      dispatch('fetchUser')
    }
  }
}

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  loading: (state) => state.loading,
  error: (state) => state.error,
  isAuthenticated: (state) => state.isAuthenticated,
  isLoggedIn: (state) => !!state.token && !!state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

// This file defines the Vuex store module for authentication, handling user registration, login, logout and state management.
// It includes state for user data, token, error messages, loading status, and authentication status.
// Token is automatically stored in localStorage and added to axios headers for API requests.
