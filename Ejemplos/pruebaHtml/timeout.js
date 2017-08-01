// Empieza el JS
// Variable que almacena el ID del timeout
var timeoutID;
// Función que crea el timeout
function mostrarSaludoDentroDeDosSegundos() {
 timeoutID = window.setTimeout(slowAlert, 2000);
 // el time out es importante pos si deseo abortar la ejecución
}
// Función que muestra un alert
function slowAlert() { 
	alert("Hola !!");
}

function clearAlert() { 
	window.clearTimeout(timeoutID);
}

// Llamamos a la función que crea el timeout
mostrarSaludoDentroDeDosSegundos();
//clearAlert();


// Acaba el JS