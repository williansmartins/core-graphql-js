/**
 * @file Cobertura de testes do index.js
 * @author @douglaspands
 * @since 2017-11-24
 */
'use strict';
const path = require('path');
const assert = require('assert');
const _ = require('lodash');

const Context = require('../../../lib/context-app-test');
const pathApp = path.join(__dirname, '..');


describe('# ./index.js', () => {

    let i = 0, context;

    beforeEach(() => {
        context = new Context(pathApp);
    });

    it(`${++i} - ObterFuncionario() - Execução com sucesso`, async () => {

        context.setMock('models/funcionario', {
            obterFuncionario: () => {
                return {
                    nome: 'Joao',
                    empresa: 'CPMGFHJKL'
                }
            }
        });

        const { obterFuncionario } = require('../index')(context);

        const req = {
            _id: '123456789012345678901234'
        };

        const result = await obterFuncionario(req);

        assert.equal(result.nome, 'Joao');
        assert.equal(result.empresa, 'CPMGFHJKL');

    });

});
