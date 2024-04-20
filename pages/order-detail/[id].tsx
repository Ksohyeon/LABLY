import ReviewModal from "@/components/ReviewModal";
import graphql from "@/lib/graphql";
import getOrderDetail from "@/lib/graphql/queries/getOrderDetail";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const PageWapper = styled.div`
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export type OrderedProduct = {
  id?: string;
  name?: string;
  slug?: string;
  images: { url: string }[];
};
type Item = {
  id: string;
  quantity: number;
  product: OrderedProduct;
};
type Order = {
  id: string;
  createdAt: string;
  orderItems: Item[];
};

export const getServerSideProps = (async (context) => {
  const { order }: { order: Order } = await graphql.request(getOrderDetail, {
    id: context.params?.id,
  });
  return { props: { order } };
}) satisfies GetServerSideProps<{ order: Order }>;

export default function OrderDetailPage({
  order,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [selectedItem, setselectedItem] = useState<Item>();
  return (
    <PageWapper>
      {isReviewModalOpen && (
        <ReviewModal
          product={selectedItem?.product || { images: [] }}
          setIsReviewModalOpen={setIsReviewModalOpen}
        />
      )}
      <div>
        <h2>주문상세</h2>
        <h4>{order.createdAt.slice(0, 10)}</h4>
        <hr />
        <ul>
          {order.orderItems.map((item: Item) => (
            <li style={{ display: "flex" }} key={order.id}>
              <div>
                <Link href={`/product/${item.product.slug}`}>
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name || ""}
                    width={200}
                    height={200}
                  />
                </Link>
              </div>
              <div>
                <ul>
                  <li>{item.product.name}</li>
                  <li>{item.quantity} 개</li>
                  <li>
                    <button
                      onClick={() => {
                        setselectedItem(item);
                        setIsReviewModalOpen(true);
                      }}
                    >
                      후기 작성하기
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageWapper>
  );
}
