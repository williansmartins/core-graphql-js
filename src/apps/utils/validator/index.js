/**
 * @file Modulo de validação de campos
 * @author Victor Tripeno
 * @author @douglaspands
 * @since 2017-11-23
 */
'use strict';
const _ = require('lodash');
const moment = require('moment');
const validator = require('validator');
const { GraphQLError } = require('graphql');
/**
 * Modulo de verificação do objeto.
 * @param {object} objeto Objeto que será inspecionado.
 * @return {object} Retorna a função "check" para validação do campo.
 */
function inspection(objeto) {

    let listaErros = [];

    /**
     * Função que recebe o campo e a mensagem de erro.
     * @param {string} propriedade Nome da propriedade validada. 
     * @param {string} mensagemErro Mensagem que será exibida em caso de erro. 
     */
    function checkField(propriedade, mensagemErro) {

        if (!(this instanceof checkField)) {
            return new checkField(propriedade, mensagemErro);
        }

        let flgErro = false, flgValidation = true;
        let elemento = _.get(objeto, propriedade);

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
                        mensagem: mensagemErro
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
             * Função para verificar se data é valida. 
             * @return {void}
             */
            this.isDateValid = () => {

                if (!flgValidation) return this;

                let ret = moment(elemento).isValid();
                if (!ret && !flgErro) {
                    listaErros.push({
                        campo: propriedade,
                        valor: elemento,
                        mensagem: mensagemErro
                    })
                    flgErro = true;
                }
                return this;

            }

            /**
             * Função para verificar o texto faz parte de uma lista.
             * @param {array} lista 
             * @return {void}
             */
            this.isIn = (lista) => {

                if (!flgValidation) return this;

                let _lista = Array.isArray(lista) ? lista : [];
                let ret = _.includes(_lista, elemento);
                if (!ret && !flgErro) {
                    listaErros.push({
                        campo: propriedade,
                        valor: elemento,
                        mensagem: mensagemErro
                    })
                    flgErro = true;
                }
                return this;

            }

            /**
             * Função para verificar o texto não esta vazio.
             * @return {void}
             */
            this.notEmpty = (lista) => {

                if (!flgValidation) return this;

                let ret = !_.isEmpty(elemento);
                if (!ret && !flgErro) {
                    listaErros.push({
                        campo: propriedade,
                        valor: elemento,
                        mensagem: mensagemErro
                    })
                    flgErro = true;
                }
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
                            mensagem: mensagemErro
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
    function verifyGraphQL() {
        if (listaErros.length > 0) {
            throw new GraphQLError(listaErros);
        }
    }

    /**
     * Retorna lista de erros.
     * @return {array} lista de erros.
     */
    function getListErrors() {
        return listaErros;
    }

    /**
     * Funções retornadas.
     */
    return {
        checkField,
        getListErrors,
        verifyGraphQL
    }
}

module.exports = inspection;
