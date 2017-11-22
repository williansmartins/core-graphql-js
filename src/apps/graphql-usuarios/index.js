/**
 * @file Controller
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';

module.exports = (db) => {

    const usuario = require('./models/usuario')(db);

    function obterUsuario(id) {

        return usuario.obter(id);

    }

    function criarUsuario({ input }) {

        return usuario.incluir(input);

    }

    function listarUsuarios() {

        return usuario.obter('');

    }

    return {
        obterUsuario,
        criarUsuario,
        listarUsuarios
    }
}