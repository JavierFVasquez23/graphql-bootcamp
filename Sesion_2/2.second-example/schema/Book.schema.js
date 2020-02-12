const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorSchema } = require("./Author.schema");
const { Author, Book } = require("../database/models/index");

const BookSchema = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve(book) {
        return book.title;
      }
    },
    content: {
      type: GraphQLString,
      resolve(book) {
        return book.content;
      }
    },
    author: {
      type: AuthorSchema,
      resolve: async book => {
        return await Author.findOne({
          where: { id: book.authorId }
        });
      }
    }
  })
});

const getBooks = {
  type: GraphQLList(BookSchema),
  resolve: async () => {
    return await Book.findAll();
  }
};

module.exports = { BookSchema, queries: { getBooks } };
