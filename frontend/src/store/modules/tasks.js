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
  },
  addTask(state, task) {
    // Only keep the fields we want to display
    const displayTask = {
      id: task.id,
      heading: task.heading,
      description: task.description,
      status: task.status,
      priority: task.priority,
      categoryId: task.categoryId
    }
    state.tasks.push(displayTask)
  },
  updateTask(state, updatedTask) {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
      // Only keep the fields we want to display
      const displayTask = {
        id: updatedTask.id,
        heading: updatedTask.heading,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        categoryId: updatedTask.categoryId
      }
      state.tasks.splice(index, 1, displayTask)
    }
  },
  removeTask(state, taskId) {
    state.tasks = state.tasks.filter(task => task.id !== taskId)
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
      // Filter to only display desired fields
      const displayTasks = res.data.map(task => ({
        id: task.id,
        heading: task.heading,
        description: task.description,
        status: task.status,
        priority: task.priority,
        categoryId: task.categoryId
      }))
      commit('setTasks', displayTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  async createTask({ commit, rootGetters }, taskData) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.post('http://localhost:8000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      commit('addTask', res.data)
      return res.data
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  async updateTask({ commit, rootGetters }, { id, taskData }) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      const res = await axios.put(`http://localhost:8000/api/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      commit('updateTask', res.data)
      return res.data
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  async deleteTask({ commit, rootGetters }, taskId) {
    commit('setLoading', true)
    try {
      const token = rootGetters['auth/token']
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      commit('removeTask', taskId)
      return true
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    } finally {
      commit('setLoading', false)
    }
  }
}

const getters = {
  tasks: state => state.tasks,
  loading: state => state.loading,
  getTaskById: state => id => state.tasks.find(task => task.id === id)
}

export default { namespaced: true, state, mutations, actions, getters }
