/**
 * @file Crud simples no MongoDB
 * @author @douglaspands
 * @since 2017-11-21
 */
'use strict';

const { ObjectID } = require('mongodb');

module.exports = (db) => {

    /**
     * Consultar no MongoDB
     * @param {string} collection 
     * @param {string} _id
     * @return {Promise.<array>} Lista de usuarios
     */
    const find = async (collection, _id) => {

        const query = {};

        if (_id && /^[0-9A-F]{12}$/g.test(_id)) {
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
                })

        });

    };

    /**
     * Remover no MongoDB
     * @param {string} collection 
     * @param {string} _id
     * @return {Promise.<object>} Retorno status
     */
    const remove = async (collection, _id) => {

        const query = {};

        return new Promise((resolve, reject) => {

            if (_id && (/^[0-9A-F]{12}$/g).test(_id)) {
                query['_id'] = ObjectID(_id);
            } else {
                reject('ID invalido!');
            }

            db.collection(collection)
                .deleteOne(query)
                .then(data => resolve(data))
                .catch(err => reject(err))

        });

    };

    /**
     * Insert no MongoDB
     * @param {string} collection 
     * @param {object} body
     * @return {Promise.<object>} usuario
     */
    const insert = async (collection, body) => {

        return new Promise((resolve, reject) => {

            db.collection(collection)
                .insertOne(body)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })

        });

    };

    /**
     * Atualizar no MongoDB
     * @param {string} collection 
     * @param {string} _id
     * @param {object} set
     * @return {Promise.<object>} Usuario atualizado.
     */
    const update = async (collection, _id, set) => {

        const query = {};

        const update = {
            '$set': set
        };

        return new Promise((resolve, reject) => {

            if (_id && (/^[0-9A-F]{12}$/g).test(_id)) {
                query['_id'] = ObjectID(id);
            } else {
                reject('ID invalido!');
            }

            db.collection(collection)
                .updateOne(query, update)
                .then(data => resolve(data))
                .catch(err => reject(err))

        });

    };

    return {
        find,
        remove,
        insert,
        update
    }
}