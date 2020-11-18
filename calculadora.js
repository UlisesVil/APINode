'use strict'

/*
//esto es para capturar los parametros que se pasan por consola en un array
var params = process.argv.slice(2);

//extraemos individualmente los parametros que pasamos por consola con 
// $ node calculadora.js 1 2 3 4

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);
var numero3 = parseFloat(params[2]);
var numero4 = parseFloat(params[3]);

//esto es lo que mostramos en consola al ejecutar 
// $ node calculadora.js 1 2 3 4
console.log(numero1);
console.log(numero2);
console.log(numero3);
console.log(numero4);
console.log('hola mundo con node JS');
*/

var params = process.argv.slice(2);


var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla =`
La suma es: ${numero1 + numero2}
La resta es: ${numero1 - numero2}
La multiplicacion es: ${numero1 * numero2}
La division es:${numero1 / numero2}
`;
console.log(plantilla);

console.log('hola mundo con node JS');