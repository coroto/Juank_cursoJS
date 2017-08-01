// Arrays

var miArray = [];
var miArrayLleno = ["Hola", "clase"];

miArrayLleno[2] = "Que tal";
miArrayLleno.push("están");
miArrayLleno.unshift("¡");
miArrayLleno.splice(posicionAPartirDeLaQueBorro, cuantosBorro);
var elemento = miArrayLleno.pop();
var arrayNuevo == miArray.concat(miArrayLleno);
miArray.sort();
var longitud = miArray.length;

miArrayLleno.forEach(function(elemento) {
	console.log(elemento);
});

miArray.reverse();

// Objetos

var miObjeto = {};

miObjeto.nuevaPropiedad = "El valor";
var valor = miObjeto["nuevaPropiedad"];

var variableConNombreDePropiedad = "nuevaPropiedad";

NOOOOOO - > miObjeto.variableConNombreDePropiedad;
Siiiiii - > miObjeto[variableConNombreDePropiedad];

for (propiedad in miObjeto) {
	console.log(miObjeto[propiedad]);
}

// Objetos en objetos
var persona = {
	nombre: "Carlos",
	coche: {
		marca: "Ford",
		precio: "99999$",
		modelo: "Mustang GT",
		motor: {
			potencia: "500CV",
			cilindros: "6",
		}
	}
};

var persona = {
	nombre: "Carlos"
};

persona.coche = {
	marca: "Ford",
	precio: "99999$",
	modelo: "Mustang GT",
};

persona.coche.motor = {
	potencia: "500CV",
	cilindros: "6",
}
