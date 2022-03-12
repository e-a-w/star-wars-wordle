<template>
  <div v-if="toastConfig.show" id="toast" :class="darkMode && 'dark'">
    {{toastConfig.message}}
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Toast',
    computed: {
      ...mapState('styleConfig', ['darkMode']),
      ...mapState('toast', ['toastConfig'])
    },
    watch: {
      toastConfig(val) {
        if (val.show) {
          setTimeout(() => this.$store.commit('toast/TOGGLE_TOAST'), 3000)
        }
      }
    }
  }
</script>

<style scoped>
  #toast {
    position: fixed;
    z-index: 20;
    top: 20%;
    right: 50%;
    transform: translateX(50%);
    padding: 10px;
    font-weight: 700;
    font-size: 18px;
    text-transform: none;
    background: var(--dark-bg);
    color: white;
    border-radius: 5px;
  }

  #toast.dark {
    background: white;
    color: black;
  }
</style>