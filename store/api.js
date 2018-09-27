import remote from '~/assets/js/api/fetch';

const profile = {
  state: () => ({
    tokens: null,
  }),
  mutations: {
    SET_USERTOKENS(state, data) {
      state.tokens = data;
    },
  },
  actions: {
    async fetchUserToken({ commit }, { headers }) {
      try {
        const result = await remote.fetchUserToken(headers);
        if (result.status === 'success') {
          await commit('SET_USERTOKENS', result.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
  },
};

export default profile;
