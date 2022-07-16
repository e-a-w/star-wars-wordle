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
      },
      {
        name: 'random'
      }
    ],
    randomCategory: false,
    category: 'people',
  },
  getters: {
    categoryNames(state) {
      return state.categories.map(c => c.name)
    },
    randomCategoryId(state) {
      const categoryMax = state.categories.find(c => c.name === state.category).max

      return Math.ceil(Math.random() * categoryMax)
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