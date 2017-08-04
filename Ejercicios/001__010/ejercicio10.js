/*

Realiza la modelización de un Zoológico

El zoológico deberá tener un nombre, una ubicación, un aforo máximo, un horario... ¡y todo lo que se te pueda ocurrir!

El zoológico deberá tener varias áreas:

- Reptiles
- Aves
- Mamíferos
- Peces

con distintos recintos, por ejemplo:

- Reptiles
	- Serpientes
	- Lagartos
- Aves
	- Aves pequeñas
	- Aves tropicales

	... etcétera

Cada recinto debe tener un nombre, una capacidad máxima de animales, aforo maximo de personas y un conjunto de animales.

Modeliza el zoológico lo más completo que puedas.

*/

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 120,
	tarifa: 100
	// COMPLETAR
};

zoo.ubicacion = {
	direccion: "Calle de los animales 5",
	ciudad: "París",
	pais: "Francia",
	// COMPLETAR
}

var area1 = {
	nombre: "Acuario",
	aforoMaximoZona: 200,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var recinto1 = {
	nombre: "Peces Payaso",
	aforoMaximoAnimales: 30,
	aforoMaximoPersonas: 50,
	animales: [],
	personas: []
}

var recinto2 = {
	nombre: "Tiburones",
	aforoMaximoAnimales: 100,
	aforoMaximoPersonas: 50,
	animales: [],
	personas: []
}




var animal4 = {
	nombre: "Alex",
	especie: "Leon",
	edad: 5,
	salud: 100
}

var animal5 = {
	nombre: "Diego",
	especie: "Tigre",
	edad: 3,
	salud: 100
}

var area2 = {
	nombre: "Sabana Africana",
	aforoMaximoZona: 500,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var recinto3 = {
	nombre: "Felinos",
	aforoMaximoAnimales: 20,
	aforoMaximoPersonas: 50,
	animales: [],
	personas: []
}



zoo.areas.push(area1);
area1.recintos.push(recinto1);
area1.recintos.push(recinto2);
// recinto1.animales.push(animal1);
// recinto1.animales.push(animal2);
// recinto2.animales.push(animal3);

recinto1.animales.push(animales("Nemo", "Pez Payaso", 1, 90));
recinto1.animales.push(animales("Dori", "Paracanthurus hepatus", 3, 70));
recinto1.animales.push(animales("Tiburoncin", "Selachimorpha", 2, 80));

// var animal1 = {
// 	nombre: "Nemo",
// 	especie: "Pez Payaso",
// 	edad: 1,
// 	salud: 90
// }

// var animal2 = {
// 	nombre: "Dori",
// 	especie: "Paracanthurus hepatus",
// 	edad: 3,
// 	salud: 70
// }

// var animal3 = {
// 	nombre: "Tiburoncin",
// 	especie: "Selachimorpha",
// 	edad: 2,
// 	salud: 80
// }

zoo.areas.push(area2);
area2.recintos.push(recinto3);
recinto3.animales.push(animal4);
recinto3.animales.push(animal5);

function animales(nombre,especie,edad,salud){
	var animal = {
		nombre : nombre,
		especie: especie,
		edad: edad,
		salud: salud
	}

return animal;
}



console.log(zoo);