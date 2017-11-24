/**
 * @file Modulo de configurações de Log no Express
 * @author @douglaspands
 * @since 2017-11-24
 */
'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * Função que disponibiliza o modulo de log pra cadastro no express.js
 * @param {function} callback Função para passar o modulo de log.
 * @return {void}
 */
module.exports = (callback) => {

    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');

    let logger = expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            })
        ]
    });

    if (typeof callback === 'function') callback(logger);

}
