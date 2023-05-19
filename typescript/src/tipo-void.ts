//tipo void => Quando uma função não retorna nada, vamos colocar o tipo void

function semRetorno(...args: string[]): void {
    console.log(args.join(' '));
}

const pessoa = {
    nome: 'Brenner',
    sobrenome: 'Paiva',

    exibirNome(): void {
        console.log(this.nome + ' ' + this.sobrenome);
    },
};

semRetorno('Brenner', 'Paiva');
pessoa.exibirNome();

export { pessoa };
