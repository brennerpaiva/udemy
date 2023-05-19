let x;
if (typeof x === 'undefined') x = 20;
console.log(x * 2);

export function createPerson(
    firstName: string, //abertura da funçao
    lastName?: string,
): {
    firstName: string; //type annotation
    lastName?: string;
} {
    return {
        firstName, //corpo da função
        lastName,
    };
}

export function squareOf(x: any) {
    if (typeof x === 'number') return x * x;
    return null
}

const squareOfTwoNumber = squareOf(2);
const squareOfTwoString = squareOf('2')

if (squareOfTwoString === null) {
    console.log('Conta inválida')
} else {
    console.log(squareOfTwoString * 100);
}

