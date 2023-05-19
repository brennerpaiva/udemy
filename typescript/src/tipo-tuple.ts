//Tuple
const dadosDoCliente1: [number, string] = [1, 'Brenner'];
const dadosDoCliente2: [number, string, string] = [1, 'Brenner', 'Paiva'];
const dadosDoCliente3: [number, string, string?] = [1, 'Brenner'];
const dadosDoCliente4: [number, string, ...string[]] = [1, 'Brenner', 'Paiva'];

// dadosDoCliente1[0] = 100;
// dadosDoCliente1[1] = 'Carlos';

console.log(dadosDoCliente1);
console.log(dadosDoCliente2);
console.log(dadosDoCliente3);
console.log(dadosDoCliente4);


//readonly array
const array1: readonly string[] = ['Luiz', 'Otavio']
const array2: ReadonlyArray<string> = ['Luiz', 'Otavio']

console.log(array1)
console.log(array2)
