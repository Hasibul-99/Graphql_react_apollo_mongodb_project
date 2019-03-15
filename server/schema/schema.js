const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

var books = [
    {name: "abc", genre: "Fantasy", id: '1'},
    {name: "def", genre: "History", id: '2'},
    {name: "ghi", genre: "Fire", id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to get data from db / other source

               return _.find(books, {id: args.id});
            }
        }
    }
})

// Creating a new graphql shema and inside this pass through RootQuery
module.exports = new GraphQLSchema({
    query: RootQuery
})