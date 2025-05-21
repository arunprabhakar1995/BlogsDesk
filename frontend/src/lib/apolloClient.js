'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_URL, // Backend GraphQL URL
  cache: new InMemoryCache(),
});

export default client;
