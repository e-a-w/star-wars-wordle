<template>
  <main>
    <section v-if="gameLoading || !word.length">
      <p class="loading-text">Preparing game board...</p>
      <atom-spinner
        :animation-duration="1000"
        :size="60"
        :color="contrastClass === 'contrast' ? 'rgb(235, 162, 27)' : 'rgb(90, 175, 90)'"
      />
    </section>
    <section class="game-section" v-else>
      <div v-for="(row, rowIdx) in guesses" :key="rowIdx" class="row">
        <div
          v-for="(letter, idx) in row"
          :class="[
            'letter',
            letterColor(letter, idx, rowIdx),
            letterType(idx),
            contrastClass,
            darkMode && 'dark'
          ]"
          :key="idx"
        >
          {{letter}}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { AtomSpinner } from 'epic-spinners'  

    export default {
    name: 'GameBoard',
    components: { AtomSpinner },
    computed: {
      ...mapState('guesses', ['guesses']),
      ...mapState('gameState', ['currentRow', 'game', 'loading']),
      ...mapState('targetWord', ['word']),
      ...mapState('styleConfig', ['contrastClass', 'darkMode']),
      ...mapGetters('gameState', ['gameLoading'])
    },
    methods: {
      letterType(idx) {
        return !this.word[idx]?.match(/([a-zA-Z0-9])/g) && 'misc-char'
      },
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
    },
    created() {
      setTimeout(() => this.$store.commit('gameState/TOGGLE_LOADING', false), 2000)
    },
  }
</script>

<style scoped>
  main {
    position: relative;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loading-text {
    margin-bottom: 1rem;
  }

  .row {
    width: 95vw;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }

  .letter {
    margin: 3px;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border: 2px solid var(--light-gray);
    user-select: none;
  }

  @media only screen and (min-width: 539px) {
    .letter {
      height: 60px;
      width: 60px;
    }
  }

  .letter.dark {
    border: 2px solid var(--dark-gray);
  }

  .letter.misc-char {
    color: black;
    border: none;
    background: none;
  }

  .letter.misc-char.dark {
    color: white;
  }
</style>
