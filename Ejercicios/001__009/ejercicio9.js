/*

Ejercicio 001__009: 
Realiza las funciones siguientes 

*/


// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase!" debe devolver "!esalc aloH"
function stringInverso(string) {
	var cadena = string.split("");
	var cadenaInvertida = [];

	for(i=cadena.length-1	; i >= 0; i --){
		valor = cadena[i];
		cadenaInvertida.push(valor);
	}
	string = cadenaInvertida.join("");
	//string.replace(",","");
	console.log("cadena invertida: " + string);
	return string;
}


// Esta función debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
	// Con expresión regular
	var cadena=string;
	cadena = cadena.replace(/\s/g, '');
	console.log ("Cadena sin espacios: " + cadena);
	return cadena;
}

// Esta función debe recinir un string y devolverlo con todas sus letras mayúsculas
function ponerTodasLasLetrasMayusculas(string){
	var cadena=string;
	cadena=cadena.toUpperCase();
	console.log ("Cadena En mayúsculas: " + cadena);
	return cadena;
}

// Esta función debe recibir un string y decir si es un palíndromo (true / false)
// Un palíndromo es una frase que se lee igual al derecho que al revés
// Haz uso de las tres funciones anteriores
function esPalindromo(string) {
	var cadenaEntrada = string;
	var cadenaAuxiliar = string;

	cadenaEntrada = eliminarEspacios(cadenaEntrada);
	cadenaEntrada = ponerTodasLasLetrasMayusculas(cadenaEntrada);
	cadenaAuxiliar = eliminarEspacios(cadenaAuxiliar);
	cadenaAuxiliar = ponerTodasLasLetrasMayusculas(cadenaAuxiliar);
	cadenaAuxiliar = stringInverso(cadenaAuxiliar);
	if (cadenaEntrada == cadenaAuxiliar){
		console.log("Es palindromo");
		return true;
	}
	console.log("No es palindromo");
	return false;
}


function validaStringCompleto(string) {
    string = stringInverso(string);
    string = eliminarEspacios(string);
    string = ponerTodasLasLetrasMayusculas(string);
    string = esPalindromo(string);   
    return string;
}

console.log("esta es mi cadena " + "Ana lava lana");
console.log(validaStringCompleto("Ana lava lana1"));
//  Ejemplos de palíndromos:

// Arde ya la yedra
// Ana lava lana
// Anita lava la tina

