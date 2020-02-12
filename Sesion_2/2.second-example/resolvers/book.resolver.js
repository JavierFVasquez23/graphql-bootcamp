const resolvers = {
  Query: {
    getBooks: async (_source, { first }, { dataSources }) => {
      return dataSources.db.getAllBooks(first);
    }
  },
  Mutation: {}
};

module.exports = { resolvers };
