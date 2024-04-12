import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let uri = "/api/graphql";
let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
}

export function initApollo(initialState = {}) {
  const client = apolloClient || createApolloClient();

  if (initialState) {
    client.cache.restore({
      ...client.extract(),
      ...initialState,
    });
  }

  if (typeof window === "undefined") {
    return client;
  }

  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function useApollo(initialState: any) {
  return useMemo(() => initApollo(initialState), [initialState]);
}
