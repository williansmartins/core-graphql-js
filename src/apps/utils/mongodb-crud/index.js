/**
 * @file CRUD padrão no MongoDB.
 * @author @douglaspands
 * @since 2017-11-21
 */
'use strict';

const { ObjectID } = require('mongodb');

module.exports = (db) => {

    const idRegex = new RegExp('^[0-9a-f]{24}$', 'g');

    /**
     * Consultar no MongoDB
     * @param {string} collection tabela
     * @param {string} _id id
     * @return {Promise.<array>} retorna lista de recursos pesquisado
     */
    async function find(collection, _id) {

        const query = {};

        if (_id && idRegex.test(_id)) {
            query['_id'] = ObjectID(_id);
        }

        return new Promise((resolve, reject) => {

            db.collection(collection)
                .find(query)
                .toArray()
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });

        });

    };

    /**
     * Remover no MongoDB
     * @param {string} collection tabela
     * @param {string} _id id
     * @return {Promise.<string>} retorno o status
     */
    async function remove(collection, _id) {

        const query = {};

        return new Promise((resolve, reject) => {

            if (_id && idRegex.test(_id)) {
                query['_id'] = ObjectID(_id);
            } else {
                reject('ID invalido!');
            }

            db.collection(collection)
                .deleteOne(query)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });

        });

    };

    /**
     * Insert no MongoDB
     * @param {string} collection tabela
     * @param {object} body documento/objeto que sera persistido.
     * @return {Promise.<object>} retorno o proprio documento/objeto com o ID.
     */
    async function insert(collection, body) {

        return new Promise((resolve, reject) => {

            db.collection(collection)
                .insertOne(body)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });

        });

    };

    /**
     * Atualizar no MongoDB
     * @param {string} collection tabela
     * @param {string} _id id
     * @param {object} set objeto com os campo que serão atualizados
     * @return {Promise.<object>} retorna o documento/objeto atualizado
     */
    async function update(collection, _id, set) {

        const query = {};

        const update = {
            '$set': set
        };

        return new Promise((resolve, reject) => {

            if (_id && idRegex.test(_id)) {
                query['_id'] = ObjectID(id);
            } else {
                reject('ID invalido!');
            }

            db.collection(collection)
                .updateOne(query, update)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });

        });

    };

    return {
        find,
        remove,
        insert,
        update
    }
}