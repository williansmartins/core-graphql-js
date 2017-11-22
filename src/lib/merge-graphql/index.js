/**
 * @file Modulo de merge do GraphQL.
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';
const { buildSchema } = require('graphql');
const { mergeResolvers } = require('merge-graphql-schemas');
const fs = require('fs');
const path = require('path');

const dirApps = path.join(__dirname, '../..', 'apps');

let root = {};
let schemas = [];

(fs.readdirSync(dirApps)).forEach((pasta) => {

    let dirAPI = path.join(dirApps, pasta);

    if (/^(graphql)(.+)$/g.test(pasta) && fs.lstatSync(dirAPI).isDirectory()) {

        let files = fs.readdirSync(dirAPI);
        let findIndex = '', findGraphQL = '';

        files.forEach((f) => {
            if (/^(.+).gql$/g.test(f)) {
                findGraphQL = path.join(dirAPI, f);
            }
            if (/^index.js$/g.test(f)) {
                findIndex = path.join(dirAPI, f);
            }
        });

        if (findIndex && findGraphQL) {
            let _root, _schema;
            try {
                _root = require(findIndex).root;
                let stringSchema = fs.readFileSync(findGraphQL, 'utf8');
                let objectSchema = buildSchema(stringSchema);
                _schema = objectSchema;
            } catch (error) {
                console.log(`Erro na montagem no GraphQL: ${error}`);
            } finally {
                Object.assign(root, _root)
                schemas.push(_schema)
            }
        }

    }

});

let retorno = {};
retorno.root = root;
retorno.schema = mergeResolvers(schemas);

module.exports = retorno;
