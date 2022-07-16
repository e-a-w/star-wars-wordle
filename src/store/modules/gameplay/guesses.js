export default {
  namespaced: true,
  state: {
    guesses: [],
    guessedWord: '',
    maxGuesses: 3
  },
  mutations: {
    GUESS_LETTER(state, payload) {
      if (payload.reset) {
        return state.guessedWord = ''
      }

      const letter = payload.letter
      const add = payload.add
      const nextIdx = state.guessedWord.length + 1
      const nextLetter = this.state.targetWord.word[nextIdx]
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

      this.commit('guesses/UPDATE_GUESSES', newGuess)
      return state.guessedWord = newGuess
    },
    UPDATE_GUESSES(state, newWord) {
      const row = this.state.gameState.currentRow
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
    SET_GUESSES_ARRAY(state, word) {
      const wordRow = Array.from(word).map(letter => {
        return letter.match(/([a-zA-Z0-9])/g) ? '' : letter
      })
      let guesses = []

      for (let i = 0; i < state.maxGuesses; i++) {
        guesses.push(wordRow)
      }

      return state.guesses = guesses
    },
  },
  actions: {
    // eslint-disable-next-line
    async finalGuess({ commit, state, dispatch, rootState }) {
      const mode = rootState.hardMode

      if (state.guessedWord === rootState.targetWord.word) {
        this.commit('gameState/WIN_GAME')
        return this.dispatch('statistics/updateStats')
      } else {
        // try {
        //   const wordExists = await dispatch('targetWord/checkWord', '', { root: true })
        //   if (!wordExists) return commit('toast/TOGGLE_TOAST', 'Unknown word', { root: true })
        // } catch (error) {
        //   commit('toast/TOGGLE_TOAST', 'ERROR')
        // }
        if (mode.hardModeOn) {
          this.commit('hardMode/UPDATE_HARD_MODE_GUESS', state.guessedWord)
          this.commit('hardMode/VALIDATE_HARD_MODE_GUESS')
        }

        if (!mode.hardModeOn || (mode.hardModeOn && mode.validHardModeGuess)) {
          commit('GUESS_LETTER', { reset: true })
          this.commit('hardMode/SET_VALID_HARD_MODE_GUESS', null)
        } else if (mode.hardModeOn && !mode.validHardModeGuess) {
          return
        }
      }

      if (this.state.gameState.currentRow + 1 === state.maxGuesses) {
        this.commit('gameState/LOSE_GAME')
        this.dispatch('statistics/updateStats')
      } else {
        this.commit('gameState/NEW_ROW', rootState.gameState.currentRow + 1)
      }
    },
  }
}