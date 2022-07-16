export default {
  namespaced: true,
  state: {
    categories: [
      'people',
      'planets',
      'species',
      'starships',
      'vehicles',
    ],
    randomCategory: false,
    category: 'people',
  },
  mutations: {
    SET_CATEGORY(state, category) {
      this.commit('toast/TOGGLE_TOAST', `Game reset: new category is ${category}`)
      return state.category = category
    },
  },
  actions: {
    setCategory({ dispatch, commit }, category) {
      commit('SET_CATEGORY', category)
      dispatch('gameState/resetGame', '', { root: true })
    },
  }
}