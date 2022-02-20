<template>
  <section id="guess-dist">
    <h3>Guess Distribution</h3>

    <div id="guess-chart">
      <div v-for="(val, idx) in guessDistribution" :key="idx" class="chart-row">
        <span class="chart-num">
          {{idx + 1}}
        </span>
        <span
          :class="[
            'chart-bar',
            darkMode && 'dark',
            val.highest && 'highest'
          ]"
          :style="{width: `${val.guessPercent}%`}"
        >
          {{val.timesGuessed}}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'GuessChart',
    computed: {
      guessDistribution() {
        const dist = []
        const stats = this.$store.state.stats.guessDistribution

        for (let guessNum in stats) {
          dist.push({
            timesGuessed: stats[guessNum],
            guessPercent: Math.round((stats[guessNum] / this.wonGames) * 100)
          })
        }

        const highest = Math.max(...dist.map(stat => stat.guessPercent))
        let found = false;

        dist.reverse().forEach(stat => {
          if(stat.guessPercent === highest & !found) {
            found = true
            return stat.highest = true
          }
        })

        return dist.reverse()
      },
      darkMode() {
        return this.$store.state.darkMode
      },
      ...mapGetters(['wonGames'])
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

  .chart-bar.highest:last-child {
    background: var(--green);
  }

  .chart-bar.highest.contrast {
    background: var(--orange);
  }
</style>
