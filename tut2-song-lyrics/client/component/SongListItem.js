import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

const SongListItem = (props) => {
  const { id, content, likes, songId = "" } = props;

  const handleLikes = () => {
    props
      .mutate({
        variables: { id },
        optimisticResponse: {
          __typename: "Mutation",
          likeLyric: {
            id,
            __typename: "LyricType",
            likes: likes + 1,
          },
        },
        // refetchQueries: [{ query: fetchSong, variables: { id: songId } }],
      })
      .then((data) => {
        console.warn(data);
      });
  };

  return (
    <div
      key={id + content}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <p>{content}</p>
      <button
        className="btn"
        onClick={handleLikes}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          lineHeight: "0",
        }}
      >
        <p style={{ fontWeight: "bold", margin: 0 }}>{likes}</p>
        <i className="material-icons">thumb_up</i>
      </button>
    </div>
  );
};

const mutation = gql`
  mutation addLikeToLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
      content
    }
  }
`;

export default graphql(mutation)(SongListItem);
