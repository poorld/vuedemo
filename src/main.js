import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

import qs from 'qs'

Vue.prototype.$qs = qs


Vue.use(VueResource)

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
