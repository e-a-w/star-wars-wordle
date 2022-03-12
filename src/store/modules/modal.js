export const modal = {
  namespaced: true,
  state: {
    modalConfig: {
      open: false,
      view: 'stats',
      type: null,
      confirmation: null,
      value: null
    },
  },
  mutations: {
    TOGGLE_MODAL(state, modal = {}) {
      if (!modal.view) {
        modal.view = 'stats'
      }

      if (modal.action && modal.confirmation) {
        this.dispatch(modal.action, modal.value)

        return state.modalConfig = {
          open: !state.modalConfig.open,
          view: modal.view,
          action: null,
          confirmation: null,
          value: null
        }
      } else {
        return state.modalConfig = {
          open: !state.modalConfig.open,
          view: modal.view,
          action: modal.action,
          confirmation: modal.confirmation,
          value: modal.value
        }
      }
    },
  }
}