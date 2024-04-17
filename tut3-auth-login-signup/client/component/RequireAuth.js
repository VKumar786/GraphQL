import React from "react";
import { graphql } from "react-apollo";
import CurrentUser from "../queries/CurrentUser";
import { hashHistory } from "react-router";

const RequireAuth = (props) => {
  if (props.data.loading) return <div>Loading...</div>;

  if (!props.data.user) {
    hashHistory.push("/login");
  }

  return <div>{props.children}</div>;
};

export default graphql(CurrentUser)(RequireAuth);
