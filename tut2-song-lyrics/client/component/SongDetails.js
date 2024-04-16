import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import SongListItem from "./SongListItem";

const SongDetails = (props) => {
  // const songId = props.params.songId;
  console.warn(props);

  if (props.data.loading) return <div>Loading...</div>;

  const { id, title, lyrics } = props.data.song;
  return (
    <div style={{ margin: "3rem auto" }}>
      <Link href="..">Back</Link>
      <h1>{title}</h1>
      {lyrics.map((props) => {
        const { id: _id, content } = props;
        return <SongListItem key={_id + content} {...props} songId={id} />;
      })}
      <LyricCreate songId={id} />
    </div>
  );
};

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.songId } };
  },
})(SongDetails);
