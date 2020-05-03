import { LocalStorage } from 'quasar'

const state = {
  settings: {
    show12hourTimeFormat: false,
    showTaskInOneList: false
  }
}

const mutations = {
  setShow12hourTimeFormat(state, value) {
    state.settings.show12hourTimeFormat = value
  },
  setShowTaskInOneList(state, value) {
    state.settings.showTaskInOneList = value
  },
  setSettings(state, value) {
    Object.assign(state.settings, value)
  }
}

const actions = {
  setShow12hourTimeFormat({commit, dispatch}, value) {
    commit('setShow12hourTimeFormat', value)
    dispatch('saveSettings')
  },
  setShowTaskInOneList({commit, dispatch}, value) {
    commit('setShowTaskInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({commit}) {
    const settings = LocalStorage.getItem('settings')
    if(settings) {
      commit('setSettings', settings)
    }
  }
}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
