//Tipo objeto

const object1: {
    readonly keyA: string;
    keyB: string;
    keyC?: string;
    [key: string]: unknown;
} = {
    keyA: 'valueA',
    keyB: 'valueB',
};

object1.keyC = 'Nova chave';
object1.keyD = 'Nova Chave 2';

