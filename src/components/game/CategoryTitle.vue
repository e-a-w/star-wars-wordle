<template>
  <p v-if="!gameLoading">
    {{ gameCategory }}
  </p>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'GameBoard',
    computed: {
      gameCategory() {
        if (this.category === 'people') {
          return 'characters'
        } else {
          return this.category;
        }
      },
      ...mapGetters('gameState', ['gameLoading']),
      ...mapState('categories', ['category'])
    }
  }
</script>

<style scoped>
  p {
    font-size: .8rem;
  }
</style>