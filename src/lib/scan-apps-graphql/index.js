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
const { graphqlSchemaIsValid } = require('./utils');

// Diretorio das APIs em GraphQL
const folderApp = 'apps';
const dirApps = path.join(__dirname, '../..', folderApp);

// Sufixo da pasta com o codigo fonte da API
const prefix = 'graphql';

/**
 * Mapear script GraphQL
 * @param {object} db Conexão do MongoDB
 * @return {void} 
 */
module.exports = (db) => {

    const root = {};
    const schemas = [];

    (fs.readdirSync(dirApps)).forEach((pasta) => {

        const dirAPI = path.join(dirApps, pasta);
        const prefixRegex = new RegExp('^' + prefix + '(.+)$', 'g')

        if (prefixRegex.test(pasta) && fs.lstatSync(dirAPI).isDirectory()) {

            let findIndex = '', findGraphQL = '';

            (fs.readdirSync(dirAPI)).forEach((f) => {
                if ((/^(.+).gql$/g).test(f)) {
                    findGraphQL = path.join(dirAPI, f);
                }
                if ((/^index.js$/g).test(f)) {
                    findIndex = path.join(dirAPI, f);
                }
            });

            if (findIndex && findGraphQL) {
                try {
                    const resolverFunction = require(findIndex)(db);
                    const stringSchema = fs.readFileSync(findGraphQL, 'utf8');
                    if (graphqlSchemaIsValid(stringSchema)) {
                        schemas.push(stringSchema);
                        Object.assign(root, resolverFunction);
                    }
                } catch (error) {
                    const regex = new RegExp('(.+)(?=/' + folderApp + ')', 'g');
                    console.log('Erro no registro da API GraphQL:');
                    console.log('\t- Function Resolved.:', findIndex.replace(regex, '.'));
                    console.log('\t- GraphQL Schema....:', findGraphQL.replace(regex, '.'));
                }
            }

        }

    });

    return {
        root: root,
        schema: buildSchema(mergeTypes(schemas))
    };

}

