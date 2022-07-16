<template>
  <section :class="gameOver && 'section-spacing'">
    <p> {{ gameCategory }} </p>
    <button v-if="gameOver" @click="resetGame">Play Again?</button>
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
      ...mapGetters('gameState', ['gameOver']),
      ...mapState('categories', ['category'])
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
  }

  button {
    padding: .25rem .5rem;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    background: var(--light-gray);
    color: black;
    border-color: transparent;
    border-radius: 5px;
    filter: drop-shadow(2px 2px 3px black);
    cursor: pointer;
    transition: opacity .2s ease-in;
  }

  button:hover, button:focus, button:active {
    opacity: .7;
  }
</style>