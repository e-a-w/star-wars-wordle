import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/configs/modal'
import cover from './modules/configs/cover'
import toast from './modules/configs/toast'
import styleConfig from './modules/configs/styleConfig'
import statistics from './modules/gameplay/statistics'
import hardMode from './modules/gameplay/hardMode'
import categories from './modules/gameplay/categories'
import targetWord from './modules/gameplay/targetWord'
import gameState from './modules/gameplay/gameState'
import guesses from './modules/gameplay/guesses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    cover,
    gameState,
    guesses,
    hardMode,
    modal,
    statistics,
    styleConfig,
    targetWord,
    toast,
  }
})
