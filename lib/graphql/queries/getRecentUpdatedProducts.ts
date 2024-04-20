import { gql } from "graphql-request";

export default gql`
  query GetRecentUpdatedProduct($first: Int!) {
    products(orderBy: createdAt_DESC, first: $first) {
      slug
      name
      price
      description
      createdAt
      images {
        url
      }
    }
  }
`;
