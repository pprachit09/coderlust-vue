import Vue from 'vue'

const state = {
  tasks: {
    'ID1': {
      name: 'Learn Vue js',
      completed: false,
      dueDate: '2020-05-12',
      dueTime: '12:30'
    },
    'ID2': {
      name: 'Deploy Vue app',
      completed: false,
      dueDate: '2020-05-15',
      dueTime: '18:30'
    },
    'ID3': {
      name: 'Go to sleep',
      completed: false,
      dueDate: '2020-05-14',
      dueTime: '14:30'            
    }
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  }
}

const getters = {
  tasks: state => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
