import { gql } from "graphql-request";

export default gql`
  mutation CreateReview(
    $productId: ID!
    $userName: String!
    $headline: String!
    $content: String!
    $rating: Int!
    $userEmail: String!
  ) {
    createReview(
      data: {
        headline: $headline
        content: $content
        rating: $rating
        name: $userName
        email: $userEmail
        product: { connect: { id: $productId } }
      }
    ) {
      name
      publishedBy {
        id
      }
      content
      rating
      product {
        slug
      }
    }
    publishManyReviewsConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
