const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const _ = require("lodash");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const users = await (
          await fetch(`http://localhost:3001/companies/${parentValue.id}/users`)
        ).json();
        return users;
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parentValue, args) {
        console.warn(parentValue, args);
        return await (
          await fetch(
            `http://localhost:3001/companies/${parentValue.companyId}`
          )
        ).json();
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const users = await (await fetch(`http://localhost:3001/users`)).json();
        return _.filter(users, (user) => parentValue.users.includes(user.id));
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const user = await (
          await fetch(`http://localhost:3001/users/${args.id}`)
        ).json();
        return user;
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const user = await (
          await fetch(`http://localhost:3001/companies/${args.id}`)
        ).json();
        return user;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
