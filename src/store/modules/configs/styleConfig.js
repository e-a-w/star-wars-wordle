export default {
  namespaced: true,
  state: {
    contrastClass: 'normal',
    darkMode: false,
  },
  mutations: {
    TOGGLE_CONTRAST(state) {
      return state.contrastClass = state.contrastClass === 'contrast' ? 'normal' : 'contrast'
    },
    TOGGLE_DARK_MODE(state) {
      return state.darkMode = !state.darkMode
    },
  }
}