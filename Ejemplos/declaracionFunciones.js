function Animal(nombre, especie, salud, hambre, pais, enfermeria, recinto){
	this._nombre = nombre;
	this._especie = especie;
	this._salud = salud;
	this._hambre = hambre;
	this._pais = pais;
	this._enfermeria = enfermeria;
	this._recinto = recinto;
};

Animal.prototype.ganarPerderSaludAleatorioYMandarEnfermeria = function(){
	var aumentoDeSalud = generarNumeroAleatorioEntre(-10, 10);
	this._salud = this._salud + aumentoDeSalud;

	if(this._salud>100){
		this._salud = 100;
	}

	if(this._salud<0){
		this._salud = 0;
	}

	if(this._salud<50){
		var caso = {
			animal: this,
			recinto: recinto
		}
		this._enfermeria.push(caso);
		var indiceEnRecinto = this._recinto.animales.indexOf(this);
		this._recinto.animales.splice(indiceEnRecinto, 1);
	}
};

Animal.prototype.aumentarHambre = function(){
	this._hambre = this._hambre + 10;
};

Animal.prototype.ejecutarCiclo = function(){
	this.aumentarHambre();
	this.ganarPerderSaludAleatorioYMandarEnfermeria();
};


// ahora
var perro = new Animal("Perro Bobby", "Pastor Alemán", 100, 0, "Alemania");
var gato = new Animal("Gato Bobby", "Gato Alemán", 90, 0, "Alemania");