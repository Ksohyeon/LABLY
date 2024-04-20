import { Product } from "@/pages";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { useCallback } from "react";
import graphql from "@/lib/graphql";
import deleteLike from "@/lib/graphql/mutations/deleteLike";
import createLike from "@/lib/graphql/mutations/createLike";
import { useUser } from "@auth0/nextjs-auth0/client";

const Card = styled.ul`
  width: 240px;
  height: 310px;
  background-color: #ffffffda;
  border-radius: 3px;
  box-shadow: 0 0 0.3em #b4b4b4;
  position: relative;
  &:hover {
    z-index: 1;
    transform: scale(1.3);
  }
  .like {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    &:hover {
      color: gray;
      cursor: pointer;
    }
  }
  .text {
    padding: 3px 10px;
  }
`;

export default function ProductCard({
  product,
  setProductsState,
}: {
  product: Product;
  setProductsState: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const { user } = useUser();
  const handleLike = useCallback(() => {
    if (product.like) {
      graphql.request(deleteLike, { likeId: product.likeId });
    } else if (product.like === false) {
      graphql.request(createLike, {
        slug: product.slug,
        name: product.name,
        image: product.images[0].url,
        email: user?.name || "",
      });
    }
    setProductsState((prev) => {
      const newProducts: Product[] = JSON.parse(JSON.stringify(prev));
      newProducts.forEach((cur) => {
        if (cur.slug === product.slug) cur.like = !cur.like;
      });
      return newProducts;
    });
  }, [product]);

  return (
    <Card>
      <li>
        <span onClick={handleLike}>
          {product.like ? (
            <TiHeartFullOutline color="red" className="like" size={30} />
          ) : (
            <TiHeartOutline className="like" size={30} />
          )}
        </span>
      </li>
      <Link href={`/product/${product.slug}`} passHref>
        <li>
          <Image
            alt={product.images[0].url}
            src={product.images[0].url}
            width={240}
            height={240}
          />
        </li>
        <li className="text">{product.name}</li>
        <li className="text">{product.price} $</li>
      </Link>
    </Card>
  );
}
