<template>
  <aside v-if="cover.open" id="cover" :class="darkMode && 'dark'">
    <div @click="closeCover" class="close-icon">
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
    components: { HowTo, Settings },
    methods: {
      closeCover() {
        return this.$store.commit('TOGGLE_COVER', !this.cover.open)
      }
    },
    computed: {
      cover() {
        return this.$store.state.cover
      },
      darkMode() {
        return this.$store.state.darkMode
      }
    }
  }
</script>

<style scoped>
  #cover {
    position: fixed;
    z-index: 10;
    top: 10px;
    height: 100vh;
    width: 95vw;
    max-width: 500px;
    background: white;
    transition: var(--dark-transition);
  }

  #cover.dark {
    background: var(--dark-bg);
  }

  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--dark-gray);
    cursor: pointer;
  }

  .dark .close-icon {
    color: white;
  }
</style>
