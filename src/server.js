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
const async = require('async');

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

async.auto({
  mongodb: (callback) => {
    // Monta conexão do MongoDB
    const mongoConnect = require('./lib/mongodb-connect');
    mongoConnect((err, db) => {
      if (!err) {
        app.set('mongodb', db);
      }
      callback();
    });
  },
  graphql: ['mongodb', (_, callback) => {
    // Obtem todas as APIs GraphQL
    const appsGraphQL = require('./lib/scan-apps-graphql')(app.get('mongodb'));
    app.use('/graphql', graphqlHTTP({
      schema: appsGraphQL.schema,
      rootValue: appsGraphQL.root,
      // pretty: true,
      graphiql: (process.env.NODE_ENV !== 'production')
    }));
    callback();
  }]
}, () => {
  // Iniciar servidor
  const port = 4000;
  app.listen(port, () => {
    console.log(`Executando o GraphQL API Server no localhost:${port}/graphql`);
  });
});
