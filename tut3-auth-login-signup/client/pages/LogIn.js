import React from "react";
import CurrentUser from "../queries/CurrentUser";
import AuthForm from "../component/AuthForm";
import { graphql } from "react-apollo";
import LoginMutation from "../mutations/LoginMutation";
import { hashHistory } from "react-router";
import { queries } from "apollo-client/queries/store";

const LogIn = (props) => {
  if (props.data.loading) return <div>Loading...</div>;

  if (props.data.user) {
    hashHistory.push("/");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    document.getElementById("err").innerText = "";
    props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query: CurrentUser }],
      })
      .then(() => {
        hashHistory.push("/");
      })
      .catch((error) => {
        const msg = error.graphQLErrors.map((err) => err.message);
        document.getElementById("err").innerText = msg.join(", ");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>LogIn</h1>
      <AuthForm handleSubmit={handleLogin} />
    </div>
  );
};

export default graphql(CurrentUser)(graphql(LoginMutation)(LogIn));
