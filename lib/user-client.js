import { GraphQLClient } from 'graphql-request';

export const hasuraUserClient = (token) => {
  return new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};
