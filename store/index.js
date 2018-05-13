import Vuex from 'vuex';
// import actions from './actions';
// import mutations from './mutations';
// import getters from './getters';
import i18n from './i18n';
import loop from './loop';
import series from './series';
import episode from './episode';
import search from './search';
import navbar from './navbar';
import auth from './auth';

const createStore = () => new Vuex.Store({
  state: () => ({
    // currentLocale: 'en',
  }),
  modules: {
    loop,
    series,
    episode,
    search,
    i18n,
    navbar,
    auth,
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      // console.log('nuxtServerInit');
      commit('SET_USER', 'testtest');
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser);
      }
    },
  },
});

export default createStore;
