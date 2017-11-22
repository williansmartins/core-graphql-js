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
     * @param {string} _id 
     * @return {object} usuario
     */
    function obterUsuario(_id) {

        return (modelUsuario.obterUsuario(_id))[0];

    }

    /**
     * Incluir usuario
     * @param {object} input usuario que será cadastrado.
     * @return {object} usuario criado 
     */
    function criarUsuario({ input }) {

        return modelUsuario.incluirUsuario(input);

    }

    /**
     * Obter lista de usuarios
     * @return {array} lista de usuarios
     */
    function listarUsuarios() {

        return modelUsuario.obterUsuario();

    }

    /**
     * Atualizar usuario
     * @param {string} _id 
     * @param {object} input usuario que será cadastrado.
     * @return {object} usuario criado 
     */
    function atualizarUsuario(_id, { input }) {

        return modelUsuario.atualizarUsuario(_id, input);

    }

    /**
     * Remover usuario
     * @param {string} _id 
     * @return {object} status 
     */
    function removerUsuario(_id) {

        return modelUsuario.removerUsuario(_id);

    }

    return {
        obterUsuario,
        criarUsuario,
        listarUsuarios,
        atualizarUsuario,
        removerUsuario
    }
}