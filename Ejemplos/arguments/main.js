// =====.   Ejemplo arguments
/*
function miConcat(separator){
	var resultado = "";

	for (var i = 1; i < arguments.length; i++)
		resultado += arguments[i] + separator;
	return resultado;

}

console.log (miConcat(", ", "rojo", "naranja", "azul"));
// El resultado es   ==> rojo, naranja, azul, 

console.log (miConcat(". ", "salvia", "albahaca", "oregano", "pimineta", "perejil"));
// El resultado es salvia. albahaca. oregano. pimineta. perejil. 

*/


// =====. Ejemplo Call Back 

/*
function generarNumeroAleatorioEntre(minimo, maximo, miCallBack) {
    var anchoFranjaNumerica = (maximo - minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
    miCallBack(numero);
    return numero;
}

var miCallBack = function(numeroGenerado){
	console.log("He acabado de generar el numero: "+numeroGenerado);
} 	

var aleatorio = generarNumeroAleatorioEntre(0, 100, miCallBack);
*/


