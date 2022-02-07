<template>
  <nav>
    <div v-on:click="openCover" class="nav-icon">
      <font-awesome-icon :icon="['far', 'question-circle']"></font-awesome-icon>
    </div>
    <h1>WORDLE</h1>
    <div class="right-icons">
      <div class="nav-icon">
        <font-awesome-icon :icon="['fas', 'chart-bar']"></font-awesome-icon>
      </div>
      <div class="nav-icon">
        <font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    openCover: () => {
      console.log('open sesame')
    }
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
