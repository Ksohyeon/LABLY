import { gql } from "graphql-request";

export default gql`
  query GetAllOrders($email: String!) {
    orders(where: { email: $email }) {
      id
      orderItems {
        id
        product {
          name
          price
        }
      }
      total
      createdAt
    }
  }
`;
