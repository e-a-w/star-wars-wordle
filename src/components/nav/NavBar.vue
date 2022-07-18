<template>
  <nav>
    <div class="nav-icon">
      <font-awesome-icon @click="openCover('howTo')" :icon="['far', 'question-circle']"></font-awesome-icon>
    </div>
    <h1><span>star wars</span> WORDLE</h1>
    <div class="right-icons">
      <div class="nav-icon">
        <font-awesome-icon @click="openModal" :icon="['fas', 'chart-bar']"></font-awesome-icon>
      </div>
      <div class="nav-icon">
        <font-awesome-icon @click="openCover('settings')" :icon="['fas', 'cog']"></font-awesome-icon>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'NavBar',
    methods: {
      openCover(view) {
        const payload = {
          view,
          open: !this.coverConfig.open
        }
        return this.$store.commit('cover/TOGGLE_COVER', payload)
      },
      openModal() {
        return this.$store.commit('modal/TOGGLE_MODAL')
      }
    },
    computed: {
      ...mapState('cover', ['coverConfig'])
    }
  }
</script>

<style scoped>
  nav {
    width: 95vw;
    max-width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid var(--light-gray);
  }

  nav h1 {
    letter-spacing: 3px;
    font-weight: 700;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  nav h1 span {
    font-size: 18px;
    font-style: italic;
    padding: .25rem 15px 0 0;
  }

  .nav-icon {
    color: var(--dark-gray);
    font-size: 20px;
    font-weight: 300;
    cursor: pointer
  }

  .right-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
</style>
