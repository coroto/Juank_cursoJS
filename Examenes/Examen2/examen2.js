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
		nombresPaises.splice(indice,1);
	return nombresPaises[indice];
	}

}


class Soldado{
	constructor(){
		this._nombre = Utilidades.generarNombreAleatorio();
		this._salud = 100;
		this._potenciaDeAtaque = 0;
	}

	ataca(soldado){
		soldado._salud = soldado._salud - this._potenciaDeAtaque;
	}
}


class SoldadoDeInfanteria extends Soldado{
	constructor(){
		super();
		this._potenciaDeAtaque = Utilidades.generarNumeroAleatorioEntre(1,25);
	}
}

class SoldadoDeCaballeria extends Soldado{
	constructor(){
		super();
		this._potenciaDeAtaque = Utilidades.generarNumeroAleatorioEntre(25,50);
	}
}

class SoldadoDeArtilleria extends Soldado{
	constructor(){
		super();
		this._potenciaDeAtaque = Utilidades.generarNumeroAleatorioEntre(50,75);
	}
}

class SoldadoPilotoF18 extends Soldado{
	constructor(){
		super();
		this._potenciaDeAtaque = Utilidades.generarNumeroAleatorioEntre(75,100);
	}
}

class Ejercito{
	constructor(){
		this._pais = Utilidades.generarPaisAleatorio();
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
}

class Guerra{
	constructor(ejercito1, ejercito2){
		this._numeroJornadastrans = 0;
		this._ejercito1 = ejercito1; 
		this._ejercito2 = ejercito2;
	}

	iniciarGuerra(){
		this.jornadaDeGuerra();
	}

	jornadaDeGuerra(){


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
// busca en el array del ejercito contrario para traer el objetivo
	// let nombresSoldados = ["Bryan", "Spartacus", "Cesar", "Ospina", "Colón", "Crisus", "Hulk", "Capitan America", "Batman", "Maradona", "Pele"];
	// let indice = Utilidades.generarNumeroAleatorioEntre(0, nombresSoldados.length-1);
	// return nombresSoldados[indice];

	let indice = Utilidades.generarNumeroAleatorioEntre(0, ejercito._soldados.length-1);
	return ejercito._soldados[indice];

	}
}


var IDInterval;
var ejercito1 = new Ejercito();
var ejercito2 = new Ejercito();

window.onload=function(){
let guerra = new Guerra(ejercito1, ejercito2);
console.log("Inicia la guerra");
	IDInterval = window.setInterval(function(){
		if (ejercito1._bajas.length == 1000 ||  ejercito2._bajas.length == 1000){
			clearInterval(IDInterval);  
		}
		else{
			guerra._numeroJornadastrans ++;
			guerra.iniciarGuerra();

			console.log ("numero de jornadas transcurriadas :" + guerra._numeroJornadastrans);
			console.log ("Soldados Vivos Ejercito 1: " + ejercito1._soldados.length);
			console.log ("Soldados Vivos Ejercito 2: "+ ejercito2._soldados.length);
			console.log ("Bajas ejercito1: " + ejercito1._bajas.length);
			console.log ("Bajas ejercito2: " + ejercito2._bajas.length);
		}
	}, 1000);
}

// detengo el interval clearInterval(IDInterval).

























