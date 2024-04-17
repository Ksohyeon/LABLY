import { Product } from "@/pages";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Card = styled.ul`
  width: 240px;
  height: 300px;
  background-color: #ffffffda;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 0 0.3em #b4b4b4;
  li:nth-child(1) {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  &:hover {
    z-index: 1;
    transform: scale(1.3);
  }
`;

export default function ProductCard(product: Product) {
  console.log(product);
  return (
    <Link id={product.id} href={`/product/${product.slug}`} passHref>
      <Card>
        <li>
          <Image
            alt={product.images[0].url}
            src={product.images[0].url}
            width={200}
            height={200}
          />
        </li>
        <li>{product.name}</li>
        <li>{product.price} $</li>
      </Card>
    </Link>
  );
}
