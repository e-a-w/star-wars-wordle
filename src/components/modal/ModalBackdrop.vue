<template>
    <div v-if="modalOpen" @click="closeModal" id="modal-backdrop" :class="darkMode && 'dark'"></div>
</template>

<script>
  export default {
    name: 'ModalBackdrop',
    methods: {
      closeModal() {
        this.$store.commit('TOGGLE_MODAL', !this.modalOpen)
      }
    },
    computed: {
      modalOpen() {
        return this.$store.state.modalOpen
      },
      darkMode() {
        return this.$store.state.darkMode
      }
    }
  }
</script>

<style scoped>
  #modal-backdrop {
    z-index: 5;
    height: 100vh;
    width: 100vw;
    position: fixed;
    opacity: .3;
    background: white;
  }

  #modal-backdrop.dark {
    background: black;
  }
</style>
