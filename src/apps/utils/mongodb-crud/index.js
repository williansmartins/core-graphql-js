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
     * @param {string} id 
     */
    const find = async (collection, id) => {

        const query = {};

        if (id && /^[0-9A-F]{12}$/g.test(id)) {
            query['_id'] = ObjectID(id);
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
     * @param {string} id 
     */
    const remove = async (collection, id) => {

        const query = {};

        return new Promise((resolve, reject) => {

            if (id && (/^[0-9A-F]{12}$/g).test(id)) {
                query['_id'] = ObjectID(id);
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
     * @param {string} id 
     */
    const update = async (collection, id, set) => {

        const query = {};

        const update = {
            '$set': set
        };

        return new Promise((resolve, reject) => {

            if (id && (/^[0-9A-F]{12}$/g).test(id)) {
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