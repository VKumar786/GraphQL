import React from "react";
import gpl from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import fetchSongs from "../queries/fetchSongs";

const SongCreate = (props) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;

    // AddSong(title)
    console.warn(props);

    props
      .mutate({
        variables: { title },
        refetchQueries: [{ query: fetchSongs }],
        // refetchQueries: [{ query: fetchSongs, variables: { id: 1 }],
      })
      .then(() => hashHistory.push("/"));
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input type="text" required id="title" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mutation = gpl`
  mutation AddSong($title: String) {
    addSong(title:$title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
