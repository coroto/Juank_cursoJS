/*

1)	Define	una	clase	Persona	que	tenga	los	siguientes	atributos:
	Nombre:	
	Edad:
	Nacionalidad:
	Altura:	
	Peso:
	Enfermo:	true/false
	
2)	Definir	la	clase	Jugador	que	herede	de	persona	y	tenga	los	siguientes	atributos:
	Posición:	(portero/defensa/mediocentro/delantero)
	Numero:	
	Calidad:	(0-100)
La	posición	de	cada	jugador	es	completamente	aleatoria
El	estar	enfermo	o	no,	es	aleatorio	(10%	de	probabilidad	de	estar	enfermo)
3)	Definir	la	clase	Equipo	que	tenga:
	- Array	de	jugadores
	- Entrenador	
Un	equipo	tendrá	22	jugadores	creados	aleatoriamente
4)	Definir	la	clase	Entrenador	que	herede	de	Persona	y	tenga	los	siguientes	métodos:
	- elegirPlantillaParaPartido()	que	elegirá	de	sus	jugadores	a	los	mejores	para	un	
partido:
				1	portero
				4	defensas
				4	mediocentros
				2	delanteros
5)	Define	la	clase	partido	que	se	cree	a	partir	de	dos	equipos.
La	clase	partido	tendrá	el	método	jugarPartido	que	hará	que	se	dispute.
Lógica	del	partido:
Cada	equipo	hará	10	ataques	que	funcionarán	de	la	siguiente	manera

Por	ejemplo:

Si	ataca	el	equipo	1	se	calculará:
A	=	(Suma	de	calidad	de	medio	centros	equipo	1)	- (Suma	de	calidad	de	medio	centros	
equipo	2)
B	=	(Suma	de	calidad	de	delanteros	1)	- (Suma	de	calidad	de	defensas	equipo	2)
C	=	A	+	B	- (Suma	de	calidad	de	portero	equipo	2)
Fortuna	=	numero	aleatorio	entre	0	y	100
Para	cada	jugador	que	no	esté	en	su	puesto	del	equipo	1:	
C	=	C	- 10
Para	cada	jugador	que	no	esté	en	su	puesto	del	equipo	2:	
C	=	C	+	10
TOTAL	=	C	+	Fortuna
Si	total	es	mayor	que	cero	->	GOOOOOOOL
Si	total	es	igual	a	cero	->	PALO	!!!
Si	total	es	menor	que	cero	->	Ná	de	ná
AL	finalizar	el	partido	deberá	mostrarse	el	resultado

*/

class Persona{
	constructor(){
		this._nombre = Utilidades.generarNombreAleatorio();
		this._edad = Utilidades.generarNumeroAleatorioEntre(18, 35);
		this._nacionalidad = Utilidades.generarNacionalidadAleatoria();
		this._altura = Utilidades.generarNumeroAleatorioEntre(150, 200);
		this._peso = Utilidades.generarNumeroAleatorioEntre(60, 95);
		this._enfermo = Utilidades.estadoMedico();
	}

	// saludar(){
	// 	console.log("Hola :D");
	// }
}

class Jugador extends Persona{
	constructor(){
		super();
		this._posicion = Utilidades.generarPosicionAleatoria(); 
		this._numero = Utilidades.generarNumeroAleatorioEntre(0, 100);	
	    this._calidad = Utilidades.generarNumeroAleatorioEntre(0, 100);
	}

	// saludar(){
	// 	console.log("Hola, soy un jugador.");
	// }
}

class Entrenador extends Persona{
	constructor(){
		super();
	}

	elegirPlantillaParaPartido(equipo){
		//- elegirPlantillaParaPartido()	que	elegirá	de	sus	jugadores	a	los	mejores	para	un	
		//partido:
		//1	portero. 4	defensas 4	mediocentros 2	delanteros
		let jugadoresElegidos = {
			porteros : [],
			defensas : [],
			medios : [],
			delanteros : []
		}

		let banca =[];
		
		let jugadores = Utilidades.ordenaArrayPorCampo(equipo._jugadores, "_calidad");
		console.log(jugadores);
		for (let i=0; i < jugadores.length; i++){
			let jugador = jugadores[i];
			if (jugador._posicion == "Portero"){
				jugadoresElegidos.porteros.push(jugador);
			}
			if (jugador._posicion == "Defensa"){
				jugadoresElegidos.defensas.push(jugador);
			}
			if (jugador._posicion == "Mediocentro"){
				jugadoresElegidos.medios.push(jugador);
			}
			if (jugador._posicion == "Delantero"){
				jugadoresElegidos.delanteros.push(jugador);
			}
		}

		// seleccionar jugadores por posición
		if (jugadoresElegidos.porteros.length > 1){
			let suplentes = jugadoresElegidos.porteros.splice (1, jugadoresElegidos.porteros.length-1);
			banca = banca.concat(suplentes);
		}

		if (jugadoresElegidos.defensas.length > 4){
			let suplentes = jugadoresElegidos.defensas.splice (4, jugadoresElegidos.defensas.length-4);
			banca = banca.concat(suplentes);
		}

		if (jugadoresElegidos.medios.length > 4){
			let suplentes = jugadoresElegidos.medios.splice (4, jugadoresElegidos.medios.length-4);
			banca = banca.concat(suplentes);
		}

		if (jugadoresElegidos.delanteros.length > 2){
			let suplentes = jugadoresElegidos.delanteros.splice (2, jugadoresElegidos.delanteros.length-2);
			banca = banca.concat(suplentes);
		}

		//validamos si faltan jugadores por posicion 
		banca = Utilidades.ordenaArrayPorCampo(banca, "_calidad");
		
		if (jugadoresElegidos.porteros.length < 1){
			let porteroSuplente = banca.splice(0,1);
			jugadoresElegidos.porteros = jugadoresElegidos.porteros.concat(porteroSuplente);
			console.log("porteros");
		}

		console.log(banca);

		while (jugadoresElegidos.defensas.length < 4){
			let defensaSuplente = banca.splice(0,1);
			jugadoresElegidos.defensas = jugadoresElegidos.defensas.concat(defensaSuplente);
		}

		console.log(jugadoresElegidos.medios.length);
		while (jugadoresElegidos.medios.length < 4){
			let mediosuplente = banca.splice(0,1);
			jugadoresElegidos.medios = jugadoresElegidos.medios.concat(mediosuplente);
			console.log("medios");
		}

		while (jugadoresElegidos.delanteros.length < 2){
			let delanterosuplente = banca.splice(0,1);
			jugadoresElegidos.delanteros = jugadoresElegidos.delanteros.concat(delanterosuplente);
			console.log("delanteros");
		}

		console.warn ("vamos a elegir la plantilla");
		console.log (jugadoresElegidos);

		equipo._jugadoresElegidos = jugadoresElegidos;

		//return  jugadoresElegidos;
	}
}


