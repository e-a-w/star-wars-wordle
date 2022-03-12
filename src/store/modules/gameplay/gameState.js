export default {
  namespaced: true,
  state: {
    game: {
      won: null,
      lost: null,
      over: false
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
      this.state.guesses = []
      this.state.guessedWord = ''
      state.currentRow = 0

      if (this.state.hardMode.hardModeOn) {
        this.state.hardMode.hardModeGuess = {
          prevGuess: [],
          currentGuess: []
        }
      }
    }
  },
  actions: {
    resetGame({ commit }) {
      commit('SET_DEFAULTS')
      this.dispatch('targetWord/fetchWord')
    }
  }
}