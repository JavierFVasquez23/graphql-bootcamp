import React from "react";
import Main from "./Modules/Main/Main";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    lazy: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({ link, cache });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Main />
      </div>
    </ApolloProvider>
  );
}

export default App;
