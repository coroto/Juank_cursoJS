// var persona1 ={
// 	nombre : "juan",
// 	apellido : "Mellizo"
// }

// var persona2 ={
// 	nombre : "Marce",
// 	apellido : "Corchito"
// }

// var ordenadorMac = {
// 	marca : "Apple",
// 	pulgadas : 15,
// 	memoriaRam: "4GB"
// }

// persona1.ordenador = clonar(ordenadorMac);
// persona2.ordenador = clonar(ordenadorMac);

// function clonar(objetoAClonar){
// 	var nuevoObjeto = null;

// 	// falta function clonar
// 	var cadenaJSON = JSON.stringify(objetoAClonar); //convierte el objeto a string
// 	nuevoObjeto = JSON.parse(cadenaJSON); // string a objeto

// 	return nuevoObjeto;
// }


var variable;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));

variable = 10;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));

variable = "texto";
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));

variable = true;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));

variable = null;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));