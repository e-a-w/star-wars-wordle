export default {
  namespaced: true,
  state: {
    coverConfig: {
      open: false,
      view: null,
    },
  },
  mutations: {
    TOGGLE_COVER(state, payload) {
      return state.coverConfig = payload
    },
  }
}