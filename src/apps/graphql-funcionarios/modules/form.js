/**
 * @file Modulo para validar os parametros de entrada.
 * @author @douglaspands
 * @author Victor Tripeno
 * @since 2017-11-23
 */
'use strict';

module.exports = ({ getModule }) => {

    const validator = getModule('utils/validator');

    function validar (funcionario) {

        const { check, verifyGraphQL } = validator(funcionario);

        check('_id', 'ID invalido').isOptional().isMongoId();
        check('nome', 'Nome invalido').isOptional().isEmpty();
        check('sobrenome', 'Sobrenome invalido').isOptional().isEmpty();

        verifyGraphQL();
    }

    return validar;

}