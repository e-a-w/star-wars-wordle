import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBackspace,
  faCog,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBackspace,
  faQuestionCircle,
  faCog,
  faChartBar,
  faWindowClose
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
