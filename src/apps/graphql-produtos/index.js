/**
 * @file Controller
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';

module.exports = (app) => {

    function produtos() {

        return [{
            _id: 12345678,
            nome: 'Desodorante Axe',
            volume: '200ml'
        }]
        
    }  

    return {
        produtos
    }
}