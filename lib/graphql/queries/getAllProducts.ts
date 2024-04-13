import { gql } from "graphql-request";

export default gql`
  query GetAllProducts {
    products {
      id
      name
      price
      images {
        id
        url
      }
    }
  }
`;
