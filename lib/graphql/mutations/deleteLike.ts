import { gql } from "graphql-request";

export default gql`
  mutation deleteLike($likeId: ID!) {
    deleteLike(where: { id: $likeId }) {
      id
    }
  }
`;
