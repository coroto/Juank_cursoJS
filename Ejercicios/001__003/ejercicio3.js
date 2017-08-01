
/* Ejercicio: 001__003
   Realiza una función que reciba un array de strings y devuelva la longitud del string más largo
*/
function longitudArray(array){
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

var arrai = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga","otra"];

longitudArray(arrai);

// var misStrings = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
// 	var calculoString = function(misStrings){
// 		var maximoNumeroCaracteres = 0;

// 		var guardarNUmerosSiEsMasAlto = function(numero)
// 		misStrings.forEach();


// 		return maximoNumeroCaracteres;

// }



// var calculoString = function(string){
// 	var maxCaracteres = 0;
// 	var loggitudMasGrande = function(string){
// 		if(string.length > maxCaracteres){
// 			maxCaracteres = string.length; 
// 		}
// 	}
// 	string.forEach(guardaMasGrande);
// 	return maxCaracteres;
// }