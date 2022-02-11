<template>
  <footer>
    <section v-for="(row, idx) in rows" :key="idx" class="keyboard-row">
      <div
        v-for="key in row"
        :key="key"
        :class="[keyClass(key), darkMode && 'dark']"
        @click="handleClick(key, )"
      >
        {{key === 'back' ? '' : key}}
        <font-awesome-icon  v-if="key === 'back'" :icon="['fas', 'backspace']"></font-awesome-icon>
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
        rows: [
          ['q','w','e','r','t','y','u','i','o','p','a','s'],
          ['a','s','d','f','g','h','j','k','l'],
          ['enter','z','x','c','v','b','n','m','back']
        ]
      }
    },
    computed: {
      targetWordLength() {
        return this.word.length
      },
      ...mapState(['currentRow', 'guessedWord', 'word', 'game', 'darkMode'])
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
          return
        } else if (enterPermitted) {
          return this.$store.commit('FINAL_GUESS', this.guessedWord)
        } else if (key !== 'enter') {
          return this.guessLetter(key)
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
    max-width: 500px;
    display: flex;
    padding-bottom: 5px;
    flex-direction: column;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
  }

  .keyboard-letter {
    height: 55px;
    width: 45px;
    margin: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    background: var(--light-gray);
    border-radius: 4px;
    cursor: pointer;
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
