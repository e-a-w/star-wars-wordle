export default {
  namespaced: true,
  state: {
    hardModeOn: false,
    hardModeGuess: {
      prevGuess: [],
      currentGuess: []
    },
    validHardModeGuess: null,
  },
  mutations: {
    TOGGLE_HARD_MODE(state) {
      return state.hardModeOn = !state.hardModeOn
    },
    UPDATE_HARD_MODE_GUESS(state, guessedWord) {
      const word = this.state.targetWord.word
      const prevGuess = state.hardModeGuess.currentGuess
      const currentGuess = guessedWord.split('').map((letter, idx) => {
        return {
          letter,
          required: word.split('').includes(letter),
          correctOrder: word[idx] === letter
        }
      })

      return state.hardModeGuess = { prevGuess, currentGuess }
    },
    VALIDATE_HARD_MODE_GUESS(state) {
      const word = this.state.targetWord.word
      const guessedWord = this.state.guessedWord
      let validGuess = true

      if (this.state.currentRow > 0) {
        const prevGuess = state.hardModeGuess.prevGuess

        // check order
        let firstWrongPosition = { letter: null, idx: null }
        state.hardModeGuess.currentGuess.forEach(({ required, letter }, idx) => {
          const previouslyCorrectOrder = prevGuess.some(prevLetter => {
            return prevLetter.letter === letter && prevLetter.correctOrder
          })
          const currentlyIncorrectOrder = previouslyCorrectOrder && letter !== word[idx]
          
          if (required && currentlyIncorrectOrder) {
            firstWrongPosition = { letter, idx: word.indexOf(letter) + 1 }
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
            return !guessedWord.includes(letter)
          })

          if (missingLetters.length > 0) {
            // if missing, display error & set invalid
            validGuess = false
            this.commit('toast/TOGGLE_TOAST', `Must contain ${[...new Set(missingLetters)].join(', ')}`)
          }
        }
      }

      return this.commit('hardMode/SET_VALID_HARD_MODE_GUESS', validGuess)
    },
    SET_VALID_HARD_MODE_GUESS(state, val) {
      return state.validHardModeGuess = val
    },
  }
}