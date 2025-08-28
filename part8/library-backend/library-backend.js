const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type editAuthor {
    name: String!,
    born: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): editAuthor
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({
          genres: args.genre
        })
      }
      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    id: (root) => {
      return root.id.toString()
    },
    bookCount: async (root) => {
      const filtered_books = await Book.find({ author: root.id })
      return filtered_books.length
    }
  },
  Book: {
    id: (root) => {
      return root.id.toString()
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // find author first
      let author = await Author.findOne({ name: args.author }).exec()

      // if not found, create
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      // add author object to new book
      const book = new Book({ 
        title: args.title,
          title: args.title,
          published: args.published,
          author: author,
          genres: args.genres
        })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return book.save()
    },
    editAuthor: async (root, args) => {
      const newAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { returnDocument: 'after'}
      ).exec()

      if (!newAuthor) {
        return null
      }

      return {
        name: newAuthor.name,
        born: newAuthor.born
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
