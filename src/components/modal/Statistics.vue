<template>
   <section id="statistics">
    <h3>Statistics</h3>

    <div id="stat-boxes">
      <div class="stat">
        <span class="stat-num">
          3
        </span>
        <span class="stat-name">
          Played
        </span>
      </div>

      <div class="stat">
        <span class="stat-num">
          100
        </span>
        <span class="stat-name">
          Win %
        </span>
      </div>

      <div class="stat">
        <span class="stat-num">
          3
        </span>
        <span class="stat-name">
          Current Streak
        </span>
      </div>
      <div class="stat">
        <span class="stat-num">
          3
        </span>
        <span class="stat-name">
          Max Streak
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Statistics'
  }
</script>

<style scoped>
  #stat-boxes {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    width: 50px;
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
