import remote from '~/assets/js/api/fetch';

const auth = {
  state: () => ({
    authUser: null,
  }),
  mutations: {
    SET_USERAUTH(state, data) {
      state.authUser = data;
    },
  },
  actions: {
    async login({ commit }, { username, password, gRecaptchaResponse }) {
      try {
        const result = await remote.login(username, password, gRecaptchaResponse);
        if (result.status === 'success') {
          commit('SET_USERAUTH', result.data);
        }
        return result;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        const result = await remote.logout();
        if (result.status === 'success') {
          commit('SET_USERAUTH', null);
        }
        return result;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
  },
};

export default auth;
