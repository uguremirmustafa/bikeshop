import { GraphQLClient } from 'graphql-request';
export { gql } from 'graphql-request';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});
export default client;
