import React from "react";
import gpl from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

const query = gpl`
{
    songs {
        id
        title
    }
}
`;

const SongList = (props) => {
  console.warn(props);
  return (
    <div>
      <div className="collection">
        {props &&
          props.data &&
          props.data.songs &&
          props.data.songs.map((song) => {
            return (
              <div key={song.id + song.title} className="collection-item">
                <a href={`/${song.id}`}>{song.title}</a>
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

export default graphql(query)(SongList);
