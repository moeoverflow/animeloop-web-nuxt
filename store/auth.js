import remote from '~/assets/js/api/fetch';

const auth = {
  state: () => ({
    authUser: null,
  }),
  mutations: {
    SET_USER(state, data) {
      state.authUser = data;
    },
  },
  actions: {
    async login({ commit }, { username, password, gRecaptchaResponse }) {
      try {
        const result = await remote.login(username, password, gRecaptchaResponse);
        commit('SET_USER', result.data);
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
