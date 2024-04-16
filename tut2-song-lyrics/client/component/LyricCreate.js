import React from "react";
import gpl from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

const LyricCreate = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const content = document.getElementById("content").value;

    props
      .mutate({
        variables: { content, songId: props.songId },
        // refetchQueries: [{ query: fetchSong, variables: { id: props.songId } }],
      })
      .then(() => {
        document.getElementById("content").value = "";
      });
  };
  return (
    <div>
      <h1>Add Lyrics</h1>
      <form onSubmit={handleSubmit}>
        <label>Add a Lyric</label>
        <input type="text" required id="content" />
        <button type="submit" className="btn">
          Add Lyric
        </button>
      </form>
    </div>
  );
};

const mutation = gpl`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
