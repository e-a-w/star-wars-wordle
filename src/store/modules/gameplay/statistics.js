export default {
  namespaced: true,
  state: {
    stats: {
      maxStreak: 2,
      currentStreak: 2,
      lostGames: 20,
      guessDistribution: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
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
    },
  },
  actions: {
    updateStats({ state, rootGetters } ) {
      if (rootGetters['gameState/gameWon']) {
        // increment currentStreak
        state.stats.currentStreak++

        // increment maxStreak if needed
        if (state.stats.currentStreak > state.stats.maxStreak) {
          state.stats.maxStreak++
        }

        // update guessDistribution && currentGuessNum
        const guessCount = rootGetters['gameState/guessCount']
        state.stats.guessDistribution[guessCount]++
      } else {
        state.stats.currentStreak = 0
        state.stats.lostGames++
      }

      return state.stats
    },
  }
}