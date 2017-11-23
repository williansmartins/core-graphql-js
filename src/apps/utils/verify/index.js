function Verify(objeto) {
    
    //var validator = require("validator");

    var erros = [];
    var elemento;
    var prop;

    this.check = function(propriedade) {
        elemento = objeto[propriedade];
        prop = propriedade;
        return this;
    }

    this.isEmail = function(valor) {
        valor = valor !== null && valor !== undefined ? valor : elemento;
        /*if(!validator.isEmail(valor)) {
            erros.push({prop : elemento});
        }*/
        return this;
    }
}