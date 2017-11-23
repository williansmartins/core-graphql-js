/**
 * @file Modulo de validação de campos
 * @author Victor Tripeno
 * @author @douglaspands
 * @since 2017-11-23
 */
'use strict';
const validator = require('validator');
const _ = require('lodash');
const moment = require('moment');
const { GraphQLError } = require('graphql');
/**
 * Modulo de verificação do objeto.
 * @param {object} objeto Objeto que será inspecionado.
 * @return {object} Retorna a função "check" para validação do campo.
 */
function verify(objeto) {

    let listaErros = [];

    /**
     * Função que recebe o campo e a mensagem de erro.
     * @param {string} propriedade Nome da propriedade validada. 
     * @param {string} mensagem Mensagem que será exibida em caso de erro. 
     */
    function check(propriedade, mensagem) {

        if (!(this instanceof check)) {
            return new check(propriedade, mensagem);
        }

        let flgErro = false, flgValidation = true;
        let elemento = _.get(objeto, propriedade); // esportes[1]

        (Object.keys(validator)).forEach((m) => {

            this[m] = (arg1) => {

                if (!flgValidation) return this;

                let args = [];
                args.push(elemento);
                if (arg1) args.push(arg1);

                let ret = validator[m].apply(this, args);
                if (!ret && !flgErro) {
                    listaErros.push({
                        campo: propriedade,
                        valor: elemento,
                        mensagem: mensagem
                    })
                    flgErro = true;
                }
                return this;
            }

            /**
             * Função para tornar a validação opcional caso o campo esteja vazio.
             * @return {void}
             */
            this.isOptional = () => {

                if (!elemento) flgValidation = false;
                return this;

            }



            /**
             * Função de validação customizada.
             * @param {function} callback Função que retornara true ou false
             * @return {void} 
             */
            this.custom = (callback) => {
                
                if (!flgValidation) return this;

                if (typeof callback === 'function') {
                    let ret = callback(elemento);
                    if (!ret && !flgErro) {
                        listaErros.push({
                            campo: propriedade,
                            valor: elemento,
                            mensagem: mensagem
                        })
                        flgErro = true;
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
        if (listaErros.length > 0) {
            throw new GraphQLError(listaErros);
        }
    }

    /**
     * Funções retornadas.
     */
    return {
        check,
        listaErros,
        verifyGraphQL
    }
}

module.exports = verify;
