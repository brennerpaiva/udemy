console.log("Hello world!");

const nome = "Brenner";

console.log(`Olá ${nome}`);

class Produto {

    nome: string;
    valor: number;

    constructor(produtoNome, produtoValor) {
        this.nome = produtoNome;
        this.valor = produtoValor;
    }
}