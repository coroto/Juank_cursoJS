/*
Ejercicio 007__001

1) Modela la clase Vehículo, con las siguientes propiedades:

Marca (aleatorio)
Modelo (aleatorio)
VelocidadMaxima (aleatorio entre 100kmh y 200kmh)
Imagen

2) Realiza la clase carrera que recibirá dos vehículos en su consctrucción. 
La clase carrera tendrá el método iniciarCarrera() que hará que los dos vehículos compitan.

Una carrera consistirá en ver qué vehículo recorre primero 500 metros. Para ser realista deberás hacer que los vehículos avancen cada segundo los metros correspondientes a sus velocidad.

Ganará el que recorra antes los 500 metros. En caso de llegar a la vez, quedarán empatados e irán a penales. 

Naaaaaaaaah, no hay penales. Pero sí que pueden empatar.

3) Pinta en tu html la carrera. Haz uso de funciones de manejo del DOM, y haz uso de CSS para modificar su posición. Los coches deberán desplazarse desde la izquierda de la pantalla hasta la derecha donde se encontrará la meta.

AYUDA:

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

 */
function Auto(){
	this._marca = generarAutoAleatorio();
	this._modelo = generarModeloAleatorio();
	this._velocidadMaxima = generarNumeroAleatorioEntre (100, 200);
	this._imagen = generarImagenAleatoria();
	this._posicion = 0;
};

Auto.prototype.getMetrosQueAvanzaCadaSegundo = function(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

function Carrera(auto1, auto2){
	this._auto1 = auto1;
	this._auto2 = auto2;
};

Carrera.prototype.iniciarCarrera = function(){
	this._auto1._posicion += this._auto1.getMetrosQueAvanzaCadaSegundo(this._auto1._velocidadMaxima);
	this._auto2._posicion += this._auto2.getMetrosQueAvanzaCadaSegundo(this._auto2._velocidadMaxima);

	if (this._auto1._posicion >= 500){
		this._auto1._posicion = 500;
	} 

	if (this._auto2._posicion >= 500){
		this._auto2._posicion = 500;
	} 

	var autoImagen1 = document.getElementById ("imgAuto1");
	autoImagen1.setAttribute("style","margin-left: "+ (this._auto1._posicion*900/500) + "px");

	var autoImagen2 = document.getElementById ("imgAuto2");
	autoImagen2.setAttribute("style","margin-left: "+ (this._auto2._posicion*900/500) + "px");

	if (this._auto1._posicion == 500 && this._auto1._posicion == 500){
		clearInterval(intervalID);
	}



	console.log("velocidad Auto 1: " + this._auto1._velocidadMaxima);
	console.log("metros Auto 1: " + this._auto1._posicion);


	console.log("velocidad Auto 2: " + this._auto2._velocidadMaxima);
	console.log("metros Auto 2: " + this._auto2._posicion);
}

Carrera.prototype.inicializarCarrera = function(){
	var divAuto1 = document.createElement('div');

	var imgAuto1 = document.createElement('img');
		imgAuto1.setAttribute ("id", "imgAuto1");
		imgAuto1.setAttribute ("src", "./images/"+this._auto1._imagen);

	divAuto1.appendChild(imgAuto1);


	var divAuto2 = document.createElement('div');

	var imgAuto2 = document.createElement('img');
		imgAuto2.setAttribute ("id", "imgAuto2");
		imgAuto2.setAttribute ("src", "./images/"+this._auto2._imagen);

	divAuto2.appendChild(imgAuto2);

	var pista = document.getElementsByClassName("pista");
	pista[0].appendChild(divAuto1);
	pista[0].appendChild(divAuto2);

}

/* ===== Funciones auxiliares.  ===== */
function generarAutoAleatorio(){
	var nombresAutos = ["Audi", "BMW", "Ford", "Jeep", "Lexus", "Mitsubishi", "Wolkswagenn", "Volvo", "Renault", "Chevrolet", "Porsche"];
	var indice = generarNumeroAleatorioEntre(0, nombresAutos.length-1);
	return nombresAutos[indice];
};

function generarModeloAleatorio(){
	var nombresModelos = ["A4", "Serie 7", "Fiesta", "Patriot", "LX", "Eclipse", "Golf Gti", "C70", "Twitzi	", "Spark GT", "Panamera"];
	var indice = generarNumeroAleatorioEntre(0, nombresModelos.length-1);
	return nombresModelos[indice];
};

function generarImagenAleatoria(){
	var nombresModelos = ["vehiculo1.png", "vehiculo2.png", "vehiculo3.png", "vehiculo4.png", "vehiculo5.png", "vehiculo6.png", "vehiculo7.png", "vehiculo8.png", "vehiculo9.png", "vehiculo10.png"];
	var indice = generarNumeroAleatorioEntre(0, nombresModelos.length-1);
	return nombresModelos[indice];
};



function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
};

	var auto2 = new Auto();
	var auto1 = new Auto();
	var carrera = new Carrera(auto1, auto2);


	

var intervalID;

window.onload = function (){
	carrera.inicializarCarrera();
	
	intervalID = setInterval (function(){
		carrera.iniciarCarrera();
	},1000);

}






console.log(auto1);
console.log(auto2);


