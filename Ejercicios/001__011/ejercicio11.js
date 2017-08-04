/*

Haciendo uso del zoo que definimos en el ejercicio anterior,
vamos a añadirle funcionalidad:

1) Haz una función que añada un visitante nuevo:
	Si el zoo está lleno no podrá entrar.    OK
	Para entrar deberá pagar la entrada que dependerá de:  OK
		Niños <14 años: gratis
		Personas mayores >65 gratis
		Resto: 5$
		Estudiantes: 3$
	Este importe deberá ser restado del dinero del visitante y añadido a la caja del zoo OK

	El visitante irá a un área y a un recinto aleatorio,  OK
	si esta está llena, deberá buscar otro lugar          OK

2) Crea una función que se llame ejecutarCiclo() que simule el paso de 1 hora en el zoo, deberá:
	- Añadir visitantes al parque  OK  y también los retire del parque
	- Deberá quedar reflejado que ha pasado un ciclo en el importe de las personas (tendrán menos dinero) y en la caja del parque (habrá ganado dinero)  OK

	(El ciclo simula ser una hora del parque, pero lo ejecutamos cada 3seg)  OK

3) Crea una funcionalidad que simule el paso de un ciclo en un animal:
	- Su salud se verá afectada disminuyendo 10 o aumentando 10 (de forma aleatoria).
	- Si la salud del animal descience por debajo de 50, este debéra ir a la enfermería.
	- También el animal tendrá más hambre cada hora que pase (+10) cuando llegue a 100 deberá ser alimentado y pasará a tener hambre 0.

4) Asocia la funcionalidad anterior a la función de ejecutarCiclo() de manera que los animales vayan variando su salud y su hambre.
De vez en cuando algunos animales deberán ir a la enfermería (salud menor de 50) donde recuperarán 10 de salud hasta llegar a 100. 
Al llegar a 100 deberán volver a su recinto.

BONUS:

1) Haz que en cada ciclo una persona tenga una probabilidad del 15% de comprar un prodcuto de la tienda.
Añade una propiedad tienda en ZOO que tenga un array de artículos de regalo (añade 20 artículos).
Un artículo de regalo tendrá un nombre y un precio.
Las personas que deseen comprar eligirán un artículo aleatorio y se lo llevarán (ya no estará en la tienda)

2)  Crear función cerrar zoo, encargada de:
	- Parar el intervalo
	- Sacar a todas las personas del zoo
Cierra el zoo una vez hayan pasado 100 ciclos

3) Cuando el hambre de un animale llegue a 100 el animal estará muy hambriento y deberá ser alimentado.
Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$

4) Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo.
Cuando un animal tenga más de 150 de hambre, se comerá a un visitante.
El zoo se quedará con su cartera.

5) Realiza una función imprimirEstadoZoo() que muestre por consola el estado del zoo.
Deberán mostrarse:

- las áreas:
	- los recintos de ese área:
		- los animales de ese recinto
		- el número de visitantes de ese recinto
- la enfermería:
	- los animales dentro de la enfermería
- la tienda
	- el número de productos de la tienda
- la caja del zoo

*/


//console.log("mi area :" + JSON.stringify(area));  para imprimir la variable por consola 
//console.log("mi area :" ,area);  para imprimir la variable por consola 

// Funciones auxiliares
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
}

function generarNombreAleatorio(){
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

	return nombresNegados[indice];
}

function crearEstudianteAleatorio(){
	var estudiante = generarNumeroAleatorioEntre(0,1);
	if (estudiante == 0){
		return false;
	}else{
		return true;
	}
}

/*  ====  Funciones  Logicas ===   */

// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
	for(var i=0; i<numeroPersonas; i++){
		var persona = crearPersonaAleatoria();
		var recintoAleatorio = dameRecintoAleatorioConEspacio();

		if(recintoAleatorio == null){
			console.error("El zoo se ha llenado");
		}else{
			if (cobrarEntrada(persona)){
		    	recintoAleatorio.personas.push(persona);
		    }else{
				console.error(persona.nombre + " No tienes Pasta, tu saldo es: " + persona.dinero);
			}
		}
	}
}

// Función que valida que los recintos tengan espacio y retorna recinto con espacio
function dameRecintoAleatorioConEspacio(){
	var recinto = null;
	var recintosEnMiZooConEspacio = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			if(recinto.aforoMaximoPersonas>recinto.personas.length){
				recintosEnMiZooConEspacio.push(recinto);
			}
		}
	}

	if(recintosEnMiZooConEspacio.length > 0){
		var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZooConEspacio.length-1);
		recinto = recintosEnMiZooConEspacio[indiceAleatorio];
		console.log(recinto);
	}else{
		return null;
	}

	return recinto;
}

