const express = require('express');
const http = require('http');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan');
const debug = require('debug');
const env = require('./config/environment');
const schema = require('./schema');

const app = express();
const logger = debug('log');

app.use(morgan('dev'));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const server = http.createServer(app);


server.listen(env.PORT, () => {
    app.set('host', `http://localhost:${env.PORT}`);

    logger(`Find me on http://localhost:${env.PORT}`);
})