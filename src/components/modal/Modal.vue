<template>
  <aside id="modal" v-if="modalOpen" :class="darkMode && 'dark'">
    <div @click="closeModal" class="close-icon">
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>

    <Statistics />
    <GuessChart />
    <ModalFooter />
  </aside>
</template>

<script>
  import Statistics from './Statistics.vue'
  import GuessChart from './GuessChart.vue'
  import ModalFooter from './ModalFooter.vue'

  export default {
    name: 'Modal',
    components: { Statistics, GuessChart, ModalFooter },
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
  #modal {
    position: fixed;
    z-index: 11;
    top: 50%;
    transform: translateY(-50%);
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

  #modal.dark {
    background: var(--dark-bg);
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
