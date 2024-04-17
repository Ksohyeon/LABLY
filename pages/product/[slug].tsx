import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";
import { Product } from "..";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import getProductDetail from "@/lib/graphql/queries/getProductDetail";
import Image from "next/image";
import styled from "styled-components";
import { addCartItem } from "@/store/CartStore";
import { useState } from "react";
import QuantityInput from "@/components/atoms/QuantityInput";
import ModalComp from "@/components/ModalComp";

const ProductWrapper = styled.div`
  margin-top: 7vh;
  padding: 20px;
  display: grid;
  width: 80%;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
  & > div {
    position: relative;
    width: 100%;
    padding: 0 2vw;
  }
  .btns {
    width: 100%;
    position: absolute;
    bottom: 30px;
  }
`;
const Button = styled.button`
  width: calc(50% - 1vw);
  height: 50px;
  font-weight: bold;
  font-size: medium;
  background: none;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    background-color: #dddddd;
  }
`;

export async function getStaticPaths() {
  const { products }: { products: Product[] } = await graphql.request(
    getAllProducts
  );
  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = (async (context) => {
  const { products }: { products: Product[] } = await graphql.request(
    getProductDetail,
    {
      slug: context.params?.slug,
    }
  );
  return {
    props: {
      product: products[0],
    },
  };
}) satisfies GetStaticProps<{
  product: Product;
}>;

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddCartItem = () => {
    if (typeof window !== undefined)
      addCartItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity: quantity,
        images: { url: product.images[0].url },
      });
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isModalOpen && (
        <ModalComp
          message="장바구니에 상품이 정상적으로 담겼습니다."
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <ProductWrapper>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            alt={product.images[0].url}
            src={product.images[0].url}
            width={400}
            height={400}
          />
        </div>
        <div>
          <div>
            <b>{product.name}</b>
          </div>
          <div>{product.price}원</div>
          <br></br>
          <div>{product.description}</div>
          <div>
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div className="btns">
            <Button onClick={handleAddCartItem}>장바구니 담기</Button>{" "}
            <Button>바로 구매하기</Button>
          </div>
        </div>
      </ProductWrapper>
    </div>
  );
}
