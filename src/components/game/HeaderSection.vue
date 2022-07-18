<template>
  <section :class="gameOver && 'section-spacing'">
    <p v-if="!hasErrors"> {{ gameCategory }} </p>
    <div v-if="hasErrors">
      <p v-for="(error, idx) of errors" :key="idx" class="error">
        {{ error }}
      </p>
    </div>
    <button
      v-if="gameOver || hasErrors"
      @click="resetGame"
      :class="{ dark: darkMode }"
    >
      {{ gameOver ? 'Play Again?' : 'Click to refresh' }}
    </button>
  </section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'HeaderSection',
    computed: {
      gameCategory() {
        if (this.category === 'people') {
          return 'characters'
        } else {
          return this.category;
        }
      },
      hasErrors() {
        return this.errors.length;
      },
      ...mapGetters('gameState', ['gameOver']),
      ...mapState('categories', ['category']),
      ...mapState('gameState', ['errors']),
      ...mapState('styleConfig', ['darkMode'])
    },
    methods: {
      resetGame() {
        this.$store.dispatch('gameState/resetGame')
      }
    }
  }
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .75rem;
  }

  p {
    font-size: 18px;
    font-weight: bold;
  }

  p.error {
    text-transform: lowercase;
    text-align: center;
  }

  button {
    padding: .25rem .5rem;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    background: var(--dark-bg);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity .2s ease-in;
  }

  button.dark {
    background: var(--light-gray);
    color: black;
  }

  button:hover, button:focus, button:active {
    opacity: .7;
  }
</style>