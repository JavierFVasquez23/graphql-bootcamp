const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require("graphql");
const { Book, Author } = require("../database/models/index");

const AuthorSchema = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(author) {
        return author.id;
      }
    },
    name: {
      type: GraphQLString,
      resolve(author) {
        return author.name;
      }
    },
    books: {
      type: new GraphQLList(require("./Book.schema").BookSchema),
      resolve: async author => {
        return await Book.findAll({
          where: { authorId: author.id }
        });
      }
    }
  })
});

const getAuthors = {
  type: GraphQLList(AuthorSchema),
  resolve: async () => {
    return await Author.findAll();
  }
};

module.exports = { AuthorSchema, queries: { getAuthors } };
