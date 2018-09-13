const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const fs = require('fs')
const path = require('path')

// Import typedefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

// Import Mongoose models
const User = require('./models/User')
const Post = require('./models/Post')

MONGO_URI= '_URI_'

// Connect to MLab database
mongoose
    .connect(
        MONGO_URI,
        { useMongoClient: true }
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err))

// Create Apollo/GraphQL server using typedefs, resolvers, and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
})

server.listen().then(({ url }) => {
    console.log(`server listening on ${url}`)
})