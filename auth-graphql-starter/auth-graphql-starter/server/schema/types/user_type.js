const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    email: { type: GraphQLString },
  },
});

// export default UserType;
module.exports = UserType;
