<template>
  <section id="guess-dist">
    <h3>Guess Distribution</h3>

    <div id="guess-chart">
      <div class="chart-row">
        <span class="chart-num">
          1
        </span>
        <span class="chart-bar">
          0
        </span>
      </div>
      <div class="chart-row">
        <span class="chart-num">
          2
        </span>
        <span class="chart-bar">
          0
        </span>
      </div>
      <div class="chart-row">
        <span class="chart-num">
          3
        </span>
        <span class="chart-bar">
          0
        </span>
      </div>
      <div class="chart-row">
        <span class="chart-num">
          4
        </span>
        <span class="chart-bar">
          3
        </span>
      </div>
      <div class="chart-row">
        <span class="chart-num">
          5
        </span>
        <span class="chart-bar">
          1
        </span>
      </div>
      <div class="chart-row">
        <span class="chart-num">
          6
        </span>
        <span class="chart-bar">
          0
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'GuessChart'
  }
</script>

<style scoped>
  #guess-chart {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .chart-row {
    width: 100%;
    height: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 3px 0 0;
    font-size: 14px;
  }

  .chart-num {
    margin-right: 5px;
  }

  .chart-bar {
    width: 60%;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    color: white;
    background: var(--dark-gray);
  }
</style>
