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
import api from './api';

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
    api,
  },
  actions: {
    async nuxtServerInit({ commit }, {
      req, store, error,
    }) {
      if (req.session && req.session.authUser) {
        commit('SET_USERAUTH', req.session.authUser);
        if (!store.state.profile.userInfo) {
          const headers = process.server ? req.headers : null;
          try {
            await store.dispatch('fetchUserInfo', { headers });
          } catch (err) {
            error({ statusCode: 404, message: 'API returned Error', customMsg: err.message });
          }
        }
      }
    },
  },
});

export default createStore;
