import React from "react";
import gpl from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

const SongList = (props) => {
  const handleDelete = (id) => {
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
  };
  return (
    <div style={{ margin: "3rem auto" }}>
      <div className="collection">
        {props &&
          props.data &&
          props.data.songs &&
          props.data.songs.map((song) => {
            const { id, title } = song;
            return (
              <div
                key={id + title}
                className="collection-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link href={`/#/${id}`}>{title}</Link>

                <i
                  className="material-icons"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(id)}
                >
                  delete
                </i>
              </div>
            );
          })}
      </div>

      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const deleteMutation = gpl`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(deleteMutation)(graphql(fetchSongs)(SongList));
