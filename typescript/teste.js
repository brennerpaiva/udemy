console.log("Hello world!");
var nome = "Brenner";
console.log("Ol\u00E1 ".concat(nome));
var Produto = /** @class */ (function () {
    function Produto(produtoNome, produtoValor) {
        this.nome = produtoNome;
        this.valor = produtoValor;
    }
    return Produto;
}());
