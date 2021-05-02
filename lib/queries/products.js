import { gql } from '@lib/client';

export const GetAllProducts = gql`
  query GetAllProducts {
    allProduct {
      _id
      name
      price
      slug {
        current
      }
      images {
        image {
          asset {
            _createdAt
            _id
            _key
            _rev
            _type
            _updatedAt
            altText
            assetId
            description
            extension
            label
            mimeType
            originalFilename
            path
            sha1hash
            size
            title
            url
          }
          hotspot {
            _key
            _type
            height
            width
            x
            y
          }
          crop {
            _key
            _type
            bottom
            left
            right
            top
          }
        }
        alt
      }
    }
  }
`;
