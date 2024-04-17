import { Product } from "@/pages";
import styled from "styled-components";
import ProductCart from "./atoms/ProductCard";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      <Products>
        {products.map((product: Product) => {
          return <ProductCart key={product.id} {...product} />;
        })}
      </Products>
    </>
  );
}
