// import Vue from 'vue';
import remote from '~/assets/js/api/fetch';

const series = {
  state: () => ({
    series: {/* [id: seriesid]: Series */},
    // seriesListByPage: {/* [page: pagenum]: seriesid */},
    seriesListByGroupFilter: [],
    seasons: {/* [year]: month */},
    seriesCount: 0,
    maxSeriesInPage: 30,
  }),

  mutations: {
    SET_MULTIPLE_SERIES: (state, { data }) => {
      data.forEach((val) => {
        state.series[val.id] = val;
      });
    },

    SET_SERIES: (state, { seriesid, data }) => {
      state.series[seriesid] = data;
    },

    SET_SERIES_COUNT: (state, { data }) => {
      state.seriesCount = data.count;
    },

    SET_SERIES_BY_PAGE_NUM: (state, { data, pageNum }) => {
      state.seriesListByPage[pageNum] = [];
      data.forEach((val) => {
        state.seriesListByPage[pageNum].push(val.id);
      });
    },

    SET_SERIES_GROUP: (state, { data }) => {
      state.seriesListByGroupFilter = data;
    },

    SET_SEASONS: (state, { data }) => {
      state.seasons = {};
      [...new Set(data)].forEach((val) => {
        const year = val.split('-')[0];
        const month = val.split('-')[1];
        const seasonHasYear = Object.prototype.hasOwnProperty.call(state.seasons, year);
        if (!seasonHasYear) {
          state.seasons[year] = [];
        }
        state.seasons[year].push(month);
      });
    },

  },

  actions: {
    async fetchSeriesByID({ commit }, { seriesid }) {
      const { data } = await remote.getSeriesByID(seriesid);
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchSeriesGroup({ state, commit, dispatch }, {
      offset, limit = state.maxSeriesInPage,
    }) {
      const { data } = await remote.getSeriesGroup({
        offset, limit,
      });
      commit('SET_SERIES_GROUP', { data: data.rows });
      commit('SET_SERIES_COUNT', { data });
      await dispatch('fillSeriesList', { data: data.rows });
    },

    async fetchAllSeasons({ commit }) {
      const { data } = await remote.getAllSeasons();
      commit('SET_SEASONS', { data });
    },
  },
};

export default series;
