import axios from 'axios'

export default {
  namespaced: true,
  state: {
    word: '',
    wordId: null,
    previousWords: {}
  },
  mutations: {
    SET_WORD(state, wordData) {
      state.word = wordData.word
      state.wordId = wordData.wordId
      state.previousWords[state.wordId] = state.word
    },
    SET_VALID_WORD() {
      // NOT IMPLEMENTED YET
    },
  },
  actions: {
      // eslint-disable-next-line
    async fetchWord({ commit, rootState, rootGetters }) {
      this.commit('gameState/TOGGLE_LOADING', true)

      // eslint-disable-next-line
      const category = rootState.categories.category
      const categoryMax = rootGetters['categories/categoryMax']
      const categoryId = Math.ceil(Math.random() * categoryMax)

      try {
        const { data } = await axios.get(`https://swapi.dev/api/${category}/${categoryId}`)
        // // remove all whitespace
        const word = data?.name?.toLowerCase().trim().replace('é', 'e')
        
        // // const word = 'dormé'.replace('é', 'e')
        
        commit('SET_WORD', { word: word, wordId: categoryId });
        this.commit('guesses/SET_GUESSES_ARRAY', word)
        this.commit('gameState/SET_ERRORS', [])
      } catch (error) {
        const genericError = 'Error fetching word; please try again.'
        const flakyError = 'This category is very flaky; it may take a few tries to work.'
        const errors = ['vehicles', 'starships'].includes(category) ? [genericError, flakyError] : [genericError]

        this.commit('toast/TOGGLE_TOAST', 'Error')
        this.commit('gameState/SET_ERRORS', errors)
      }
    },
    async checkWord({ commit, rootState }) {
      try {
        const { data } = await axios.get(`https://swapi.dev/api/${rootState.categories.category}/?search=${rootState.guesses.guessedWord}`);

        return data?.results.length > 0
      } catch (error) {
        commit('SET_VALID_WORD', false)
      }
    },
  }
}