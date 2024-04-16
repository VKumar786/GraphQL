import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./component/App";
import SongList from "./component/SongList";
import SongCreate from "./component/SongCreate";
import SongDetails from "./component/SongDetails";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/:songId" component={SongDetails} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
