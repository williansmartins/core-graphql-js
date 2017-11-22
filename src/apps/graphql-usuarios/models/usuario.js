/**
 * @file Model Usuarios
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';

module.exports = (db) => {

    const utils = require('../../utils/mongodb-crud')(db);

    /**
     * Obter usuario.
     * @param {string} id id do usuario.
     * @return {object} usuario.
     */
    async function obter(id) {

        try {
            return (await utils.find('usuarios', id))[0];
        } catch (error) {
            return error;
        }

    }

    /**
     * Incluir usuario.
     * @param {objet} usuario
     * @return {object} usuario.
     */
    async function incluir(usuario) {

        try {
            let ret = (await utils.insert('usuarios', usuario));
            return ret.ops[0];
        } catch (error) {
            return error;
        }

    }

    return {
        obter,
        incluir
    }

}