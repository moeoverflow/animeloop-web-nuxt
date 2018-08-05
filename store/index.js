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
import profile from './profile';

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
    profile,
  },
  actions: {
    async nuxtServerInit({ commit }, {
      req, store, error, isServer,
    }) {
      if (req.session && req.session.authUser) {
        commit('SET_USERAUTH', req.session.authUser);
        const headers = isServer ? req.headers : null;
        try {
          await store.dispatch('fetchUserInfo', { headers });
        } catch (err) {
          error({ statusCode: 404, message: 'API returned Error', customMsg: err.message });
        }
      }
    },
  },
});

export default createStore;
