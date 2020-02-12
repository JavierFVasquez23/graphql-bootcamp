const { merge } = require("lodash");
const Book = require("./book.resolver");

const resolvers = merge(
  {
    Query: {},
    Mutation: {}
  },
  Book.resolvers
);

module.exports = { resolvers };
