const { ApolloServer, UserInputError,gql,AuthenticationError,PubSub } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const logger = require('./utils/logger')
const config = require('./utils/config')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const uuid = require('uuid/v1')

const jwt = require("jsonwebtoken");

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{
  logger.info('connected to MongoDB')
})
.catch((error)=>{
  logger.error('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String):[Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me: (root,args,context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root,args) => {
      if(args.author && args.genre){
        const author = await Author.findOne({name: args.author})

        const books = await Book.find({
          $and: [
            {author: {$in: [author.id]}},
            {genres: {$in: [args.genre]}}
          ]
        }).populate("author")
        return books
      }else if(args.author){
        const author = await Author.findOne({name: args.author})
        
        const books = await Book.find({author:{$in: [author.id]}}).populate("author")

        return books
      }else if(args.genre){
        const books = await Book.find({genres:{$in: [args.genre]}}).populate("author")

        return books
      }else{
        return Book.find({}).populate("author")
      }
    },
    allAuthors: async() => {
      const authors = await Author.find({})
      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author.id,
        };
      });

      return authorsObject;
    },
  },
  Mutation:{
    createUser: async(root,args) => {
      const user = new User({...args})
      try{
        await user.save()
        return user
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async(root,args) => {
      const user = await User.findOne({username:args.username})

      if (!user || args.password !== "thisisaverylongpassword") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken,config.SECRET)}
    },
    addBook: async(root,args,context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let book
      try{
        let author = await Author.findOne({ name: args.author });
        if (author) {
          book = new Book({ ...args, author: author._id });
          author.books = author.books.concat(book._id);
  
          await book.save();
          await author.save();
        }
  
        if (!author) {
          const _id = mongoose.Types.ObjectId();
          book = new Book({ ...args, author: _id });
  
          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            _id,
            books: [book._id],
          });
  
          await author.save();
          await book.save();
        }
        book.author = author
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root,args,context) => {
      const author = await Author.findOne({name:args.name})
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      if(!author){
        return null
      }
      author.born = args.setBornTo
      try{
        await author.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      author.bookCount = author.books.length
      return author
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url,subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
