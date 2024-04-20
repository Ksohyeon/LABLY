import { gql } from "graphql-request";

export default gql`
  mutation CreateLike(
    $slug: String!
    $email: String!
    $name: String!
    $image: String!
  ) {
    createLike(
      data: { slug: $slug, email: $email, name: $name, image: $image }
    ) {
      stage
      slug
      name
      email
      image
    }
    publishManyLikesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
