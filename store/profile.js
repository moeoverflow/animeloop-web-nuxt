import remote from '~/assets/js/api/fetch';

const profile = {
  state: () => ({
    userInfo: null,
  }),
  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = data;
    },
    SET_USER_AVATAR(state, data) {
      state.userInfo.avatar = data;
    },
  },
  actions: {
    async fetchUserInfo({ commit }, { headers }) {
      try {
        const result = await remote.fetchUserInfo(headers);
        if (result.status === 'success') {
          await commit('SET_USERINFO', result.data);
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
