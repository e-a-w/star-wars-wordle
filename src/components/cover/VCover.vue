<template>
  <aside v-if="coverConfig.open" id="cover" :class="darkMode && 'dark'">
    <div @click="closeCover" class="close-icon">
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>

    <HowTo />
    <SettingsView />
  </aside>
</template>

<script>
  import SettingsView from './SettingsView.vue'
  import HowTo from './HowTo.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'VCover',
    components: { HowTo, SettingsView },
    methods: {
      closeCover() {
        return this.$store.commit('cover/TOGGLE_COVER', !this.coverConfig.open)
      }
    },
    computed: {
      ...mapState('styleConfig', ['darkMode']),
      ...mapState('cover', ['coverConfig'])
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
