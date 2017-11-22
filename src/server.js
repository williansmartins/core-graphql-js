/**
 * @file Servidor de GraphQL
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// Obtem todas as APIs GraphQL
const appsGraphQL = require('./lib/merge-graphql');

app.use('/graphql', graphqlHTTP({
  schema: appsGraphQL.schema,
  rootValue: appsGraphQL.root,
  graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
