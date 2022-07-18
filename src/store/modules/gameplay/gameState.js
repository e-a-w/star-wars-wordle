export default {
  namespaced: true,
  state: {
    errors: [],
    game: {
      won: null,
      lost: null,
      over: false,
      loading: true
    },
    winMessages: [
      'Genius', 'Magnificent',
      'Impressive', 'Splendid',
      'Great', 'Phew'
    ],
    currentRow: 0,
  },
  getters: {
    guessCount(state) {
      return state.currentRow + 1
    },
    gameWon(state) {
      return state.game.won
    },
    gameOver(state) {
      return state.game.over
    },
    gameLoading(state) {
      return state.game.loading
    }
  },
  mutations: {
    NEW_ROW(state) {
      return state.currentRow++
    },
    WIN_GAME(state) {
      this.commit('toast/TOGGLE_TOAST', state.winMessages[state.currentRow])
      return state.game = {won: true, lost: false, over: true}
    },
    LOSE_GAME(state) {
      this.commit('toast/TOGGLE_TOAST', this.state.targetWord.word.toUpperCase())
      return state.game = {won: false, lost: true, over: true}
    },
    SET_DEFAULTS(state) {
      this.state.guesses.guesses = []
      this.state.guesses.guessedWord = ''
      state.currentRow = 0

      if (this.state.hardMode.hardModeOn) {
        this.state.hardMode.hardModeGuess = {
          prevGuess: [],
          currentGuess: []
        }
      }
    },
    TOGGLE_LOADING(state, loading = null) {
      if (loading === null) {
        return state.game.loading = !state.game.loading
      } else {
        return state.game.loading = loading
      }
      
    },
    SET_ERRORS(state, errors) {
      if (!Array.isArray(errors)) throw Error('Errors must be an array');

      console.log('e:', errors)

      return state.errors = errors
    }
  },
  actions: {
    resetGame({ commit, state }) {
      commit('SET_DEFAULTS')
      this.dispatch('targetWord/fetchWord')
      state.game = { won: null, lost: null, over: false }
    }
  }
}