import Vue from 'vue';
import Vuex from 'vuex';
import actions from './modules/actions';
import getters from './modules/getters';
import state from './modules/state';
import mutations from './modules/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
