<template>
    <div v-if="modalConfig.open" @click="closeModal" id="modal-backdrop" :class="darkMode && 'dark'"></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ModalBackdrop',
    methods: {
      closeModal() {
        this.$store.commit('modal/TOGGLE_MODAL')
      }
    },
    computed: {
      ...mapState(['darkMode']),
      ...mapState('modal', ['modalConfig'])
    },
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
