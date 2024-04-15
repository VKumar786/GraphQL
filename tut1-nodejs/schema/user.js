const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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
        return await (
          await fetch(`http://localhost:3001/companies/${parentValue.id}/users`)
        ).json();
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

// root query -> entry point for graphql
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await (
          await fetch(`http://localhost:3001/users/${args.id}`)
        ).json();
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await (
          await fetch(`http://localhost:3001/companies/${args.id}`)
        ).json();
      },
    },
  },
});

// mutation -> update, delete, create
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      async resolve(parentValue, args) {
        const { firstName, age } = args;
        const user = await (
          await fetch(`http://localhost:3001/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, age }),
          })
        ).json();
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parentValue, args) {
        const { id } = args;
        const user = await (
          await fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json();
        return user;
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
        users: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parentValue, args) {
        const user = await (
          await fetch(`http://localhost:3001/users/${args.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
          })
        ).json();
        return user;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
