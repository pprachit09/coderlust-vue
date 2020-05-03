import Vue from 'vue'
import { uid } from 'quasar'

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
  },
  search : '',
  sort: 'name'
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  },
  addTask({commit}, task) {
    const taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  }
}

const getters = {
  tasksTodo: (state, getters) => {
    const tasksFiltered = getters.searchTask
    const tasks = {}
    Object.keys(tasksFiltered).forEach(key => {
      const task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    const tasksFiltered = getters.searchTask
    const tasks = {}
    Object.keys(tasksFiltered).forEach(key => {
      const task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  searchTask: (state, getters) => {
    const taskSorted = getters.taskSorted
    const tasks = {}
    if (state.search) {
      Object.keys(taskSorted).forEach(key => {
        const task = taskSorted[key]
        const taskName = task.name.toLowerCase()
        const search = state.search.toLowerCase()
        if (taskName.includes(search)) {
          tasks[key] = task
        }
      })
      return tasks
    }
    return taskSorted
  },
  taskSorted: state => {
    const tasks = {}
    const keys = Object.keys(state.tasks)
    keys.sort((a,b) => {
      const taskAProp = state.tasks[a][state.sort].toLowerCase(),
            taskBProp = state.tasks[b][state.sort].toLowerCase()
      
      if(taskAProp > taskBProp) return 1
      else if(taskAProp < taskBProp) return -1
      else return 0
    })

    keys.forEach(key => {
      tasks[key] = state.tasks[key]
    })

    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
