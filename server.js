const { ApolloServer, gql } = require("apollo-server")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const User = require('./models/User')
const Post = require('./models/Post')

MONGO_URI= '_URI_'

mongoose
    .connect(
        MONGO_URI,
        { useMongoClient: true }
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err))

const typeDefs = gql `
    type Todo {
        task : String,
        completed : Boolean
    }
    type Query {
        getTodos : [Todo]
    }
`

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
})

server.listen(4000).then(({ url }) => {
    console.log(`server listening on ${url}`)
})