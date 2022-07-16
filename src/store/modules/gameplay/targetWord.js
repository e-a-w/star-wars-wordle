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
    async fetchWord({ commit, rootState, rootGetters }) {
      // eslint-disable-next-line
      const category = rootState.categories.category
      const categoryId = rootGetters['categories/randomCategoryId']

      try {
        // const { data } = await axios.get(`https://swapi.dev/api/${category}/${categoryId}`)
        // remove all whitespace
        // const word = data?.name?.toLowerCase().trim().replace('é', 'e')

        const word = 'dormé'.replace('é', 'e')

        commit('SET_WORD', { word: word, wordId: categoryId });
        this.commit('guesses/SET_GUESSES_ARRAY', word)
      } catch (error) {
        this.commit('toast/TOGGLE_TOAST', 'ERROR')
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