import Head from "next/head";
import styles from "@/styles/Home.module.css";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";

type Products = {
  id: string;
  name: string;
  price: number;
  images: {
    id: string;
    url: string;
  };
};

export const getStaticProps = (async () => {
  const { products }: any = await graphql.request(getAllProducts);
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}) satisfies GetStaticProps<{
  products: Products;
}>;

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("products: ", products);
  return (
    <>
      <Head>
        <title>LABLY</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}></main>
    </>
  );
}
