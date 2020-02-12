const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./resolvers/resolvers");
const schema = require("./schema/schema");

const server = new ApolloServer({
  schema,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
