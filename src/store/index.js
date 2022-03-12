import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import modal from './modules/configs/modal'
import cover from './modules/configs/cover'
import toast from './modules/configs/toast'
import styleConfig from './modules/configs/styleConfig'
import statistics from './modules/gameplay/statistics'
import hardMode from './modules/gameplay/hardMode'

Vue.use(Vuex)

export default new Vuex.Store({
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
    categories: [
      'people',
      'planets',
      'species',
      'starships',
      'vehicles',
    ],
    randomCategory: false,
    category: 'people',
    word: '',
    guesses: [],
    guessedWord: '',
    currentRow: 0
  },
  getters: {
    guessCount(state) {
      return state.currentRow + 1
    },
  },
  mutations: {
    SET_CATEGORY(state, category) {
      this.commit('toast/TOGGLE_TOAST', `Game reset: new category is ${category}`)
      return state.category = category
    },
    GUESS_LETTER(state, payload) {
      if (payload.reset) {
        return state.guessedWord = ''
      }

      const letter = payload.letter
      const add = payload.add
      const nextIdx = state.guessedWord.length + 1
      const nextLetter = state.word[nextIdx]
      let newGuess;

      if (add) {
        if (!nextLetter || nextLetter.match(/([a-zA-Z0-9])/g)) {
          newGuess = state.guessedWord + letter
        } else {
          newGuess = state.guessedWord + letter + nextLetter 
        }
      } else {
        newGuess = state.guessedWord.slice(0, -1)
      }
      
      this.commit('UPDATE_GUESSES', newGuess)
      return state.guessedWord = newGuess
    },
    UPDATE_GUESSES(state, newWord) {
      const row = this.state.currentRow
      const newGuessRow = state.guesses[row].map((letter, i) => {
        const notGuessed = letter === '' && !newWord[i]
        const alreadyGuessed = letter === newWord[i]
        const specialChars = letter && !letter.match(/([a-zA-Z0-9])/g)

        if (notGuessed || alreadyGuessed || specialChars ) {
          return letter
        } else {
          return newWord[i]
        }
      })

      return state.guesses.splice(row, 1, newGuessRow)
    },
    NEW_ROW(state) {
      return state.currentRow++
    },
    WIN_GAME(state) {
      this.commit('toast/TOGGLE_TOAST', state.winMessages[state.currentRow])
      return state.game = {won: true, lost: false, over: true}
    },
    LOSE_GAME(state) {
      this.commit('toast/TOGGLE_TOAST', state.word.toUpperCase())
      return state.game = {won: false, lost: true, over: true}
    },
    SET_WORD(state, word) {
      return state.word = word;
    },
    SET_GUESSES_ARRAY(state, word) {
      const wordRow = Array.from(word).map(letter => {
        return letter.match(/([a-zA-Z0-9])/g) ? '' : letter
      })
      let guesses = []

      for (let i = 0; i < 6; i++) {
        guesses.push(wordRow)
      }

      return state.guesses = guesses
    },
    SET_DEFAULTS(state) {
      state.guesses = []
      state.guessedWord = ''
      state.currentRow = 0

      if (state.hardMode) {
        state.hardModeGuess = {
          prevGuess: [],
          currentGuess: []
        }
      }
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
        const word = 'c3-p0'

        commit('SET_WORD', word);
        commit('SET_GUESSES_ARRAY', word)
      } catch (error) {
        commit('toast/TOGGLE_TOAST', 'ERROR')
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
    async finalGuess({ commit, state }) {
      const mode = state.hardMode

    // async finalGuess({ commit, dispatch, state }) {
      if (state.guessedWord === state.word) {
        commit('WIN_GAME')
        return commit('statistics/UPDATE_STATS')
      } else {
        // try {
        //   const wordExists = await dispatch('checkWord')
        //   if (!wordExists) return commit('toast/TOGGLE_TOAST', 'Unknown word')
        // } catch (error) {
        //   commit('toast/TOGGLE_TOAST', 'ERROR')
        // }
        if (mode.hardModeOn) {
          console.log('if on...., start guess')
          commit('hardMode/UPDATE_HARD_MODE_GUESS', state.guessedWord)
          commit('hardMode/VALIDATE_HARD_MODE_GUESS')
        }

        if (!mode.hardModeOn || (mode.hardModeOn && mode.validHardModeGuess)) {
          commit('GUESS_LETTER', { reset: true })
          commit('hardMode/SET_VALID_HARD_MODE_GUESS', null)
        } else {
          return
        }
      }

      if (state.currentRow === 6) {
        commit('LOSE_GAME')
        commit('UPDATE_STATS')
      } else {
        console.log("WE HERE???", )
        commit('NEW_ROW', state.currentRow + 1)
      }
    },
    setCategory({ dispatch, commit }, category) {
      commit('SET_CATEGORY', category)
      dispatch('resetGame')
    },
    resetGame({ dispatch, commit }) {
      commit('SET_DEFAULTS')
      dispatch('fetchWord')
  }
  },
  modules: {
    modal,
    cover,
    toast,
    styleConfig,
    statistics,
    hardMode
  }
})
