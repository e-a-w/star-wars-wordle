<template>
  <section id="guess-dist">
    <h3>Guess Distribution</h3>

    <div v-if="guessDistribution.length" id="guess-chart">
      <div  v-for="(val, idx) in guessDistribution" :key="idx" class="chart-row">
        <span class="chart-num">
          {{idx + 1}}
        </span>
        <span
          :class="[
            'chart-bar',
            darkMode && 'dark',
            val.current && 'current'
          ]"
          :style="{width: `${val.guessPercent}%`}"
        >
          {{val.timesGuessed}}
        </span>
      </div>
    </div>

    <div class="no-data-text" v-else>No Data</div>
  </section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'GuessChart',
    computed: {
      currentGuessCount() {
        return this.gameOver ? this.guessCount : 0
      },
      guessDistribution() {
        const dist = []
        const stats = this.stats.guessDistribution

        for (let guessNum in stats) {
          const current = Number(guessNum) === this.currentGuessCount

          dist.push({
            timesGuessed: stats[guessNum],
            guessPercent: Math.round((stats[guessNum] / this.wonGames) * 100),
            current: this.gameWon && current
          })
        }

        return dist
      },
      ...mapState('styleConfig', ['darkMode']),
      ...mapState('statistics', ['stats']),
      ...mapGetters('gameState', ['guessCount', 'gameOver', 'gameWon']),
      ...mapGetters('statistics', ['wonGames'])
    }
  }
</script>

<style scoped>
  #guess-chart {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  h3 {
    font-size: 20px;
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
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    color: white;
    background: var(--dark-gray);
  }

  .chart-bar.dark {
    background: var(--darker-gray);
  }

  .chart-bar.current:last-child {
    background: var(--green);
  }

  .chart-bar.current.contrast {
    background: var(--orange);
  }

  .no-data-text {
    text-transform: capitalize;
  }
</style>
