import axios from 'axios'

export default {
  namespaced: true,
  state: {
    word: '',
  },
  mutations: {
    SET_WORD(state, word) {
      return state.word = word;
    },
    SET_VALID_WORD() {
      // NOT IMPLEMENTED YET
    }
  },
  actions: {
    async fetchWord({ commit }) {
      // PEOPLE 1 - 83
      // PLANETS 1 - 61
      // SPECIES 1- 38
      // VEHICLES 1 - 40
      // STARSHIPS 1 - 37
      // TOTAL: 259
      try {
        // const { data } = await axios.get(`https://swapi.dev/api/${state.category}/2`);
        // remove all whitespace
        // const word = data?.name?.toLowerCase().trim()
        const word = 'abc'

        commit('SET_WORD', word);
        this.commit('guesses/SET_GUESSES_ARRAY', word)
      } catch (error) {
        this.commit('toast/TOGGLE_TOAST', 'ERROR')
      }
    },
    async checkWord({ commit, state }) {
      try {
        const { data } = await axios.get(`https://swapi.dev/api/${state.category}/?search=${state.guessedWord}`);

        return data?.results.length > 0
      } catch (error) {
        commit('SET_VALID_WORD', false)
      }
    },
  }
}