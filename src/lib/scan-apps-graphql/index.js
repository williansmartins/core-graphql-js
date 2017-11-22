/**
 * @file Modulo de merge do GraphQL.
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';
const { buildSchema } = require('graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const fs = require('fs');
const path = require('path');

const dirApps = path.join(__dirname, '../..', 'apps');

module.exports = (app) => {

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
                let _root;
                try {
                    _root = require(findIndex).root(app);
                    let stringSchema = fs.readFileSync(findGraphQL, 'utf8');
                    buildSchema(stringSchema);
                    schemas.push(stringSchema);
                    Object.assign(root, _root)
                } catch (error) {
                    console.log(`Erro na montagem no GraphQL: ${error}`);
                }
            }
    
        }
    
    });
    
    let retorno = {};
    retorno.root = root;
    let concatTypes = mergeTypes(schemas);
    retorno.schema = buildSchema(concatTypes);
    
    return retorno;

}

