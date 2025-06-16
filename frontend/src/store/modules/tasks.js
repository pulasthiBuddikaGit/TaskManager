// store/modules/tasks.js
import axios from 'axios'

const state = () => ({
  tasks: [],
  loading: false
})

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setLoading(state, value) {
    state.loading = value
  }
}

const actions = {
  async fetchTasks({ commit, rootGetters }) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      commit('setTasks', res.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      commit('setLoading', false)
    }
  }
}

const getters = {
  tasks: state => state.tasks,
  loading: state => state.loading
}

export default { namespaced: true, state, mutations, actions, getters }
