import graphql from "@/lib/graphql";
import getLikes from "@/lib/graphql/queries/getLikes";
import { TitleWrapper } from "@/pages/my-page";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ItemDiv = styled.div`
  display: flex;
  margin: 10px 50px 0 0;
  background-color: #f7f7f7;
  &:hover {
    background-color: #f0f0f0;
  }
  & > div {
    margin: 20px;
  }
`;

type Like = {
  id: string;
  slug: string;
  name: string;
  image: string;
  email: string;
};
export default function MyLikeProductsComp() {
  const { user } = useUser();
  const [likes, setLikes] = useState<Like[]>([]);

  const getLikesFn = useCallback(async () => {
    const { likes }: { likes: Like[] } = await graphql.request(getLikes, {
      email: user?.name || "",
    });
    console.log("likes: ", likes);
    setLikes(likes);
  }, [user]);

  useEffect(() => {
    getLikesFn();
  }, [getLikesFn]);

  return (
    <div>
      <TitleWrapper>
        <h2>관심 상품</h2>
      </TitleWrapper>
      <ul>
        {likes.map((like) => (
          <li>
            <Link href={`/product/${like.slug}`}>
              <ItemDiv>
                <Image
                  alt={like.name}
                  src={like.image}
                  width={120}
                  height={120}
                />
                <div>{like.name}</div>
              </ItemDiv>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
