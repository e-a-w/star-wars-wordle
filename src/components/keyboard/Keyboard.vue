<template>
  <footer v-if="show">
    <section class="alpha-keys">
      <div v-for="(row, idx) in alphaRows" :key="idx" class="keyboard-row">
        <div
          v-for="key in row"
          :key="key"
          :class="[keyClass(key), darkMode && 'dark']"
          @click="handleClick(key)"
        >
          {{key === 'back' ? '' : key}}
          <font-awesome-icon  v-if="key === 'back'" :icon="['fas', 'backspace']"></font-awesome-icon>
        </div>
      </div>
    </section>
    <section class="num-keys">
      <div v-for="(row, idx) in numRows" :key="idx" class="keyboard-row">
        <div
          v-for="key in row"
          :key="key"
          :class="[keyClass(key), darkMode && 'dark']"
          @click="handleClick(key)"
        >
          {{key}}
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Keyboard',
    data() {
      return {
        alphaRows: [
          ['q','w','e','r','t','y','u','i','o','p'],
          ['a','s','d','f','g','h','j','k','l'],
          ['enter','z','x','c','v','b','n','m','back']
        ],
        numRows: [
          [7, 8, 9],
          [4, 5, 6],
          [0, 1, 2, 3],
        ]
      }
    },
    computed: {
      targetWordLength() {
        return this.word.length
      },
      show() {
        return !this.coverConfig.open
      },
      ...mapState(['currentRow', 'guessedWord', 'word', 'game']),
      ...mapState('cover', ['coverConfig']),
      ...mapState('styleConfig', ['darkMode'])
    },
    methods: {
      keyClass(key) {
        return [
            'keyboard-letter',
            {'double-key': ['enter', 'back'].includes(key)}
          ]
      },
      handleClick(key) {
        if (this.game.over) return;

        const addLetterPermitted = ['back', 'enter'].includes(key) || this.guessedWord.length < this.targetWordLength
        const removeLetterPermitted = key === 'back' && this.guessedWord.length <= this.targetWordLength
        const enterPermitted = key === 'enter' && this.guessedWord.length === this.targetWordLength

        if (!addLetterPermitted && !removeLetterPermitted) {
          return;
        } else if (enterPermitted) {
          // return this.$store.commit('FINAL_GUESS', this.guessedWord)
          this.$store.dispatch('finalGuess', this.guessedWord)
        } else if (key !== 'enter') {
          return this.guessLetter(key)
        } else if (!enterPermitted) {
          return this.$store.commit('toast/TOGGLE_TOAST', 'Not enough letters')
        }
      },
      guessLetter(key) {
        const payload = { letter: key, add: key !== 'back' }
        return this.$store.commit('GUESS_LETTER', payload)
      },
    }
  }
</script>

<style scoped>
  footer {
    width: 95vw;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: .25rem;
    padding-bottom: 1rem;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
  }

  .keyboard-letter {
    height: 35px;
    width: 25px;
    margin: 3px;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    background: var(--light-gray);
    border-radius: 4px;
    cursor: pointer;
  }

@media only screen and (min-width: 539px) {
  footer {
    flex-direction: row;
    gap: 1.5rem;
  }
}

@media only screen and (min-width: 643px) {
  footer {
    padding-bottom: 12px;
  }
  .keyboard-letter {
    height: 45px;
    width: 35px;
  }
}

@media only screen and (min-width: 756px) {
    footer {
      padding-bottom: 5px;
    }
    .keyboard-letter {
      padding: 0;
      height: 55px;
      width: 45px;
    }
  }

  .keyboard-letter.dark {
    background: var(--dark-gray);
  }

  .double-key {
    width: 70px;
  }

  .fa-backspace {
    font-size: 24px;
  }
</style>
