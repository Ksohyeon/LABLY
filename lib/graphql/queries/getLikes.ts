import { gql } from "graphql-request";

export default gql`
  query GetLikes($email: String!) {
    likes(where: { email: $email }) {
      id
      slug
      name
      image
      email
    }
  }
`;
