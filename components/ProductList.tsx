import { Product } from "@/pages";
import styled from "styled-components";
import ProductCart from "./atoms/ProductCard";
import React from "react";

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;

export default function ProductList({
  products,
  setProductsState,
}: {
  products: Product[];
  setProductsState: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <>
      <Products>
        {products.map((product: Product) => (
          <ProductCart
            key={product.id}
            product={product}
            setProductsState={setProductsState}
          />
        ))}
      </Products>
    </>
  );
}
