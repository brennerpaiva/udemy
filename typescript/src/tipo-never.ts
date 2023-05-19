//Never  A função funca retorna nada

export function criaErro(): never {
    throw new Error('Erro qualquer');
}

criaErro();
