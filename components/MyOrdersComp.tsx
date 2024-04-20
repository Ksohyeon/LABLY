import graphql from "@/lib/graphql";
import getAllOrders from "@/lib/graphql/queries/getAllOrders";
import { TitleWrapper } from "@/pages/my-page";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Order = {
  id: string;
  total: number;
  createdAt: string;
  orderItems: { id: string; product: { name: string; price: number } }[];
};

const OrderList = styled.ul`
  margin: 20px 50px 0 0;
  & > li {
    border: 1px solid gray;
    padding: 10px;
  }
  & > li:not(:nth-child(1)) {
    border-top: 0;
  }
  .order {
    &:hover {
      cursor: pointer;
      background-color: #ececec;
    }
  }
`;

export default function MyOrdersComp() {
  const router = useRouter();
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>();
  const ordersRef = useRef<Order[]>();

  const getOrders = useCallback(async () => {
    const data: { orders: Order[] } = await graphql.request(getAllOrders, {
      email: user?.name,
    });
    console.log(data);
    setOrders(data.orders);
    ordersRef.current = data.orders;
  }, []);

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
              <li
                className="order"
                key={order.id}
                onClick={() => {
                  router.push(`/order-detail/${order.id}`);
                }}
              >
                <ul>
                  <li>{order.createdAt.slice(0, 10)}</li>
                  <li>수량 : {order.total}개</li>
                </ul>
              </li>
            ))}
          </>
        )}
      </OrderList>
    </div>
  );
}
