import graphql from "@/lib/graphql";
import getAllOrders from "@/lib/graphql/queries/getAllOrders";
import { TitleWrapper } from "@/pages/my-page";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Order = {
  id: string;
  total: number;
  createdAt: string;
  orderItems: { id: string; product: { name: string; price: number } }[];
};

const OrderList = styled.ul`
  margin-top: 20px;
  & > li {
    border: 1px solid gray;
    padding: 10px;
  }
  & > li:not(:nth-child(1)) {
    border-top: 0;
  }
`;

export default function MyOrdersComp() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>();
  const ordersRef = useRef<Order[]>();

  const getOrders = async () => {
    const data: { orders: Order[] } = await graphql.request(getAllOrders, {
      email: user?.name,
    });
    setOrders(data.orders);
    ordersRef.current = data.orders;
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <TitleWrapper>
        <h2>주문 내역</h2>
      </TitleWrapper>
      <OrderList>
        {orders && (
          <>
            {orders.map((order) => (
              <li key={order.id}>
                <ul>
                  <li>수량 : {order.total}개</li>
                  <li>주문일 : {order.createdAt.slice(0, 10)}</li>
                </ul>
              </li>
            ))}
          </>
        )}
      </OrderList>
    </div>
  );
}
