/**
 * @file Controller
 * @author @douglaspands
 * @since 2017-11-22
 */
'use strict';

module.exports = (app) => {

    function usuarios() {
        return [{
            _id: 12345678,
            nome: 'Douglas Panhota'
        }]
    }

    return {
        usuarios
    }
}