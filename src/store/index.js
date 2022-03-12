import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import modal from './modules/configs/modal'
import cover from './modules/configs/cover'
import toast from './modules/configs/toast'
import styleConfig from './modules/configs/styleConfig'

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
    stats: {
      maxStreak: 8,
      currentStreak: 2,
      lostGames: 21,
      guessDistribution: {
        1: 11,
        2: 22,
        3: 33,
        4: 44,
        5: 66,
        6: 66
      }
    },
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
    hardMode: false,
    hardModeGuess: {
      prevGuess: [],
      currentGuess: []
    },
    validHardModeGuess: null,
    currentRow: 0
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
    TOGGLE_HARD_MODE(state) {
      return state.hardMode = !state.hardMode
    },
    SET_CATEGORY(state, category) {
      this.commit('toast/TOGGLE_TOAST', `Game reset: new category is ${category}`)
      return state.category = category
    },
    UPDATE_HARD_MODE_GUESS(state, guessedWord) {
      const prevGuess = state.hardModeGuess.currentGuess
      const currentGuess = guessedWord.split('').map((letter, idx) => {
        return {
          letter,
          required: state.word.split('').includes(letter),
          correctOrder: state.word[idx] === letter
        }
      })

      return state.hardModeGuess = { prevGuess, currentGuess }
    },
    VALIDATE_HARD_MODE_GUESS(state) {
      let validGuess = true;
      
      if (state.currentRow > 0) {
        const prevGuess = state.hardModeGuess.prevGuess

        // check order
        let firstWrongPosition = { letter: null, idx: null }
        state.hardModeGuess.currentGuess.forEach(({ required, letter }, idx) => {
          const previouslyCorrectOrder = prevGuess.some(prevLetter => {
            return prevLetter.letter === letter && prevLetter.correctOrder
          })
          const currentlyIncorrectOrder = previouslyCorrectOrder && letter !== state.word[idx]
          
          if (required && currentlyIncorrectOrder) {
            firstWrongPosition = { letter, idx: state.word.indexOf(letter) + 1 }
          }
        })

        if (firstWrongPosition.letter) {
          // if order is incorrect, then display error & set invalid
          validGuess = false
          this.commit('toast/TOGGLE_TOAST', `${firstWrongPosition.letter} must be in slot ${firstWrongPosition.idx}`)
        } else {
          // if order is correct, then check if any letters are missing
          const requiredLetters = prevGuess.filter(l => l.required).map(l => l.letter)
          const missingLetters = requiredLetters.filter(letter => {
            return !state.guessedWord.includes(letter)
          })

          if (missingLetters.length > 0) {
            // if missing, display error & set invalid
            validGuess = false
            this.commit('toast/TOGGLE_TOAST', `Must contain ${[...new Set(missingLetters)].join(', ')}`)
          }
        }
      }

      return this.commit('SET_VALID_HARD_MODE_GUESS', validGuess)
    },
    SET_VALID_HARD_MODE_GUESS(state, val) {
      return state.validHardModeGuess = val
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
    // async finalGuess({ commit, dispatch, state }) {
      if (state.guessedWord === state.word) {
        commit('WIN_GAME')
        return commit('UPDATE_STATS')
      } else {
        // try {
        //   const wordExists = await dispatch('checkWord')
        //   if (!wordExists) return commit('toast/TOGGLE_TOAST', 'Unknown word')
        // } catch (error) {
        //   commit('toast/TOGGLE_TOAST', 'ERROR')
        // }

        if (state.hardMode) {
          commit('UPDATE_HARD_MODE_GUESS', state.guessedWord)
          commit('VALIDATE_HARD_MODE_GUESS')
        }

        if (!state.hardMode || (state.hardMode && state.validHardModeGuess)) {
          commit('GUESS_LETTER', { reset: true })
          commit('SET_VALID_HARD_MODE_GUESS', null)
        }
      }

      if (state.currentRow === 6) {
        commit('LOSE_GAME')
        commit('UPDATE_STATS')
      } else {
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
    styleConfig
  }
})
