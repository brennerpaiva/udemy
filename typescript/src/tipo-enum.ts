enum Cores {
    VERMELHO = 10,
    AZUL = 20,
    AMARELO = 30,
}

//Os dois enums vão se unir
enum Cores {
    ROXO = 'ROXO',
    VERDE = 201,
    ROSA,
}

function escolhaACor(cor: Cores): void {
    console.log(Cores[cor])
}

escolhaACor(10)

console.log(Cores.VERMELHO);
console.log(Cores[10]);
console.log(Cores);
