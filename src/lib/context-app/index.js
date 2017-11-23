/**
 * @file Modulo de apoio
 * @author @douglaspands
 * @since 2017-11-23
 */
'use strict';
const path = require('path');

function Context(pathApp, server) {

    const _pathApp = pathApp;
    const _db = server.get('mongodb');

    /**
     * Obter conexão com o MongoDB
     */
    this.db = _db;

    /**
     * Obter modulos locais.
     * @param {string} name Nome do modulo
     * @param {boolean} self "true" - Executa a primeira função passando o "this".
     * @return {object} Conexão com o MongoDB
     */
    this.getModule = (name, self) => {
        if (typeof name !== 'string') {
            return undefined;
        }
        const _self = (typeof self === 'boolean') ? self : false;
        const _name = name;
        let _mod;
        try {
            let _dir = path.join(_pathApp, _name);
            _mod = require(_dir);
            if (_self) _mod = _mod(this);
        } catch (err1) {
            try {
                let _dir = path.join(_pathApp, '..', _name);
                _mod = require(_dir);
                if (_self) _mod = _mod(this);
            } catch (err2) {
                console.log(`${err1}\n${err2}`);
                _mod = undefined;
            }
        } finally {
            return _mod;
        }
    }

}

module.exports = Context;

