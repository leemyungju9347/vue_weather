import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import vueMoment from 'moment';
// import moment from 'moment-timezone';
Vue.config.productionTip = false;
// Vue.use(vueMoment, {
//   moment
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
