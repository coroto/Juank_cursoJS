/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 100)
potenciaAtaque (1 - 20)
velocidad (0 - 100)

2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)

3) Realiza una clase Batalla() que en su creación reciba dos vikingos.

Batalla tendrá un método iniciarPelea que realizará la pelea entre ambos vikingos.

Una batalla tendrá una serie de asaltos en los que:

atacará primero el que más valocidad tenga,
y quitará de salud al rival su potencia de ataque,
hasta que uno de los dos muera. (salud <= 0)

4) Crear la clase Arma() tenga un tipo: (espada/cuchillo...etc), una potencia (20 - 50) y un ataquesRestantes (0 -10).

5) Añade una propiedad armas a Vikingo para que pueda poseer varias armaspara su batalla.
Añade el método addArma() para añadir armas a los vikingos,

6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).

Bonus:

Añade un parámetro dinero a Vikingo (random entre 0 y 200)
Cuando un Vikingo mate a otro, le robará el dinero y las armas.

*/

function Vikingo(){
	this._nombre = generarNombreAleatorio();
	this._salud = 100;
	this._potenciaAtaque = generarNumeroAleatorioEntre(1,20);
	this._velocidadAtaque = generarNumeroAleatorioEntre(1,100);
	this._armas = [];
	this._dinero = generarNumeroAleatorioEntre(1,200);
};


Vikingo.prototype.armaMasTesa = function(){
	var potenciaArmaPoderosa = 0;
	var armaEscogida = {};
	for (var i = 0; i < this._armas.length; i++){
		var arma = this._armas[i];
		if (potenciaArmaPoderosa < arma._potenciaArma){
			potenciaArmaPoderosa = arma._potenciaArma;
			armaEscogida = arma;
		}
	}
	return armaEscogida;

};


Vikingo.prototype.ataca = function (vikingo){
	
	if (this._armas.length > 0){
		var armaAtaque = this.armaMasTesa();
		vikingo._salud = vikingo._salud - armaAtaque._potenciaArma;
		armaAtaque._numeroAtaques -= 1;
		console.log (".          Arma :  " + armaAtaque._nombreArma );
		console.log (".          Potencia Arma :  " + armaAtaque._potenciaArma );
	}else{
		vikingo._salud = vikingo._salud - this._potenciaAtaque;
	}

};

Vikingo.prototype.addArma = function(arma){
	this._armas.push(arma);
};

Vikingo.prototype.asignarArmas = function(numeroArmas){
	for (var i=0; i < numeroArmas; i++ ){
		this.addArma (new Arma);
	}
};




function Batalla(vikingo1, vikingo2){
	this._vikingo1 = vikingo1;
	this._vikingo2 = vikingo2;
};

Batalla.prototype.iniciarPelea = function (){
var turno = 0;
if (this._vikingo1._velocidadAtaque > this._vikingo2._velocidadAtaque){
	turno = 1;
	}else{
	turno = 2;	
}

	while (this._vikingo1._salud > 0 && this._vikingo2._salud > 0){
		if (turno == 1){
			this._vikingo1.ataca (this._vikingo2);
			turno = 2;
		}
		else{
			this._vikingo2.ataca (this._vikingo1);
			turno = 1;
		}
		this.seguimiento();

	if (this._vikingo1._salud < 0 )
		this._vikingo1._salud = 0	
	if (this._vikingo2._salud < 0 )
		this._vikingo2._salud = 0
	}


};

Batalla.prototype.seguimiento = function(){
	//console.clear();
	console.log (" ....  Vikingo 🎅   ... ")
	console.log ("Nombre: " + this._vikingo1._nombre);
	console.log ("Potencia : " + this._vikingo1._potenciaAtaque);
	console.log ("Salud : " + this._vikingo1._salud);

	console.log (" ....  Vikingo 💂   ... ")
	console.log ("Nombre : " + this._vikingo2._nombre);
	console.log ("Potencia: " + this._vikingo1._potenciaAtaque);
	console.log ("salud: " + this._vikingo2._salud);
	console.log(" =======================================");
}

function Arma(){
	this._nombreArma = generarArmasAleatorias();
	this._potenciaArma = generarNumeroAleatorioEntre(20,50);
	this._numeroAtaques = generarNumeroAleatorioEntre(0,10);
};



/* ===== Funciones auxiliares.  ===== */
function generarNombreAleatorio(){
	var nombresPersonas = ["Aren", "Axe", "Bjorn", "Daven", "Egil", "Einar", "Esben", "Gerd", "Gisli", "Haakon", "Odín"];
	var indice = generarNumeroAleatorioEntre(0, nombresPersonas.length-1);
	return nombresPersonas[indice];
};

function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
};

function generarArmasAleatorias(){
	var tipoArmas = ["Laser", "Cañon Gama", "Machete", "Hacha", "Ak -47", "Changon", "Arco", "Bazuca", "Cañon", "Bomba Atomica", "Pata Cabra"];
	var indice = generarNumeroAleatorioEntre(0, tipoArmas.length-1);
	return tipoArmas[indice];
};

/* ===== Funciones auxiliares.  ===== */


var vikingo1 = new Vikingo();
var vikingo2 = new Vikingo();
vikingo1.asignarArmas(5);
vikingo2.asignarArmas(5);

var batalla = new Batalla(vikingo1, vikingo2);
batalla.iniciarPelea();


