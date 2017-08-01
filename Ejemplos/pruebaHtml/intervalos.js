var intervalID; var segundos = 0;
// Función que crea el timeout
function crearIntervaloDeUnSegundo() {
	intervalID = window.setInterval(imprimirAumentarTiempo, 1000);
}
// Función que muestra un alert
function imprimirAumentarTiempo() { 
	segundos ++;
	console.log("Tiempo: " + segundos + " s.");
}
// Llamamos a la función que crea el timeout
crearIntervaloDeUnSegundo();


// Paramos el intervalo
//clearInterval(intervalID);