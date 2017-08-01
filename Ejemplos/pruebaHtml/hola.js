// function funcionalidadDeMiBoton(){
// 	alert("quieto!!");
// }


// function laPaginaSeHaCargado(){
// 	alert("ya ha terminado la carga de la página");
// }

// window.onload = laPaginaSeHaCargado;

// manejo de excepciones try catch
try{
	// Definimos un JSON erroneo
	var jsonErroneo = "{ var: 123123, hola: ";
	// Tratamos de convertirlo a objeto (fallará)
	var json = JSON.parse(jsonErroneo);
	// Si no ha fallado nada deberíamos imprimir esta línea
	console.log("Hemos conseguido terminar el bloque try !!"); 
}

catch(e){
	console.log("No se ha podido ejecutar el bloque try !!"); 
	console.log("Excepcion:");
	console.log(e);
}