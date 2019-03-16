const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema,
GraphQLID, GraphQLInt, GraphQLList} = graphql;

var books = [
    {name: "abc", genre: "Fantasy", id: '1', authorId: '2'},
    {name: "def", genre: "History", id: '2', authorId: '3'},
    {name: "ghi", genre: "Fire", id: '3', authorId: '1'},
    {name: "jkl", genre: "thraler", id: '4', authorId: '3'},
    {name: "mno", genre: "chomics", id: '5', authorId: '2'},
    {name: "pqr", genre: "Jock", id: '6', authorId: '1'}
];

var authors = [
    {name: "Hasibul", age: 40, id: '1'},
    {name: "Hasan", age: 35, id: '2'},
    {name: "Tushar", age: 30, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {   //resolve function responcible of going up and grabing data
                // code to get data from db / other source

               return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                
                return _.find(authors, {id: args.id});
            }
        }
    }
})

// Creating a new graphql shema and inside this pass through RootQuery
module.exports = new GraphQLSchema({
    query: RootQuery
})