import { gql } from "graphql-request";

export default gql`
  query GetRecentUpdatedProducts($id: ID!) {
    order(where: { id: $id }) {
      id
      total
      createdAt
      orderItems {
        id
        quantity
        product {
          id
          slug
          name
          images {
            url
          }
        }
      }
    }
  }
`;
