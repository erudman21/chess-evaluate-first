"use client";

import { HttpLink } from "@apollo/client";
import Providers from "./Providers";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

const makeClient = () =>
  new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  });

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <Providers>{children}</Providers>
    </ApolloNextAppProvider>
  );
}
