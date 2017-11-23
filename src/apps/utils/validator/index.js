/**
 * @file Modulo de validação de campos
 * @author Victor Tripeno
 * @author @douglaspands
 * @since 2017-11-23
 */
'use strict';
const validator = require('validator');
const _ = require('lodash');
const { GraphQLError } = require('graphql');
/**
 * Modulo de verificação do objeto.
 * @param {object} objeto Objeto que será inspecionado.
 * @return {object} Retorna a função "check" para validação do campo.
 */
function verify(objeto) {

    let erros = [];
    let elemento;

    /**
     * Função que recebe o campo e a mensagem de erro.
     * @param {string} propriedade Nome da propriedade validada. 
     * @param {string} mensagem Mensagem que será exibida em caso de erro. 
     */
    function check(propriedade, mensagem) {

        if (!(this instanceof check)) {
            return new check(propriedade, mensagem);
        }

        elemento = _.get(objeto, propriedade); // esportes[1]

        (Object.keys(validator)).forEach((m) => {

            this[m] = (arg1) => {

                let args = [];
                args.push(elemento);
                if (arg1) args.push(arg1);

                let ret = validator[m].apply(this, args);
                if (!ret) {
                    console.log("LOG metodo corrente " + m);
                    console.log("LOG x " + ret);
                    erros.push({
                        campo: propriedade,
                        valor: elemento,
                        mensagem: mensagem
                    })
                }
                return this;
            }

            /**
             * Função de validação customizada.
             * @param {function} callback Função que retornara true ou false
             * @return {void} 
             */
            this.custom = (callback) => {
                if (typeof callback === 'function') {
                    let ret = callback(elemento);
                    if (!ret) {
                        console.log("LOG metodo custom " + m);
                        console.log("LOG valor custom " + ret);
                        erros.push({
                            campo: propriedade,
                            valor: elemento,
                            mensagem: mensagem
                        })
                    }
                }
                return this;
            }

        });

    }

    /**
     * Função para emitir evento de erro para o GraphQL.
     * @return {void}
     */
    function verifyGraphQL () {
        if (erros.length > 0) {
            let _erros = JSON.stringify(erros);
            throw new GraphQLError(erros);
        }
    }

    /**
     * Funções retornadas.
     */
    return {
        check,
        erros,
        verifyGraphQL
    }
}

module.exports = verify;
