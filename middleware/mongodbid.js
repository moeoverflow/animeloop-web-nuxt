const { GraphQLClient } = require('graphql-request');
const { apiPrefix } = require('../config');

const apiBaseUrl = process.client ? apiPrefix.browser : apiPrefix.server;

export default async function ({ route, redirect }) {
  if (
    route.fullPath.startsWith('/loop/')
    && route.params.id && route.params.id.length === 24
  ) {
    const graphQLClient = new GraphQLClient(`${apiBaseUrl}/graphql`, {
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await graphQLClient.request(`
      query {
        loop(uuid: "${route.params.id}") {
          uuid
        }
      }
    `);
    return redirect(`/loop/${data.loop.uuid}`);
  }
  return Promise.resolve();
}
