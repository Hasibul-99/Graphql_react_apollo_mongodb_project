const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema  = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("now lisatening for requests on port 4000");
})