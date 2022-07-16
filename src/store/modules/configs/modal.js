export default {
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

      console.log(modal.actions, modal.mutations)

      if ((modal.actions || modal.mutations) && modal.confirmation) {
        const actions = modal.actions
        const mutations = modal.mutations

        for (const modalAction in actions) {
          const { action, value } = actions[modalAction]
          this.dispatch(action, value)
        }

        for (const modalMutation in mutations) {
          const { mutation, value } = mutations[modalMutation]
          this.commit(mutation, value)
        }

        return state.modalConfig = {
          open: !state.modalConfig.open,
          view: modal.view,
          actions: [],
          mutations: [],
          confirmation: null
        }
      } else {
        return state.modalConfig = {
          open: !state.modalConfig.open,
          view: modal.view,
          actions: modal.actions,
          mutations: modal.mutations,
          confirmation: modal.confirmation
        }
      }
    },
  }
}