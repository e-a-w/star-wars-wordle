export default {
  namespaced: true,
  state: {
    categories: [
      {
        name: 'people',
        max: 83
      },
      {
        name: 'planets',
        max: 61
      },
      {
        name: 'species',
        max: 38
      },
      {
        name: 'vehicles',
        max: 40
      },
      {
        name: 'starships',
        max: 37
      }
    ],
    randomCategory: false,
    category: 'people',
  },
  getters: {
    categoryNames(state) {
      return state.categories.map(c => c.name)
    },
    categoryMax(state) {
      return state.categories.find(c => c.name === state.category).max
    }
  },
  mutations: {
    SET_CATEGORY(state, category) {
      this.commit('toast/TOGGLE_TOAST', `Game reset: new category is ${category}`)
      return state.category = category
    },
  },
  actions: {
    setCategory({ commit }, category) {
      commit('SET_CATEGORY', category)
      this.dispatch('gameState/resetGame')
    }
  }
}