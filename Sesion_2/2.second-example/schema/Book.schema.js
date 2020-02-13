const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID
} = require("graphql");
const { AuthorSchema } = require("./Author.schema");
const { Author, Book } = require("../database/models/index");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const BOOK_ADDED = "BOOK_ADDED";

const BookSchema = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(book) {
        return book.id;
      }
    },
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
const CreateBookInputType = new GraphQLInputObjectType({
  name: "CreateBookInputType",
  description: "Book payload for creating book",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});
const addBooks = {
  type: BookSchema,
  args: {
    input: {
      type: new GraphQLNonNull(CreateBookInputType)
    }
  },
  resolve: async (_, { input }) => {
    const book = await Book.create({ ...input });
    pubsub.publish(BOOK_ADDED, {
      bookAdded: book
    });
    return book;
  }
};
const subscribtionBooks = {
  type: BookSchema,
  subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
  resolve: value => {
    if (value) {
      const {
        bookAdded: { dataValues }
      } = value;
      return dataValues;
    } else {
      return "Cargando..";
    }
  }
};

module.exports = {
  BookSchema,
  queries: { getBooks },
  mutations: { addBooks },
  subscriptions: { subscribtionBooks }
};
