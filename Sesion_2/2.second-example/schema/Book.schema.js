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
const { PubSub, withFilter } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
    pubsub.publish("bookAdded", {
      bookAdded: book
    });
    return book;
  }
};
const subscribtionBooks = {
  type: BookSchema,
  resolve: withFilter(
    () => pubsub.asyncIterator("bookAdded"),
    (payload, variables) => {
      console.log(payload, variables);
      return payload;
    }
  )
};

module.exports = {
  BookSchema,
  queries: { getBooks },
  mutations: { addBooks },
  subscriptions: { subscribtionBooks }
};
