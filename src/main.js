import Vue from 'vue'
import Home from './components/Home.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {
    Home,
  },
	template: '<Home />'
})