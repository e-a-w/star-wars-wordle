<template>
  <main>
    <section v-for="(row, rowIdx) in guesses" :key="rowIdx" class="row">
      <div
        v-for="(letter, idx) in row"
        :class="['letter', letterColor(letter, idx, rowIdx), contrastClass, darkMode && 'dark']"
        :key="idx"
      >
        {{letter}}
      </div>
     </section>
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Game',
    computed: {
      ...mapState(['guesses', 'word', 'currentRow', 'game', 'contrastClass', 'darkMode'])
    },
    methods: {
      letterColor(letter, idx, row) {
        const waitingToGuess = (letter === '' || row >= this.currentRow) && !this.game.over
        const unguessedLetters = this.game.over && row > this.currentRow

        if (waitingToGuess || unguessedLetters) {
          return
        }

        if (this.word[idx] === letter) {
          return 'success-letter'
        } else if (this.word.includes(letter)) {
          return 'wrong-position-letter'
        } else {
          return 'wrong-letter'
        }
      }
    }
  }
</script>

<style scoped>
  main {
    position: relative;
  }

  .row {
    width: 95vw;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }

  .letter {
    margin: 3px;
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border: 2px solid var(--light-gray);
  }

  .letter.dark {
    border: 2px solid var(--dark-gray);
  }
</style>
