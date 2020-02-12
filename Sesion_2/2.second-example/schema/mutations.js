const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "RootMutationType",
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return "hello world";
      }
    }
  })
});
