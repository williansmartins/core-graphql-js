/**
 * @file Modulo de configurações de Log no Express
 * @author douglaspands
 * @since 2017-11-24
 */
'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb').MongoDB;

/**
 * Função que disponibiliza o modulo de log pra cadastro no express.js
 * @param {function} callback Função para passar o modulo de log.
 * @return {void}
 */
module.exports = (db, callback) => {

    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');

    const logger = expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.MongoDB({
                db: db
            })
        ]
    });

    if (typeof callback === 'function') callback(logger);
    else return logger;

}
