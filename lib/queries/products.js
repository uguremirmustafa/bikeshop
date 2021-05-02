import client, { gql } from '@lib/client';

export const GetAllProducts = gql`
  query GetAllProducts {
    allProduct {
      _id
      description
      name
      price
    }
  }
`;
