import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useRouter } from 'next/router';
import nextWithApollo from 'next-with-apollo';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { authorization: token ? `${token}` : '' }),
    },
  };
});

const WithApollo = nextWithApollo(
  ({ initialState, headers }) => new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(
      new HttpLink({
        uri: 'http://localhost:4000/',
      }),
    ),

    headers: {
      ...(headers as Record<string, string>),
    },
    cache: new InMemoryCache().restore(initialState || {}),
  }),
  {
    render: ({ Page, props }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  },
);

export default WithApollo;
