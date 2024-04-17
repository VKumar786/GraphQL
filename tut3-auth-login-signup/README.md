# GraphQL Don't verify using cookies

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  networkInterface: createNetworkInterface({
    uri: "/graphql",
    opts: {
      credentials: "same-origin",
    },
  }),
});

# We can use Debugger keyword
debugger

# GraphQL Bug
redirectQueries & .then() statement work concurrent