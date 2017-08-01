/*

Realiza una función que reciba un string y devuelva un objeto contando el 
número de apariciones de cada letra en el string.
Almacena y devuelve el resultado en un objeto.

Asegúrate de que la función cumple su cometido haciendo uso de los tests aportados.

*/
function contadorDeCaracteres(cadena){
	var resultado = {}

	var arrayDeCaracteres = cadena.split("");
    //var repeticion = 0;
	//console.log(typeof(arrayDeCaracteres));

	for(i=0; i < arrayDeCaracteres.length; i++){
    	var letra = arrayDeCaracteres[i];
    	console.log(letra);

    // si no tenemos registrada la letra la registramos con 0 Apariciones
    	if(!resultado[letra]){
    		resultado[letra] = 0;
    	}
    	// contramos una aparición mas
    	resultado[letra] = resultado[letra] + 1;
    }

	console.log(resultado);

	return resultado;
}

contadorDeCaracteres("abbabcbdbabdbdbabababcbcbab");

// resultado = contadorDeCaracteres("abbabcbdbabdbdbabababcbcbab");
//console.log( resultado['a']);

//resultadoContador = contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz");
//console.log( resultadoContador.x);