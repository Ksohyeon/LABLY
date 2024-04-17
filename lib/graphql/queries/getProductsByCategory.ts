import { gql } from "graphql-request";

export default gql`
  query getProductsByCategory($category: String!) {
    products(where: { categories_some: { name: $category } }) {
      id
      name
      slug
      price
      images {
        id
        url
      }
    }
  }
`;
