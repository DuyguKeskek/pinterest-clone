const { ApolloServer, AuthenticationError } = require("apollo-server")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// Import typedefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

// Import Mongoose models
const User = require('./models/User')
const Post = require('./models/Post')

MONGO_URI= 'mongodb://duygukeskek:duygu2776149@ds235022.mlab.com:35022/pinterest-clone'

// Connect to MLab database
mongoose
    .connect(
        MONGO_URI,
        { useMongoClient: true }
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err))

// Verify JWT Token passed from client
const getUser = async token => {
    if(token) {
        try {
            return await jwt.verify(token, process.env.SECRET)
        } catch(err) {
            throw new AuthenticationError('Your session has ended. Please sign in again.')
        }
    }
}
// Create Apollo/GraphQL server using typedefs, resolvers, and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => ({
        name: error.name, 
        message: error.message.replace('Context creation failed:', '') }),
    context: async ({ req }) => {
        const token = (req.headers["authorization"])
        return { User, Post, currentUser: await getUser(token)}
    }
})

server.listen().then(({ url }) => {
    console.log(`server listening on ${url}`)
})