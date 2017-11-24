/**
 * @file Servidor de GraphQL
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const async = require('async');

const app = express();

async.auto({
  logger: (callback) => {
    // Configurando de log no Express
    const expressLog = require('./lib/express-log');
    expressLog((log) => {
      app.use(log);
      callback();
    });
  },
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
    const { schema, root } = require('./lib/scan-apps-graphql')(app);
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      // pretty: true,
      graphiql: (process.env.NODE_ENV !== 'production')
    }));
    callback(null, Object.keys(root));
  }]
}, (_, { graphql }) => {
  // Iniciar servidor
  const port = 4000;
  app.listen(port, () => {
    console.log(`\nExecutando o GraphQL API Server no localhost:${port}/graphql`);
    graphql.forEach(service => console.log(`-> GraphQL service "${service}" registrado`));
  });
});
