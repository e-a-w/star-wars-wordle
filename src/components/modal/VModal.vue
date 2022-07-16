<template>
  <aside
    id="modal"
    v-if="modalConfig.open"
    :class="[darkMode && 'dark', modalConfig.view]"
  >
    <div @click="closeModal" class="close-icon">
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>

    <div class="modal-content" v-if="modalConfig.view === 'stats'">
      <ModalStatistics />
      <GuessChart />
      <ModalFooter />
    </div>

    <ModalConfirm class="modal-content" v-if="modalConfig.view === 'confirmation'" />
  </aside>
</template>

<script>
  import ModalStatistics from './ModalStatistics.vue'
  import GuessChart from './GuessChart.vue'
  import ModalFooter from './ModalFooter.vue'
  import ModalConfirm from './ModalConfirm.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'VModal',
    components: {
    ModalStatistics,
    GuessChart,
    ModalFooter,
    ModalConfirm
},
    methods: {
      closeModal() {
        this.$store.commit('modal/TOGGLE_MODAL')
      }
    },
    computed: {
      ...mapState('styleConfig', ['darkMode']),
      ...mapState('modal', ['modalConfig'])
    }
  }
</script>

<style scoped>
  #modal {
    position: fixed;
    z-index: 11;
    transform: translateY(-60%);
    width: 95vw;
    max-width: 500px;
    padding: 30px 0;
    gap: 30px;
    text-align: center;
    background: white;
    border-radius: 5px;
    filter: drop-shadow(2px 2px 10px var(--light-gray));
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  #modal.stats {
    top: 50vh;
  }

  #modal.confirmation {
    top: 20vh;
  }

  #modal.dark {
    background: var(--dark-bg);
    border: 1px solid var(--dark-gray);
    filter: none;
  }

  section {
    width: 80%;
  }

  .close-icon {
    position: absolute;
    top: 5px;
    right: 10px;
    color: var(--dark-gray);
    cursor: pointer;
  }

  .dark .close-icon {
    color: white;
  }
</style>
