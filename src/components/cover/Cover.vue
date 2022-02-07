<template>
  <aside id="cover">
    <div id="cover-close-icon" class="close-icon">
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>

    <HowTo />
    <Settings />
  </aside>
</template>

<script>
  import Settings from './Settings.vue'
  import HowTo from './HowTo.vue'

  export default {
    name: 'Cover',
    components: { HowTo, Settings }
  }
</script>

<style scoped>
  #cover {
    display: none;
    position: fixed;
    top: 10px;
    height: 100vh;
    width: 95vw;
    max-width: 500px;
    background: white;
  }

  #cover h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--dark-gray);
    cursor: pointer;
  }
</style>
