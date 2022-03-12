export default {
  namespaced: true,
  state: {
    toastConfig: {
      message: '',
      show: false
    }
  },
  mutations: {
    TOGGLE_TOAST(state, message = '') {
      const toast = {
        show: !state.toastConfig.show,
        message
      }

      return state.toastConfig = toast
    },
  }
}