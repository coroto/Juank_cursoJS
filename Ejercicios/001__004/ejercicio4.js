/*

Vamos a complicar el ejercicio anterior:
Ahora cada vez que calculemos la longitud del string más largo, almacenaremos el resultado en un array de resultados.
Una vez ejecutados varios cálculos de longitud (4 en el ejemplo), vamos a calcular la media de los resultados.

*/

function calculoLongitudMasLargo(array){
	var longitud = 0;

	for (var indice=0; indice<array.length; indice++)
	{
		var x = array[indice].length;

		if (longitud < x){	
			longitud = x;
		}
	}
	console.log("el mayor" + longitud);
	return longitud;
}

function media (resultados){
	mediaresultado = 0;

	for (var indice=0; indice<resultados.length; indice++){
		mediaresultado =  mediaresultado + resultados[indice];
	}
		mediaresultado  = mediaresultado / resultados.length;

	console.log("la media es: " + mediaresultado);
	return mediaresultado;
	
}


var resultados = [];

var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];


resultados.push(calculoLongitudMasLargo(arrayDeTest1));
resultados.push(calculoLongitudMasLargo(arrayDeTest2));
resultados.push(calculoLongitudMasLargo(arrayDeTest3));
resultados.push(calculoLongitudMasLargo(arrayDeTest4));

console.log(resultados);

// resultados = [6, 7, 5, 19];
media(resultados); // ==> 9,25