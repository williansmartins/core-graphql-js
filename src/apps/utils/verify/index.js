function Verify(objeto) {
    
    //var validator = require("validator");

    var erros = [];
    var elemento;

    this.check = function(propriedade) {
        elemento = objeto[propriedade];
        return this;
    }

    this.isEmail = function(valor) {
        valor = valor !== null && valor !== undefined ? valor : elemento;
        return this;
    }
}