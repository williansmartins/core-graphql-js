/**
 * @file Motor de APIs em Node.js com GraphQL e MongoDB.
 * @author douglaspands
 * @since 2017-11-22
 */
'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const async = require('async');

const app = express();

async.auto({
  mongodb: (callback) => {
    // Monta conexão do MongoDB
    const mongoConnect = require('./lib/mongodb-connect');
    mongoConnect((err, db) => {
      if (!err) {
        app.set('mongodb', db);
      }
      callback(null, db);
    });
  },
  logger: ['mongodb', (result, callback) => {
    // Configurando de log no Express
    const expressLog = require('./lib/express-log');
    expressLog(result.mongodb, (expressLogger, winstonLogger) => {
      app.use(expressLogger);
      app.set('logger', winstonLogger);
      callback(null, winstonLogger);
    });
  }],
  modules: ['logger', (_, callback) => {
    // Incluindo middlewares do express.js
    const expressModules = require('./lib/express-modules');
    expressModules(app);
    callback();
  }],
  graphql: ['modules', (_, callback) => {
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
}, (_, { logger, graphql }) => {
  // Iniciar servidor
  const port = 4000;
  app.listen(port, () => {
    logger.info(`Executando o GraphQL API Server no localhost:${port}/graphql`);
    graphql.forEach(service => logger.info(`-> GraphQL Service "${service}" registrado`));
  });
});
