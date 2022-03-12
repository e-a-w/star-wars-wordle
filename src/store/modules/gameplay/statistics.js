export default {
  namespaced: true,
  state: {
    stats: {
      maxStreak: 8,
      currentStreak: 2,
      lostGames: 21,
      guessDistribution: {
        1: 11,
        2: 22,
        3: 33,
        4: 44,
        5: 66,
        6: 66
      }
    },
  },
  getters: {
    wonGames(state) {
      const gameScores = state.stats.guessDistribution
      let wonGames = 0

      for (let score in gameScores) {
        wonGames += gameScores[score]
      }

      return wonGames;
    },
    totalGames(state, getters) {
      return getters.wonGames + state.stats.lostGames
    },
    currentStreak(state) {
      return state.stats.currentStreak
    },
    maxStreak(state) {
      return state.stats.maxStreak
    },
    winPercent(state, getters) {
      return Math.round((getters.wonGames / getters.totalGames) * 100)
    }
  },
  mutations: {
    UPDATE_STATS(state) {
      if (this.state.gameWon) {
        state.stats.currentStreak++
        if (state.stats.currentStreak > state.stats.maxStreak) {
          state.stats.maxStreak++
        }
        state.stats.guessDistribution[this.getters.guessCount]++
      } else {
        state.stats.currentStreak = 0
        state.stats.lostGames++
      }

      return state.stats
    },
  }
}