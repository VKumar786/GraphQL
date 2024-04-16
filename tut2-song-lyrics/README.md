mutation AddSong($title: String) {
    addSong(title:$title) {
        id
        title
    }
}

# GET

const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(fetchSongs)(SongList);

# DELETE

const handleDelete = (id) => {
  props
    .mutate({
      variables: { id },
    })
    .then(() => props.data.refetch());
}

const deleteMutation = gpl`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(deleteMutation)(graphql(fetchSongs)(SongList));

# automatically refetch necessary data with it
const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

# Optimized Update
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

# Create

props
  .mutate({
    variables: { content, songId: props.songId },
    // refetchQueries: [{ query: fetchSong, variables: { id: props.songId } }],
  })
  .then(() => {
    document.getElementById("content").value = "";
  });
  
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