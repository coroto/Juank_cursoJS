/*

Refactoriza el código realizado en el ejercicio 001__011:

Todos los objetos usados en nuestro zoo (area, recinto, animal, enfermería...) 
deberán pasar a ser clases que definamos mediante function y luego instanciemos mediante new.

Añade todas las funciones de cada clase (por ejemplo en animal: modificarSalud, ejecutarCicloAnimal, alimentar... etc)
al prototype de la clase, para no repetir las funciones en cada instancia de dicha clase

No olvides realizar este proceso con todas las clases que haya en nuestro Zoo.

*/
function Zoo (nombre, ubicacion, enfermeria){
	this._nombre  = nombre;
	this._ubicacion = ubicacion;
	this._areas = [];
	this._caja = 0;
	this._enfermeria = enfermeria;
};
Zoo.prototype.agregarArea = function(area){
	this._areas.push(area);
    	//zoo.aforo += area.aforoMaximo;
};
Zoo.prototype.insertarPersonasAleatoriamente = function(numeroPersonas){
	for (i=0; i <numeroPersonas; i++ ){
		var recinto = this.dameRecintoAleatorioConEspacio();
		if(recinto != null){
			var persona = new Persona();
			recinto.agregarPersona(persona);
		}else{
			console.log("No hay recintos vacios");
		}
	}
};

Zoo.prototype.dameRecintoAleatorioConEspacio = function (){
	var recinto = null;
	var recintosEnMiZooConEspacio = [];
	for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
		var area = this._areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
			var recinto = area._recintos[indiceRecintos];
			if(recinto._aforoMaximoPersonas>recinto._personas.length){
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

function Ubicacion (direccion, ciudad, pais, telefono){
	this._direccion = direccion;
	this._ciudad = ciudad;
	this._pais = pais;
	this._telefono = telefono;

};

function Enfermeria (){
	this._caso = [];
};

function Area (nombre){
	this._recintos = [];
	this._nombre = nombre;
};

Area.prototype.agregarRecinto = function(recinto){
	this._recintos.push(recinto);
};

function Recinto(nombreRecinto,aforoMaximoPersonas,aforoMaximoAnimales,detalle){
	this._nombre = nombreRecinto;
	this._animales = [];
	this._personas = [];
	this._aforoMaximoPersonas = aforoMaximoPersonas;
	this._aforoMaximoAnimales = aforoMaximoAnimales;
	this._detalle = detalle;

}
Recinto.prototype.agregarAnimal = function(animal){
	this._animales.push(animal);
}
Recinto.prototype.agregarPersona = function(persona){
	this._personas.push(persona);
}

function Animal (nombre, especie, salud, hambre, pais){
	this._nombre = nombre;
	this._especie = especie;
	this._salud = salud;
	this._hambre = hambre;
	this._pais = pais;
};

function Persona(){
	this._nombre = generarNombreAleatorio();
	this._edad = generarNumeroAleatorioEntre(1,90);
	this._dinero = generarNumeroAleatorioEntre(0, 1000);
	this.estudiante = crearEstudianteAleatorio();
};






/* ===== Funciones auxiliares.  ===== */
function generarNombreAleatorio(){
	var nombresPersonas = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombresPersonas.length-1);
	return nombresPersonas[indice];
}

function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
}

function crearEstudianteAleatorio(){
	var estudiante = generarNumeroAleatorioEntre(0,1);
	if (estudiante == 0){
		return false;
	}else{
		return true;
	}
}

// crea el Zoo
var ubicacionZoo = new Ubicacion ("Calle de los animalitos 123","Ciudad de México","México",999888777);
var enfermeriaZoo = new Enfermeria();
var zoo = new Zoo("Mi Zooo", ubicacionZoo, enfermeriaZoo);

// Creamos Areas
var areaMamiferos = new Area ("area Mamiferos");
var areaAves = new Area ("area Aves");
// añadimos areas al zoo
zoo.agregarArea(areaMamiferos);
zoo.agregarArea(areaAves);

// creamos Recintos
var recintoTigres = new Recinto("Jaula de tigres", 50, 30, "Jaula super reforzada con titanium");
var recintoAves = new Recinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");

// Añadimos Recintos a las areas
areaMamiferos.agregarRecinto(recintoTigres);
areaAves.agregarRecinto(recintoAves);

// crear Animales

var tigreBlanco = new Animal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = new Animal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = new Animal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = new Animal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Añado Animales a los recintos
recintoTigres.agregarAnimal(tigreBlanco);
recintoTigres.agregarAnimal(tigreNormal);
recintoAves.agregarAnimal(avestruz);
recintoAves.agregarAnimal(flamenco);

zoo.insertarPersonasAleatoriamente(10);

console.log(zoo);




