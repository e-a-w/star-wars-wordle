import Vue from 'vue'
import store from './store'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBackspace,
  faCog,
  faChartBar,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBackspace,
  faQuestionCircle,
  faCog,
  faChartBar,
  faWindowClose,
  faShareAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
