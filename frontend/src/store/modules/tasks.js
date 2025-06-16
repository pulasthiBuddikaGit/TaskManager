// store/modules/tasks.js
import axios from 'axios'

const state = () => ({
  tasks: []
})

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  }
}

const actions = {
  async fetchTasks({ commit, rootGetters }) {
    const token = rootGetters['auth/token']
    const res = await axios.get('http://localhost:8000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
    commit('setTasks', res.data)
  }
}

const getters = {
  tasks: state => state.tasks
}

export default { namespaced: true, state, mutations, actions, getters }
