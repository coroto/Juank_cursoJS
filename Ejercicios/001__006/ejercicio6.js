/*

Ejercicio:

Completa las funciones siguientes para tener un conjunto de operaciones que 
traten nuestros arrays realizando diversas transformaciones sobre ellos.

Finalizado el ejercicio podrás probar que funciona correctamente con los tests del final.

Nota: puede que alguna de las siguientes funciones te sea de ayuda:

isFinite(), splice(), unshift(), push(), join(), sort(), Math.floor()

Puedes encontrar más en: https://developer.mozilla.org/en-US/docs/Web/JavaScript y http://www.w3schools.com/js/default.asp

*/


function vaciarPapelera(array) {
    // Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)
    // Por ejeplo:
    // vaciarPapelera(['a',1,'*',5]) 
    // debe devolver:
    // ['a',1,5]
    console.warn(" -- Función vaciarPapelera");
    //for(i=0; i < array.length; i++){
    for(i=array.length; i >= 0; i --){
        if (array[i] == "*"){
            array.splice([i],1)
            // console.log("Hay un *");
        }

    }
    console.error("Mi array modificado " + array);
    return array;
    
}

function agruparElementos(array) {
    // Esta función debbe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
    // En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.
    // Por ejemplo: 
    // agruparElementos(['B', 'a', 4 , 23, 'J']) 
    // debe devolver:
    // [23, 4, 'B', 'a', 'J']
    console.warn(" -- Función agruparElementos");
    numeros = [];
    letras = [];

    for(i=0; i < array.length; i++){
        if (typeof(array[i]) == "number"){
            numeros.push(array[i]);
        }else{
            letras.push(array[i]);
        }
    }
    array = numeros.concat(letras);
    console.error("Mi array modificado "+ array);
    array.sort();
    return array;
}

function ponerBonitasLasLetras(array) {
    // Esta función debe recibir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
    // y las consonantes en minúsculas. Los números no deben ser tratados.
    // Por ejemplo:
    // ponerBonitasLasLetras([1,5,7,'a','J',p,'E'])
    // debe devolver:
    // [1,5,7,'A','j',p,'E']
    console.warn(" -- Función ponerBonitasLasLetras");
    cadena = [];
    for(i=0; i < array.length; i++){
        if (typeof(array[i]) != "number"){
            if (array[i] == 'a' || array[i] == 'e' || array[i] == 'i' || array[i] == 'o' || array[i] == 'u'){
                vocal = array[i].toUpperCase();
                cadena.push(vocal);  
            }else{
                constante = array[i].toLowerCase();
                cadena.push(constante);  
            } 

        }else{
            cadena.push(array[i]);
        }
    }
    console.error("Mi array modificado es " + cadena);
    return cadena;
}


function ponerBonitosLosNumeros(array) {
    // Esta función debe recibir un array de números y letras, y devolverlo con los números "bonitos". 
    // Las letras no deben cambiar. 
    // Para poner bonito número debemos sumar todas sus cifras.
    // en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
    // 123 se convertirá en 6 porque 1+2+3 = 6
    // 9 se convertirá en 9
    // 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
    // 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1
    // Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.
    console.warn(" -- Función ponerBonitosLosNumeros");
	var cadena = [];
	for(i=0; i < array.length; i++){
        var arreglo = array[i];
		if(typeof(arreglo) == "number"){          
			while (arreglo.toString().length > 1){
                var suma = 0;
                var numero = arreglo.toString().split("");
                for(j=0; j<numero.length; j++){
                    suma= parseInt(numero[j])+suma;
                   // suma= +numero[j]+suma;  // se antepone el + lo toma como numero
                } 
               arreglo = suma;
               //console.log ("mi numero " + arreglo); 
            }
			cadena.push(arreglo); 
		}else{
			//console.log("no es numero");
			cadena.push(arreglo); 
		}
	}
		console.error("Mi array modificado es " + cadena);
	return cadena;
}

function arrayToString(array) {
    //Esta función debe recibir un array y devolver un string con todos sus elementos
    //Ejemplo: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) dee devolver "1455AbEj"
    console.warn(" -- Función arrayToString");
	string = array.join("");
	//console.log(string);
    console.error("Mi cadena Modificada " + string);
    return string;
}

// Tests

function transformacionCompletaDelArray(array) {
    array = vaciarPapelera(array);
    array = agruparElementos(array);
    array = ponerBonitasLasLetras(array);
    array = ponerBonitosLosNumeros(array);
    array = arrayToString(array);
    
    return array;
}

console.log (" TEST 1 === ['a', 6, B', 'F', '*', 8, 78, 9956, 'J']");
console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, 9956, "J"]) === "668bfjA");
console.log (" TEST 2 === ['*', 'j', 6, 'A', 'F', '*', 8, 'C', 'b', 'a', 78, 'J', 43523, 1111, 'r', 'q', 'y']");
console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "48668AcfjAbjqry");


//console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", "*", 8, 78, "J"]) === "668Abfj");
//console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "46688AAbcfjjqry");
