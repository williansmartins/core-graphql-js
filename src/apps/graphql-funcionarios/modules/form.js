/**
 * @file Modulo para validar os parametros de entrada.
 * @author Victor Tripeno
 * @since 2017-11-23
 */
'use strict';

module.exports = ({ getModule }) => {

    const validator = getModule('utils/validator');

    function validar (funcionario) {

        const { check, verifyGraphQL } = validator(funcionario);

        check('nome', 'Nome invalido').isEmail();
        check('sobrenome', 'Sobrenome invalido').isEmail();

        verifyGraphQL();
    }

    return validar;

}