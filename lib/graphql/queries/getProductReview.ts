import { gql } from "graphql-request";

export default gql`
  query GetProductReview($slug: String!) {
    reviews(where: { product: { slug: $slug } }) {
      id
      name
      headline
      content
      rating
      product {
        slug
      }
    }
  }
`;
