<template>
  <aside
    id="modal"
    v-if="modalConfig.open"
    :class="[darkMode && 'dark', modalConfig.view]"
  >
    <div @click="closeModal" class="close-icon">
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>

    <div v-if="modalConfig.view === 'stats'">
      <Statistics />
      <GuessChart />
      <ModalFooter />
    </div>

    <Confirmation v-if="modalConfig.view === 'confirmation'" />
  </aside>
</template>

<script>
  import Statistics from './Statistics.vue'
  import GuessChart from './GuessChart.vue'
  import ModalFooter from './ModalFooter.vue'
  import Confirmation from './Confirmation.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'Modal',
    components: {
      Statistics,
      GuessChart,
      ModalFooter,
      Confirmation
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
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
    text-align: center;
    background: white;
    border-radius: 5px;
    filter: drop-shadow(2px 2px 10px var(--light-gray));
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
