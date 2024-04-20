import { Product } from "..";
import graphql from "@/lib/graphql";
import getProductsByCategory from "@/lib/graphql/queries/getProductsByCategory";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import ProductList from "@/components/ProductList";
import getCategories from "@/lib/graphql/queries/getCategories";
import styled from "styled-components";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import getLikes from "@/lib/graphql/queries/getLikes";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
  & > h2 {
    margin: 7vh 0 5vh;
    font-weight: bolder;
  }
`;

export async function getStaticPaths() {
  const { categories }: { categories: { name: string }[] } =
    await graphql.request(getCategories);
  const paths = categories.map((category) => ({
    params: {
      category: category.name,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = (async (context) => {
  const { products }: { products: Product[] } = await graphql.request(
    getProductsByCategory,
    {
      category: context.params?.category,
    }
  );

  return {
    props: {
      products,
    },
  };
}) satisfies GetStaticProps<{
  products: Product[];
}>;

export default function CatetoryProducts({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const params = useParams<{ category: string }>();
  const [productsState, setProductsState] = useState<Product[]>(products);
  const [categoryState, setCategoryState] = useState<string>("");

  const getLikesFn = useCallback(async () => {
    console.log("user: ", user);
    const { likes }: { likes: { id: string; slug: string; email: string }[] } =
      await graphql.request(getLikes, {
        email: user?.name || "",
      });
    const likesProducts = likes.map((like) => like.slug);
    const productsWithLike = products.map((product) => {
      if (likesProducts.includes(product.slug)) {
        return {
          ...product,
          like: true,
          likeId: likes[likesProducts.indexOf(product.slug)].id,
        };
      } else return { ...product, like: false };
    });
    setProductsState(productsWithLike);
  }, [user, setProductsState]);

  useEffect(() => {
    const category = params.category;
    if (category === "Outers") setCategoryState("아우터");
    else if (category === "Hoodies") setCategoryState("후드");
    else if (category === "Coats") setCategoryState("코트");
    else if (category === "Paddings") setCategoryState("패딩");
    else if (category === "Tops") setCategoryState("상의");
    else if (category === "T-Shirts") setCategoryState("티셔츠");
    else if (category === "Accessories") setCategoryState("악세서리");
    else if (category === "Bags") setCategoryState("가방");
    else if (category === "Hats") setCategoryState("모자");
    else if (category === "") setCategoryState("");
  }, [params]);

  useEffect(() => {
    getLikesFn();
  }, [getLikesFn]);

  return (
    <ListWrapper>
      <h2>{categoryState}</h2>
      <ProductList
        products={productsState}
        setProductsState={setProductsState}
      />
    </ListWrapper>
  );
}
