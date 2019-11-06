/**
 * Originally written by NanozukiCrows
 */

import { GraphQLClient } from 'graphql-request';

import fetch from 'isomorphic-fetch';
import qs from 'qs';

import { apiPrefix } from '~/config';

const apiBaseUrl = process.client ? apiPrefix.browser : apiPrefix.server;

const graphQLClient = new GraphQLClient(`${apiBaseUrl}/graphql`, {
  headers: {
    Accept: 'application/json',
  },
});


function encodeFormData(data) {
  return Object.entries(data).map(item => (
    `${item[0]}=${encodeURIComponent(item[1])}`
  )).join('&');
}

/* request proptype: {
 *   url: '',
 *   data: {},
 *   method: 'GET',
 * }
 */
async function callApi(request) {
  const init = {
    method: request.method || 'GET',
    headers: request.headers || {},
    credentials: 'include',
    mode: 'cors',
  };
  const hasBody = !((init.method === 'GET') || (init.method === 'HEAD'));

  // headers and body
  if (hasBody) {
    init.headers['content-type'] = 'application/x-www-form-urlencoded';
    init.body = encodeFormData(request.data);
  }

  // url
  const url = ((!hasBody) && (request.data))
    ? `${apiBaseUrl}${request.url}${qs.stringify(request.data, { addQueryPrefix: true })}`
    : `${apiBaseUrl}${request.url}`;

  try {
    const res = await fetch(url, init);
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
}

const remote = {
  getOneRandomLoop: async () => {
    const data = await graphQLClient.request(`
      query getRandomLoops {
        randomLoops(limit: 1) {
          uuid
          duration
          periodBegin
          periodEnd
          frameBegin
          frameEnd
          files
          seriesId
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
          episodeId
          episode {
            id
            index
          }
        }
      }
    `);
    return { data: data.randomLoops };
  },
  getRandomLoopList: async (limit) => {
    const data = await graphQLClient.request(`
      query getRandomLoops {
        randomLoops(limit: ${limit}) {
          uuid
          duration
          periodBegin
          periodEnd
          frameBegin
          frameEnd
          files
          seriesId
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
          episodeId
          episode {
            id
            index
          }
        }
      }
    `);
    return { data: data.randomLoops };
  },
  getLoopByID: async (uuid) => {
    const data = await graphQLClient.request(`
      query getLoop {
        loop(uuid: "${uuid}") {
          uuid
          duration
          periodBegin
          periodEnd
          frameBegin
          frameEnd
          files
          seriesId
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
          episodeId
          episode {
            id
            index
          }
        }
      }
    `);
    return { data: data.loop };
  },
  getLoopsByEpisodeID: async (episodeId) => {
    const data = await graphQLClient.request(`
      query getLoop {
        loops(episodeId: ${episodeId}) {
          uuid
          duration
          periodBegin
          periodEnd
          frameBegin
          frameEnd
          files
          seriesId
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
          episodeId
          episode {
            id
            index
          }
        }
      }
    `);
    return { data: data.loops };
  },
  getEpisodeByID: async (id) => {
    const data = await graphQLClient.request(`
      query getEpisode {
        episode(id: ${id}) {
          id
          index
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
        }
      }
    `);
    return { data: data.episode };
  },
  getEpisodesBySeriesID: async (seriesId) => {
    const data = await graphQLClient.request(`
      query getEpisodes {
        episodes(seriesId: ${seriesId}) {
          id
          index
          series {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
        }
      }
    `);
    return { data: data.episodes };
  },
  getTagsByID: id => callApi({ url: 'tag', data: { loopid: id } }),
  getSeriesByID: async (id) => {
    const data = await graphQLClient.request(`
      query getSeries {
        series(id: ${id}) {
          id
          titleJA
          titleROMAJI
          titleEN
          titleCHS
          titleCHT
          genres
          type
          startDate
          endDate
          cover
          banner
          anilistId
          anilistItem
          season
        }
      }
    `);
    return { data: data.series };
  },
  getSeriesByString: async (titleLike) => {
    const data = await graphQLClient.request(`
      query getSerieses {
        serieses(titleLike: "${titleLike}") {
          offset
          limit
          count
          rows {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
        }
      }
    `);
    return { data: data.serieses.rows };
  },
  // getSeriesPageCount: callApi({ url: 'series/page/count' }),
  // getSeriesByPageNum: num => callApi({ url: 'series', data: { page: num } }),
  // getSeriesBySeason: seasonString => call({ url: ''})
  getAllSeasons: async () => {
    const data = await graphQLClient.request(`
      query {
        season
      }
    `);
    return { data: data.season };
  },

  getSeriesGroup: async ({ offset, limit }) => {
    const offset1 = offset || 0;
    const limit1 = limit || 50;
    const data = await graphQLClient.request(`
      query getSerieses {
        serieses(offset: ${offset1}, limit: ${limit1}) {
          offset
          limit
          count
          rows {
            id
            titleJA
            titleROMAJI
            titleEN
            titleCHS
            titleCHT
            genres
            type
            startDate
            endDate
            cover
            banner
            anilistId
            anilistItem
            season
          }
        }
      }
    `);
    return { data: data.serieses };
  },
  getSeriesCount: async () => {
    const data = await graphQLClient.request(`
      query getSerieses {
        serieses(limit: 1) {
          count
        }
      }
    `);
    return { data: data.serieses.count };
  },
};

export default remote;
