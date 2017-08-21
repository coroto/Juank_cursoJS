/*

Examen 2

¡Esto es la guerra!

1) Realiza la clase Soldado que tenga lo siguientes atributos:

	- Nombre (aleatorio)
	- Salud (100)
	- Potencia de ataque (0)

Y los siguientes métodos:

	- Ataca(soldado) -> Recibirá un soldado y le quitará salud (la potencia de ataque que tenga).

(si, igual que en los vikingos :P)

2) Realiza las siguientes clases:

SoldadoDeInfanteria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 1-25)


SoldadoDeCaballeria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 25-50)


SoldadoDeArtilleria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 50-75)


SoldadoPilotoF18 que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 75-100)


3) Realiza la clase Ejercito con los siguientes atributos:

	- Pais (aleatorio)
	- Soldados (array)
	- Bajas (array)

En su creación la clase Ejercito generará 1000 soldados:
	500 de Infanteria
	200 de Caballeria
	200 de Artillería
	100 pilotos de F18

4) Realiza la clase Guerra, que recibirá dos ejercitos en su construcción.

La clase guerra deberá tener los siguientes atributos:
	- Numero de jornadas transcurridas: 0
	- Ejercito 1
	- Ejericto 2

La clase guerra deberá tener los métodos:
	- Iniciar guerra -> hará que empiecen a ejecutarse jornadas de manera consecutiva 
		(1 jornada cada 1000ms hasta que uno de los ejercitos se quede sin soldados)

	- Ejecutar jornada de guerra: en cada jornada de la guerra cada soldado de cada ejercito atacará a un soldado del ejercito contrario. 
		La elección del soldado al que atacará puede ser aleatoria
		Si un soldado muere (salud<=0) pasará al array de bajas de su ejército, y saldrá del array de soldados
		No importa qué ejercito empiece atacando.
		
	- Imprimir estado:
		Será ejecutado en cada jornada de la guerra y mostrará en la consola:
			- Numero de jornadas ejecutadas
			- Numero de soldados vivos en ejercito 1
			- Numero de soldado vivos en ejercito 2
			- Bajas ejército 1
			- Bajas ejército 2

*/

class Utilidades{
	constructor(){

	}

	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
		return numero;
	}

	static generarNombreAleatorio(){
		let nombresSoldados = ["Bryan", "Spartacus", "Cesar", "Ospina", "Colón", "Crisus", "Hulk", "Capitan America", "Batman", "Maradona", "Pele"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresSoldados.length-1);
		return nombresSoldados[indice];
	}

	static generarPaisAleatorio(){
		let nombresPaises = ["Colombia", "Corea Norte", "EEUU", "Rusia", "Venezuela", "España", "China", "Iran", "Portugal", "Mexico", "Brasil"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresPaises.length-1);
	return nombresPaises[indice];
	}

}


class Soldado{
	constructor(potencia){
		this._nombre = Utilidades.generarNombreAleatorio();
		this._salud = 100;
		this._potenciaDeAtaque = potencia;
	}

	ataca(soldado){
		soldado.restarSalud(this._potenciaDeAtaque);
	}

	restarSalud(saludARestar){
		this._salud -= saludARestar; 
		if (this._salud <=0 ){
			this._salud = 0;
		}

		return this._salud;
	}
}


class SoldadoDeInfanteria extends Soldado{
	constructor(){
		//this._potenciaDeAtaque = Utilidades.generarNumeroAleatorioEntre(1,25);
		let potencia = Utilidades.generarNumeroAleatorioEntre(1,25);
		super(potencia);
	}
}

class SoldadoDeCaballeria extends Soldado{
	constructor(){
		let potencia = Utilidades.generarNumeroAleatorioEntre(25,50);
		super(potencia);
	}
}

class SoldadoDeArtilleria extends Soldado{
	constructor(){
		let potencia = Utilidades.generarNumeroAleatorioEntre(50,75);
		super(potencia);
	}
}

class SoldadoPilotoF18 extends Soldado{
	constructor(){
		let potencia = Utilidades.generarNumeroAleatorioEntre(75,100);
		super(potencia);
	}
}

class Ejercito{
	constructor(){
		this._pais = Utilidades.generarPaisAleatorio();
		//this._pais = pais;
		this._soldados = [];
		this._bajas = [];
		this.convocarEjercito();
	}

