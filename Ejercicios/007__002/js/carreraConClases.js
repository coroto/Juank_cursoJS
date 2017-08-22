/*
Ejercicio 007__001. Implementado Clases

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
 class Auto{
 	constructor (){
	 	this._marca = Utilidades.generarAutoAleatorio();
		this._modelo = Utilidades.generarModeloAleatorio();
		this._velocidadMaxima = Utilidades.generarNumeroAleatorioEntre (100, 200);
		this._imagen = Utilidades.generarImagenAleatoria();
		this._posicion = 0;
 	}

 	getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
 		var metros = velocidadEnKmh*1000/3600;
    	return metros;	
 	}

 	tiempoCarrea(distancia){
 		var tiempo = (distancia / this._velocidadMaxima).toFixed(2);
		return tiempo;	
 	}
	
 }

class Carrera{
	constructor(cantidad){
		this._cantidad = cantidad;
		this._autos = [];	
	}

	iniciarCarrera(){
			var cantidadLlegados = 0;

		for (var indiceAuto = 0; indiceAuto < this._autos.length ; indiceAuto++){
			var vehiculo = this._autos[indiceAuto];

			vehiculo._posicion += vehiculo.getMetrosQueAvanzaCadaSegundo(vehiculo._velocidadMaxima);

			console.log("vehiculo" + vehiculo._marca);
			console.log("velocidad:" + vehiculo._velocidadMaxima);
			console.log("Posicion:" + vehiculo._posicion);
			if (vehiculo._posicion >= 500){
				vehiculo._posicion = 500;
				cantidadLlegados ++;
			}
			
			var autoImagen= document.getElementById ("imgAuto"+indiceAuto);
			autoImagen.setAttribute("style","margin-left: "+ (vehiculo._posicion * 900 / 500) + "px");

		}

		if (cantidadLlegados == this._autos.length){
			clearInterval(intervalID);
			this.resultados();
		}
	}

	inicializarCarrera(){
		var pista = document.getElementsByClassName("pista");
		for (var i=0; i<this._cantidad; i++){
			var auto = new Auto();
			this._autos.push(auto);

			var divAuto = document.createElement('div');
			var imgAuto = document.createElement('img');
				imgAuto.setAttribute ("id", "imgAuto"+i);
				imgAuto.setAttribute ("src", "./images/"+ auto._imagen);
			divAuto.appendChild(imgAuto);
			pista[0].appendChild(divAuto);		
		}
	}

	resultados(){
		var resultados = document.getElementsByClassName("resultados");
		var tablaResul = document.createElement('table');
			//tablaResul.setAttribute('style', 'border: red 9px solid;');
		resultados[0].appendChild(tablaResul);

		var tituloHead = Utilidades.crearElemento("thead", null, tablaResul, null);
		var tituloTr = Utilidades.crearElemento("tr", null, tituloHead, null);
		var titulos = ["Posición", "Tiempo (s)", "imagen", "Marca", "Modelo", "Velocidad"];
		for (var i=0; i < titulos.length; i++){
			Utilidades.crearElemento("th", null, tituloTr, titulos[i]);
		}

		var resultadosBody = Utilidades.crearElemento("tbody", null, tablaResul, null);

		for (var i=0; i<this._autos.length; i++){
			var auto = this._autos[i];

			var rowResultados = Utilidades.crearElemento("tr", null, resultadosBody, null);
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, i+1);
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, auto.tiempoCarrea(500));
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, null);
				var imagenAuti = document.createElement('img');
					imagenAuti.src = './images/'+auto._imagen;
					imagenAuti.setAttribute ('style','height: 30px; width: 100px');
				tdResultados.appendChild(imagenAuti);	
					
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, auto._marca);
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, auto._modelo);
				var tdResultados  = Utilidades.crearElemento("td", null, rowResultados, auto._velocidadMaxima);

		}	
	}	
}


class Utilidades{
	constructor(){

	}

	static generarAutoAleatorio(){
		var nombresAutos = ["Audi", "BMW", "Ford", "Jeep", "Lexus", "Mitsubishi", "Wolkswagenn", "Volvo", "Renault", "Chevrolet", "Porsche"];
		var indice = this.generarNumeroAleatorioEntre(0, nombresAutos.length-1);
		return nombresAutos[indice];
	}

	static generarModeloAleatorio(){
		var nombresModelos = ["A4", "Serie 7", "Fiesta", "Patriot", "LX", "Eclipse", "Golf Gti", "C70", "Twitzi	", "Spark GT", "Panamera"];
		var indice = this.generarNumeroAleatorioEntre(0, nombresModelos.length-1);
		return nombresModelos[indice];
	}

	static generarImagenAleatoria(){
		var nombresModelos = ["vehiculo1.png", "vehiculo2.png", "vehiculo3.png", "vehiculo4.png", "vehiculo5.png", "vehiculo6.png", "vehiculo7.png", "vehiculo8.png", "vehiculo9.png", "vehiculo10.png"];
		var indice = this.generarNumeroAleatorioEntre(0, nombresModelos.length-1);
		return nombresModelos[indice];
	}

	static generarNumeroAleatorioEntre(minimo, maximo){
		var anchoFranjaNumerica = (maximo-minimo) + 1;
		var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
		return numero;
	}

	static crearElemento(nombre, clases, padre, innerHTML){
		var elemento = document.createElement(nombre);

		if(clases != null && typeof(clases) != "undefined"){
			elemento.className = clases;
		}
		if(innerHTML != null && typeof(innerHTML) != "undefined"){
			elemento.innerHTML = innerHTML;
		}
		if(padre != null && typeof(padre) != "undefined"){
			padre.appendChild(elemento);
		}

		return elemento;
	}
}


var carrera = new Carrera(4);
var intervalID;

window.onload = function (){
	carrera.inicializarCarrera();
	
	intervalID = setInterval (function(){
		carrera.iniciarCarrera();
	},1000);

}










