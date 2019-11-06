import Vue from 'vue';
import remote from '~/assets/js/api/fetch';

const episode = {
  state: () => ({
    episodes: {/* [id: episodeid]: Episode */},
    episodeList: {/* [id: seriesid]: Episode */},
  }),

  mutations: {
    SET_EPISODE: (state, { episodeid, data }) => {
      state.episodes[episodeid] = data;
    },

    SET_EPISODES_BY_SERIES: (state, { seriesid, data }) => {
      data.sort((prev, next) => {
        function isStringNaN(str) {
          return Number.isNaN(parseInt(str, 10));
        }
        if (isStringNaN(prev.index) && isStringNaN(next.index)) return 0;
        if (isStringNaN(prev.index) && !isStringNaN(next.index)) return 1;
        if (!isStringNaN(prev.index) && isStringNaN(next.index)) return -1;
        return (parseInt(prev.index, 10) - parseInt(next.index, 10));
      });
      Vue.set(state.episodeList, seriesid, data);
    },
  },

  getters: {

  },

  actions: {
    async fetchEpisodeByID({ dispatch, commit }, { episodeid }) {
      const { data } = await remote.getEpisodeByID(episodeid);
      await dispatch('setSeriesByID', { seriesid: data.series.id, data: data.series });
      commit('SET_EPISODE', { episodeid, data });
    },

    async setSeriesByID({ commit }, { seriesid, data }) {
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchEpisodesBySeriesID({ commit }, { seriesid }) {
      const { data } = await remote.getEpisodesBySeriesID(seriesid);
      commit('SET_EPISODES_BY_SERIES', { seriesid, data });
    },

  },
};

export default episode;
