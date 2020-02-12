const { GraphQLObjectType } = require("graphql");
const { subscriptions: book } = require("./Book.schema");

module.exports = new GraphQLObjectType({
  name: "RootSubsCribtionsType",
  fields: () => ({
    ...book
  })
});
