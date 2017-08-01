/*
Reutiliza la función del ejercicio anterior e introduce las siguientes mejoras:

1) Si introducimos un valor no numérico deberá mostrar el mensaje: "Debes introducir un valor numérico."
2) Si introducimos un valor numérico que no tenga 8 cifras deberá mostrar: "Debes introducir un número de 8 cifras."
3) Si introducimos un valor numérico negativo deberá mostrar: "Debes introducir un valor positivo."
*/

function letraDni(dni){
	var letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	var residuo = null;
	residuo = dni % 23;
	//for (var indice=0; indice<letras.length; indice++)
	for (var indice=0; indice<residuo; indice++){
		var letra = letras[residuo];
	}
	console.log("Su Letra es: " + letra);
	document.write("Su DNI es:" +dni+letra );
	return letra;
}

function validaNumerico(dni){
	if (typeof(dni) == "number"){
		console.log("Es numerico");
		return true;
	}
	else{
		console.log("No es numerico");
		return false;
	}

}

function validaLongitud(dni){
	longitud = null;
	longitud = dni.toString().length;
	if (longitud < 8){
		console.log("Longitud invalida");
		return false;
	} else{
		console.log("Longitud Ok");
		return true;
	}

}

function validaPositivo(dni){
	if (dni < 0){
		console.log("negativo");
		return false;
	}else{
		console.log("Positivo");
		return true;
	}
}

function completa(dni){
	if(validaNumerico(dni)){
		if(validaLongitud(dni)){
			if(validaPositivo(dni)){
				// TODO ha ido bien
				console.log("La letra es:");
				letraDni(dni);
			}else{
				console.log("Error no positivo")
			}
		}else{
			console.log("Error de longitud");
		}
	}else{
		console.log("Error de numer");
	}
}

completa(12312312);

















