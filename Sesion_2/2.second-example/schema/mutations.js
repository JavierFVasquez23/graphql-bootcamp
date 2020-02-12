const { GraphQLObjectType, GraphQLString } = require("graphql");
const { mutations: bookMutations } = require("./Book.schema");

module.exports = new GraphQLObjectType({
  name: "RootMutationType",
  fields: () => ({
    ...bookMutations
  })
});