// function Que valida edad de la persona y realiza el cobro de la entrada
function cobrarEntrada(objpersona){
	console.warn("Vamos a Cobrar la entrada");
	var tarifaEstudiante = 3;
	var tarifaResto = 5;
	if (objpersona.dinero >= 0){
		console.log(objpersona);
		if (objpersona.edad < 14 || objpersona.edad > 65){
			//console.log ("Entras Gratis " + objpersona.dinero);
		}else if(objpersona.estudiante){
			//console.log ("Tarifa de Estudiante");
			objpersona.dinero = objpersona.dinero - tarifaEstudiante;
			zoo.caja = zoo.caja + tarifaEstudiante;
			//console.log(objpersona.dinero);
		}else{
			//console.log ("Tarifa Plena ");
			objpersona.dinero = objpersona.dinero - tarifaResto;
			zoo.caja = zoo.caja + tarifaResto;
			//console.log(objpersona.dinero);
		}
	    //console.error ("en Caja " + zoo.caja );
		return true;
	}else{
		return false;
	}
}

function ejecutarCicloAnimal(animal, recinto){
	// console.log ("Animales");
	 console.log (animal);
	var indicadorHambre = generarNumeroAleatorioEntre(0, 1);
	
	if (animal.salud < 50){
		zoo.enfermeria.push(crearCaso(animal, recinto));
		console.log(zoo.enfermeria);
		var posicion  = recinto.animales.indexOf(animal);
		console.log (" posicion del array" + posicion);
		recinto.animales.splice(posicion,1);

	}
	if (indicadorHambre == 1 && animal.salud < 100 ){
		animal.salud = animal.salud + 10;
		//console.log ("salud Aumentando: " + animal.salud);
	}else{
		animal.salud = animal.salud - 10;
	}
	console.log ("Salud" + animal.salud);


	

// For anidados para acceder a los animales del Zoo

}



//función simula paso 1 hora
console.error("estamos ejecutando");
var intervalID;
window.onload = function(){
	intervalID = window.setInterval(ejecutarCiclo, 2000);
}
function ejecutarCiclo(){
	for(var indiceArea=0; indiceArea < zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for (var indiceRecinto = 0; indiceRecinto < area.recintos.length; indiceRecinto ++){
			var recinto = area.recintos[indiceRecinto];
			for (var indiceAnimal = recinto.animales.length; indiceAnimal >  0; indiceAnimal --){
				var animal = recinto.animales[indiceAnimal];
				ejecutarCicloAnimal(animal,recinto);
			}			
		}
	}


	//insertarPersonasAleatoriamente(10);
	


}




var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 0,
	caja: 0, 
	enfermeria : []
};

var ubicacion = {
	direccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

// Seteamos la ubicacion
zoo.ubicacion = ubicacion;

function crearArea(nombre){
	var area = {
		nombre: nombre,
		aforoMaximo: 0,
		recintos: [],
	};

	return area;
}

function crearRecinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
	return {
		nombre: nombre,
		animales: [],
		personas: [],
		aforoMaximoPersonas: aforoMaximoPersonas,
		aforoMaximoAnimales: aforoMaximoAnimales,
		detalle: detalle
	};
}

function crearAnimal(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

function crearPersonaAleatoria(){
	return {
		nombre: generarNombreAleatorio(),
		edad: generarNumeroAleatorioEntre(1, 90),
		dinero: generarNumeroAleatorioEntre(0, 1000),
		estudiante: crearEstudianteAleatorio()
	}
}


function addRecintoToArea(recinto, area){
	area.recintos.push(recinto);
	area.aforoMaximo = area.aforoMaximo + recinto.aforoMaximoPersonas;
}

function addAreaToZoo(area){
	zoo.areas.push(area);
	zoo.aforo = zoo.aforo + area.aforoMaximo;
}


function crearCaso(a, r){
	var caso = {
		animal: a,
		recinto: r
	};
	return caso;
}


// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Creo areas
var areaMamiferos = crearArea("Mamíferos");
var areaAves = crearArea("Aves");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 50, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");


// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);

// Añado los recintos a las áreas
addRecintoToArea(recintoTigres, areaMamiferos);
addRecintoToArea(recintoAves, areaAves);
//areaMamiferos.recintos.push(recintoTigres);
areaAves.recintos.push(recintoAves);

//Añado las áreas al zoo

//zoo.areas.push(areaMamiferos, areaAves);
addAreaToZoo(areaMamiferos);
addAreaToZoo(areaAves);
// Añado 100 personas

//insertarPersonasAleatoriamente(13);

//ejecutarCicloAnimal();
console.log(zoo);