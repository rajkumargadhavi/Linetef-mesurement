import Vue from 'vue';
import VTooltip from 'v-tooltip';
import App from './App.vue';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

Vue.use(VTooltip);

new Vue({
  el: '#app',
  render: (h) => h(App),
});