import { gql } from "graphql-request";

export default gql`
  query GetCategories {
    categories {
      name
    }
  }
`;
