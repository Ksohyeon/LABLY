import { gql } from "graphql-request";

export default gql`
  mutation CreateOrderItem($total: Int!, $quantity: Int!, $productId: ID!) {
    createOrderItem(
      data: {
        total: $total
        quantity: $quantity
        product: { connect: { id: $productId } }
      }
    ) {
      id
      createdAt
      total
      product {
        id
        name
      }
    }
    publishManyOrderItemsConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
