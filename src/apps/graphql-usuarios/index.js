/**
 * @file Controller
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';

module.exports = (db) => {

    const modelUsuario = require('./models/usuario')(db);

    /**
     * Obter usuario atraves do id
     * @param {string} id 
     * @return {object} usuario
     */
    async function obterUsuario({ _id }) {

        const ret = (await modelUsuario.obterUsuario(_id));
        return ret;

    }

    /**
     * Incluir usuario
     * @param {object} input usuario que será cadastrado.
     * @return {object} usuario criado 
     */
    async function criarUsuario({ input }) {

        const ret = (await modelUsuario.incluirUsuario(input));
        return ret;

    }

    /**
     * Obter lista de usuarios
     * @return {array} lista de usuarios
     */
    async function listarUsuarios() {

        const ret = (await modelUsuario.pesquisarUsuarios({}));
        return ret;

    }

    /**
     * Atualizar usuario
     * @param {string} _id 
     * @param {object} input usuario que será cadastrado.
     * @return {object} usuario criado 
     */
    async function atualizarUsuario(usuario) {

        const _id = usuario._id, body = usuario;
        delete body._id;
        const ret = (await modelUsuario.atualizarUsuario(_id, body));
        return ret;

    }

    /**
     * Remover usuario
     * @param {string} _id 
     * @return {object} status 
     */
    async function removerUsuario({ _id }) {

        const ret = (await modelUsuario.removerUsuario(_id));
        return ret;

    }

    return {
        obterUsuario,
        criarUsuario,
        listarUsuarios,
        atualizarUsuario,
        removerUsuario
    }
}