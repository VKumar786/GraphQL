import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CurrentUser from "../queries/CurrentUser";
import { Link, hashHistory } from "react-router";
import Logout from "../mutations/Logout";

const Header = (props) => {
  console.log(props.data.user);

  if (props.data.loading) return <div>Loading...</div>;

  const handleLogout = () => {
    // props.mutate({}).then(() => props.data.refetch());
    props
      .mutate({
        refetchQueries: [{ query: CurrentUser }],
      })
      .then(() => {
        hashHistory.push("/login");
      });
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: "10px",
        display: "flex",
        // justifyContent: "flex-end",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/#/">
        <div>Home</div>
      </Link>
      {!props.data.user ? (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            to={"/login"}
            style={{
              background: "#dfdfdf",
              border: "1px solid #eee",
              borderRadius: "5px",
              padding: "5px 15px",
            }}
          >
            LogIn
          </Link>{" "}
          <Link
            to={"/signup"}
            style={{
              background: "#dfdfdf",
              border: "1px solid #eee",
              borderRadius: "5px",
              padding: "5px 15px",
            }}
          >
            SignIn
          </Link>
        </div>
      ) : (
        <div
          to={"/signin"}
          style={{
            background: "#dfdfdf",
            border: "1px solid #eee",
            borderRadius: "5px",
            padding: "5px 15px",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default graphql(Logout)(graphql(CurrentUser)(Header));