	convocarEjercito(){
		for (let infanteria = 0; infanteria < 500; infanteria++){
			let soldadoDeInfanteria = new SoldadoDeInfanteria();
			this._soldados.push(soldadoDeInfanteria);
		}

		for (let caballeria = 0; caballeria < 200; caballeria++){
			let soldadoDeCaballeria = new SoldadoDeCaballeria();
			this._soldados.push(soldadoDeCaballeria);
		}

		for (let artilleria = 0; artilleria < 200; artilleria++){
			let soldadoDeArtilleria = new SoldadoDeArtilleria();
			this._soldados.push(soldadoDeArtilleria);
		}

		for (let pilotos = 0; pilotos < 100; pilotos++){
			let soldadoPilotoF18 = new SoldadoPilotoF18();
			this._soldados.push(soldadoPilotoF18);
		}
	}

	getNumeroSoldadosVivos(){
		return this._soldados.length;
	}

	getNumeroSoldadosMuertos(){
		return this._bajas.length;
	}
}

class Guerra{
	constructor(ejercito1, ejercito2){
		this._numeroJornadastrans = 0;
		this._ejercito1 = ejercito1; 
		this._ejercito2 = ejercito2;
		this._idInterval = null;
	}

	iniciarGuerra(guerra) {
	  this._idInterval = window.setInterval(function(){guerra.crearIntervaloDeUnSegundo()}, 1000);
	}

	crearIntervaloDeUnSegundo(){
		this.ejecutarJornada();	
	}


	ejecutarJornada(){
		this._numeroJornadastrans ++;
		this.imprimirEstado();
		this.jornadaDeGuerra();
		if(this._ejercito1.getNumeroSoldadosVivos() <= 0 || this._ejercito2.getNumeroSoldadosVivos ()<= 0){
 			window.clearInterval(this._idInterval);  
 		}

	}

	imprimirEstado(){
		
		//console.clear();
		console.log("%cInicia la guerra", "color: red; background-color: yellow");
		console.log ("numero de jornadas transcurriadas :" + this._numeroJornadastrans);
		console.log ("Soldados Vivos Ejercito 1: " +  this._ejercito1.getNumeroSoldadosVivos());
		console.log ("Soldados Vivos Ejercito 2: "+ this._ejercito2.getNumeroSoldadosVivos());
		console.log ("Bajas ejercito1: " + this._ejercito1.getNumeroSoldadosMuertos());
		console.log ("Bajas ejercito2: " + this._ejercito2.getNumeroSoldadosMuertos());
	}


	jornadaDeGuerra(){

		//debugger;
		// Ataca Ejercito 2
		for (let i=0; i < this._ejercito2._soldados.length; i++){
			let soldadoEj2 = this._ejercito2._soldados[i];
			let objetivo = this.seleccionaObjetivo(this._ejercito1);

			if (this._ejercito1._soldados.length > 0){
				soldadoEj2.ataca(objetivo);
				if (objetivo._salud <= 0){
					this._ejercito1._bajas.push(objetivo);
					var posicionObjetivo = this._ejercito1._soldados.indexOf(objetivo);
					this._ejercito1._soldados.splice(posicionObjetivo,1);
				}
			}
		}

		//

	// Ataca ejercito 1	
		for (let i=0; i < this._ejercito1._soldados.length; i++){
			let soldadoEj1 = this._ejercito1._soldados[i];
			let objetivo = this.seleccionaObjetivo(this._ejercito2);

			if (this._ejercito2._soldados.length > 0){
				soldadoEj1.ataca(objetivo);	
				if (objetivo._salud <= 0){
					this._ejercito2._bajas.push(objetivo);
					var posicionObjetivo = this._ejercito2._soldados.indexOf(objetivo);
					this._ejercito2._soldados.splice(posicionObjetivo,1);
				}
			}
		}



	}

	seleccionaObjetivo(ejercito){
		let indice = Utilidades.generarNumeroAleatorioEntre(0, ejercito._soldados.length-1);
		return ejercito._soldados[indice];
	}
}

window.onload=function(){
	let ejercito1 = new Ejercito();
	let ejercito2 = new Ejercito();
	let guerra = new Guerra(ejercito1, ejercito2);
	guerra.iniciarGuerra(guerra);
}	

























