import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      won: null,
      lost: null,
      over: false
    },
    stats: {
      maxStreak: 8,
      currentStreak: 2,
      lostGames: 21,
      guessDistribution: {
        1: 11,
        2: 22,
        3: 33,
        4: 44,
        5: 55,
        6: 66
      }
    },
    cover: {
      open: false,
      view: null,
    },
    modalOpen: false,
    word: 'queen',
    guessedWord: '',
    guesses: [
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','','']
    ],
    currentRow: 0,
    hardMode: false,
    contrastClass: 'normal',
    darkMode: false
  },
  getters: {
    guessCount(state) {
      return state.currentRow + 1
    },
    wonGames(state) {
      const gameScores = state.stats.guessDistribution
      let wonGames = 0

      for (let score in gameScores) {
        wonGames += gameScores[score]
      }

      return wonGames;
    },
    totalGames(state, getters) {
      return getters.wonGames + state.stats.lostGames
    },
    currentStreak(state) {
      return state.stats.currentStreak
    },
    maxStreak(state) {
      return state.stats.maxStreak
    },
    winPercent(state, getters) {
      return Math.round((getters.wonGames / getters.totalGames) * 100)
    }
  },
  mutations: {
    TOGGLE_CONTRAST(state) {
      return state.contrastClass = state.contrastClass === 'contrast' ? 'normal' : 'contrast'
    },
    TOGGLE_HARD_MODE(state) {
      return state.hardMode = !state.hardMode
    },
    TOGGLE_DARK_MODE(state) {
      return state.darkMode = !state.darkMode
    },
    TOGGLE_COVER(state, payload) {
      return state.cover = payload
    },
    TOGGLE_MODAL(state, payload) {
      return state.modalOpen = payload
    },
    GUESS_LETTER(state, payload) {
      if (payload.reset) {
        return state.guessedWord = ''
      }

      const letter = payload.letter
      const add = payload.add
      const newGuess = add ? state.guessedWord + letter : state.guessedWord.slice(0, -1)
      this.commit('UPDATE_GUESSES', newGuess)

      return state.guessedWord = newGuess
    },
    UPDATE_GUESSES(state, newWord) {
      const newGuess = newWord.split('')
      const letters = Array
                    .from({ ...newGuess, length: state.word.length })
                    .fill('', newGuess.length, state.word.length)
      const row = this.state.currentRow

      return state.guesses[row].splice(0, 6, ...letters)
    },
    NEW_ROW(state) {
      return state.currentRow++
    },
    FINAL_GUESS(state, word) {
      if (word === state.word) {
        this.commit('WIN_GAME')
        this.commit('UPDATE_STATS')
      } else {
        if (state.currentRow < 5) {
          this.commit('GUESS_LETTER', { reset: true })
          return this.commit('NEW_ROW', state.currentRow + 1)
        } else {
          this.commit('LOSE_GAME')
          this.commit('UPDATE_STATS')
        }
      }
    },
    WIN_GAME(state) {
      return state.game = {won: true, lost: false, over: true}
    },
    LOSE_GAME(state) {
      return state.game = {won: false, lost: true, over: true}
    },
    UPDATE_STATS(state) {
      if (state.gameWon) {
        state.stats.currentStreak++
        if (state.stats.currentStreak > state.stats.maxStreak) {
          state.stats.maxStreak++
        }
        state.stats.guessDistribution[this.getters.guessCount]++
      } else {
        state.stats.currentStreak = 0
        state.stats.lostGames++
      }

      return state.stats
    }
  },
  actions: {
  },
  modules: {
  }
})
