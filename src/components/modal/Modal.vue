<template>
  <aside id="modal">
    <div id="modal-close-icon" class="close-icon">
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
    components: { Statistics, GuessChart, ModalFooter }
  }
</script>

<style scoped>
  #modal {
    display: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    height: 500px;
    width: 95vw;
    max-width: 500px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-between;
    text-align: center;
    background: white;
    border-radius: 5px;
    filter: drop-shadow(2px 2px 10px var(--light-gray));
  }

  #modal h3 {
    font-size: 20px;
  }

  #modal-close-icon {
    top: 5px;
    right: 10px;
  }
</style>
