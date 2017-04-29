// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueParticles from './vue-particles'
import VuePrism from 'vue-prism'
Vue.use(VueParticles, VuePrism)

// import 'milligram/dist/milligram.min.css'
import 'normalize.css/normalize.css'
// import 'bootstrap-grid-only/bootstrap.css'
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-okaidia.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
