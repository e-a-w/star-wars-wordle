<template>
   <section id="statistics">
    <h3>Statistics</h3>

    <div id="stat-boxes">
      <div v-for="stat in stats" :key="stat.name" class="stat">
        <span class="stat-num">
          {{stat.num}}
        </span>
        <span class="stat-name">
          {{stat.name}}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Statistics',
    computed: {
      stats() {
        return [
          {name: 'Played', num: this.totalGames},
          {name: 'Win %', num: this.winPercent},
          {name: 'Current Streak', num: this.currentStreak},
          {name: 'Max Streak', num: this.maxStreak}
        ]
      },
      ...mapGetters('statistics', ['totalGames','maxStreak', 'currentStreak', 'winPercent'])
    }
  }
</script>

<style scoped>
  h3 {
      font-size: 20px;
    }

  #stat-boxes {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    padding: 5px 10px 10px;
  }

  .stat-num {
    font-size: 40px;
  }

  .stat-name {
    font-size: 14px;
    text-transform: none;
    line-height: 1em;;
  }
</style>
