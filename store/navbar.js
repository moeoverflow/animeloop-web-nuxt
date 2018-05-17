// import Vue from 'vue';

const navbar = {
  state: () => ({
    burgerOpen: false,
    searchOpen: false,
    langOpen: false,
    loginModalOpen: false,
    loginFormTab: 'login',
    profilePanelOpen: false,
  }),

  getters: {
  },

  mutations: {
    TOGGLE_NAVBAR_STATE: (state, { type }) => {
      // Vue.set(state, type, !state[type]);
      state[type] = !state[type];
    },
    SWITCH_LOGIN_FORM_TAB: (state, tab) => {
      state.loginFormTab = tab;
    },
  },

  actions: {
    toggleNavbarState({ commit }, { type }) {
      if (type === 'burger') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'burgerOpen' });
      } else if (type === 'search') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'searchOpen' });
      } else if (type === 'lang') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'langOpen' });
      } else if (type === 'loginModal') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'loginModalOpen' });
      } else if (type === 'profilePanel') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'profilePanelOpen' });
      } else {
        throw Error('Wrong toggle type');
      }
    },
    switchLoginFormTab({ commit }, { tab }) {
      commit('SWITCH_LOGIN_FORM_TAB', tab);
    },
  },
};

export default navbar;