class Equipo{
	constructor(entrenador){
		this._jugadores = [];
		this._entrenador = entrenador;
		this._jugadoresElegidos = [];
		this.compraJugadores();
	}

	compraJugadores(){
		for (let i=0; i < 22; i++){
			let jugador = new Jugador();
			this._jugadores.push(jugador);
			// this._jugadores.push(new Jugador());
		}
	}
}

class Partido{
	constructor(equipo1, equipo2){
		this._equipo1 = equipo1;
		this._equipo2 = equipo2;
	}

	jugarPartido(){
		debugger;
		for (let i = 0; i < 10; i++){
			this.atacar(this._equipo1, this._equipo2);
			this.atacar(this._equipo2, this._equipo1);
		}

	}

	atacar(equipoAtaca, equipoDefiende){
		let calidadMediosEquipo1 = this.calcularCalidadPosicion("Mediocentro", equipoAtaca);
		let calidadMediosEquipo2 = this.calcularCalidadPosicion("Mediocentro", equipoDefiende);
		let a = calidadMediosEquipo1 - calidadMediosEquipo2;


	}

	calcularCalidadPosicion(posicion, equipo){
		let calidadTotal = 0; 
		for (let i=0; i < equipo._jugadoresElegidos.length; i++){
			let jugador = equipo._jugadoresElegidos[i];
			if (jugador._posicion == posicion){
				calidadTotal = calidadTotal + jugador._calidad;
			}
		}

		return calidadTotal;

	}
}



class Utilidades{
	constructor(){

	}

	static ordenaArrayPorCampo(array, campo){
		return array.sort(function(a, b){
			return (b[campo] - a[campo])
		})
	}

	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
		return numero;
	}

	static generarNacionalidadAleatoria(){
		let nombresNacionalidades = ["Brasileño", "Colombiano", "Español", "Argentino", "Cubano", "Canadiense", "Inglés", "Portugués", "Sueco", "Italiano", "Paraguayo"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresNacionalidades.length-1);
		return nombresNacionalidades[indice];
	}

	static generarNombreAleatorio(){
		let nombresNacionalidades = ["Messi", "Falcao", "Puyol", "Ospina", "Bufon", "Ronaldo", "Hulk", "Neymar Jr", "Pibe Valderrama", "Maradona", "Pele"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresNacionalidades.length-1);
		return nombresNacionalidades[indice];
	}

	static estadoMedico(){
		let codicionFisica = false;
		let probabilidad = this.generarNumeroAleatorioEntre(0,100);
		if (probabilidad <= 10)
			return true;
		else
			return false;
	}

	static generarPosicionAleatoria(){
		let nombrePosicion = ["Portero", "Defensa", "Mediocentro", "Delantero"];
		let indice = this.generarNumeroAleatorioEntre(0, nombrePosicion.length-1);
		return nombrePosicion[indice];
	}

	static ordenarObjetos(arrToSort , strObjParamToSortBy, sortAscending) {
	    if(sortAscending == undefined) sortAscending = true; 
	    
	    if(sortAscending) {
	        arrToSort.sort(function (a, b) {
	            return a[strObjParamToSortBy] > b[strObjParamToSortBy];
	        });
	    }
	    else {
	        arrToSort.sort(function (a, b) {
	            return a[strObjParamToSortBy] < b[strObjParamToSortBy];
	        });
	    }
	}

}


// function prueba(){
	

	
// 	var equipo = new Equipo(entrenador);

// 	//jugador.saludar();
// 		var jugador = new Jugador();
// 	var entrenador = new Entrenador();
// 	entrenador.elegirPlantillaParaPartido(equipo);

// prueba();


window.onload = function(){
	let entrenadorEquipo1 = new Entrenador();
	let entrenadorEquipo2 = new Entrenador();
	let equipo1 = new Equipo(entrenadorEquipo1);
	let equipo2 = new Equipo(entrenadorEquipo2);


	equipo1._entrenador.elegirPlantillaParaPartido(equipo1);
	equipo2._entrenador.elegirPlantillaParaPartido(equipo2);


	let partido = new Partido(equipo1, equipo2);
	partido.jugarPartido();
}





