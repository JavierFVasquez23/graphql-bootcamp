const { GraphQLObjectType } = require("graphql");
const { queries: bookQueries } = require("./Book.schema");
const { queries: authorQueries } = require("./Author.schema");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...bookQueries,
    ...authorQueries
  })
});
