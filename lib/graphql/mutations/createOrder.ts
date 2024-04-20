import { gql } from "graphql-request";

export default gql`
  mutation CreateOrder(
    $email: String!
    $total: Int!
    $orderItems: OrderItemCreateManyInlineInput!
  ) {
    createOrder(
      data: {
        email: $email
        stripeCheckoutId: ""
        total: $total
        orderItems: $orderItems
      }
    ) {
      id
      total
      orderItems {
        product {
          slug
          name
        }
      }
    }
    publishManyOrdersConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
