let nome: string = 'Brenner'; //Qualquer tipo de string
let idade: number = 21; // 10, 1.57, 0xf00d, -0.23
let adulto: boolean = true; // true or false
let simbolo: symbol = Symbol('qualquer simbolo'); //symbol

//Arrays
let arraysOfNumbers: Array<number> = [1, 2, 3, 4];
let arraysOfNumbers2: number[] = [1, 2, 3, 4];
let arraysOfString: Array<string> = ['a', 'b', 'c'];
let arraysOfString2: string[] = ['a', 'b', 'c'];

//Objetos
// ? => opcinal
let pessoa: { nome: string; idade: number; adulto?: boolean } = {
    nome: 'Brenner',
    idade: 21,
};

//Função
function soma(x: number, y: number) {
    return x + y;
}
const result = soma(2, 2);
