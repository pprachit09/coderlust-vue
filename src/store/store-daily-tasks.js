import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
	dailyTasks: {
	},
	search: '',
	sort: 'name',
	dailyTasksDownloaded: false
}

const mutations = {
	updateTask(state, payload) {
		Object.assign(state.dailyTasks[payload.id], payload.updates)
	},
	deleteTask(state, id) {
		Vue.delete(state.dailyTasks, id)
	},
	addTask(state, payload) {
		Vue.set(state.dailyTasks, payload.id, payload.task)
	},
	cleardailyTasks(state) {
		state.dailyTasks = {}
	},
	setSearch(state, value) {
		state.search = value
	},
	setSort(state, value) {
		state.sort = value
	},
	setdailyTasksDownloaded(state, value) {
		state.dailyTasksDownloaded = value
	}	
}

const actions = {
	updateTask({ dispatch }, payload) {
		dispatch('fbUpdateTask', payload)
	},
	deleteTask({ dispatch }, id) {
		dispatch('fbDeleteTask', id)
	},
	addTask({ dispatch }, task) {
		let taskId = uid()
		let payload = {
			id: taskId,
			task: task
		}
		dispatch('fbAddTask', payload)
	},
	setSearch({ commit }, value) {
		commit('setSearch', value)
	},
	setSort({ commit }, value) {
		commit('setSort', value)
	},

	fbReadData({ commit }) {
		let userId = firebaseAuth.currentUser.uid
		let userdailyTasks = firebaseDb.ref('dailyTasks/' + userId)

		// initial check for data
		userdailyTasks.once('value', snapshot => {
			commit('setdailyTasksDownloaded', true)
		}, error => {
			showErrorMessage(error.message)
			this.$router.replace('/auth')
		})

		// child added
		userdailyTasks.on('child_added', snapshot => {
			let task = snapshot.val()
			let payload = {
				id: snapshot.key,
				task: task
			}
			commit('addTask', payload)
		})

		// child changed
		userdailyTasks.on('child_changed', snapshot => {
			let task = snapshot.val()
			let payload = {
				id: snapshot.key,
				updates: task
			}
			commit('updateTask', payload)
		})

		// child removed
		userdailyTasks.on('child_removed', snapshot => {
			let taskId = snapshot.key
			commit('deleteTask', taskId)
		})
	},
	fbAddTask({}, payload) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('dailyTasks/' + userId + '/' + payload.id)
		taskRef.set(payload.task, error => {
			if (error) {
				showErrorMessage(error.message)
			}
			else {
				Notify.create('Task added!')
			}
		})
	},
	fbUpdateTask({}, payload) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('dailyTasks/' + userId + '/' + payload.id)
		taskRef.update(payload.updates, error => {
			if (error) {
				showErrorMessage(error.message)
			}
			else {
				let keys = Object.keys(payload.updates)
				if (!(keys.includes('completed') && keys.length == 1)) {
					Notify.create('Task updated!')
				} 
			}
		})
	},
	fbDeleteTask({}, taskId) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('dailyTasks/' + userId + '/' + taskId)
		taskRef.remove(error => {
			if (error) {
				showErrorMessage(error.message)
			}
			else {
				Notify.create('Task deleted!')
			}
		})
	}	
}

const getters = {
	dailyTasksSorted: (state) => {
		let dailyTasksSorted = {},
				keysOrdered = Object.keys(state.dailyTasks)

		keysOrdered.sort((a,b) => {
			let taskAProp = state.dailyTasks[a][state.sort].toLowerCase(),
					taskBProp = state.dailyTasks[b][state.sort].toLowerCase()

			if (taskAProp > taskBProp) return 1
			else if (taskAProp < taskBProp) return -1
			else return 0
		})

		keysOrdered.forEach((key) => {
			dailyTasksSorted[key] = state.dailyTasks[key]
		})

		return dailyTasksSorted
	},
	dailyTasksFiltered: (state, getters) => {
		let dailyTasksSorted = getters.dailyTasksSorted,
				dailyTasksFiltered = {}
		if (state.search) {
			Object.keys(dailyTasksSorted).forEach(function(key) {
				let task = dailyTasksSorted[key],
						taskNameLowerCase = task.name.toLowerCase(),
						searchLowerCase = state.search.toLowerCase()
				if (taskNameLowerCase.includes(searchLowerCase)) {
					dailyTasksFiltered[key] = task
				}
			})
			return dailyTasksFiltered		
		}
		return dailyTasksSorted
	},
	dailyTasksTodo: (state, getters) => {
		let dailyTasksFiltered = getters.dailyTasksFiltered
		let dailyTasks = {}
		Object.keys(dailyTasksFiltered).forEach(function(key) {
			let task = dailyTasksFiltered[key]
			dailyTasks[key] = task
		})
		return dailyTasks
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}