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
    async function obterUsuario(id) {

        try {
            return (await utils.find('usuarios', id));
        } catch (error) {
            return error;
        }

    }

    /**
     * Incluir usuario.
     * @param {objet} usuario
     * @return {object} usuario.
     */
    async function incluirUsuario(usuario) {

        try {
            let ret = (await utils.insert('usuarios', usuario));
            return ret.ops[0];
        } catch (error) {
            return error;
        }

    }

    /**
     * Atualizar usuario.
     * @param {string} id
     * @param {object} usuario
     * @return {object} usuario.
     */
    async function atualizarUsuario(id, usuario) {

        try {
            let ret = (await utils.update('usuarios', id, usuario));
            return ret;
        } catch (error) {
            return error;
        }

    }

    /**
     * Remover usuario.
     * @param {string} id id do usuario.
     * @return {object} usuario.
     */
    async function removerUsuario(id) {

        try {
            return (await utils.remove('usuarios', id));
        } catch (error) {
            return error;
        }

    }

    return {
        obterUsuario,
        incluirUsuario,
        atualizarUsuario,
        removerUsuario
    }

}