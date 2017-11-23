import { error } from "util";

function Verify(objeto) {
    
    //var validator = require("validator");

    let erros = [];
    let elemento;
    let prop;

    function check(propriedade, mensagem) {
        if(!(this instanceof check)) {
            elemento = objeto[propriedade];
            prop = propriedade;
            return new check(propriedade, mensagem);
        }

        this.isEmail = function(valor) {
            valor = valor !== null && valor !== undefined ? valor : elemento;
            /*if(!validator.isEmail(valor)) {
                erros.push({prop : mensagem});
            }*/
            return this;
        }

    }

    return {
        check : check,
        erros : erros
    }

       
}

/*var v = new Verify("A");
var {check, erros} = v.check("A", "A").isEmail();

if(erros.length === 0) {
    // sobe graphql
} else {
    new GraphQLError(`Error: ${erros}`);
}*/