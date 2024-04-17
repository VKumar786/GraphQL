import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, hashHistory, Route, IndexRoute } from "react-router";
import Layout from "./component/Layout";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  networkInterface: createNetworkInterface({
    uri: "/graphql",
    opts: {
      credentials: "same-origin",
    },
  }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dashboard} />
          <Route path="login" component={LogIn} />
          <Route path="signup" component={SignUp} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
