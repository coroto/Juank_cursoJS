/*

Vamos a hacer un Hospital!!

Áreas: Urgencias, Trauma, UCI, Reuma, Rehab (10 medicos en cada area)

Genera las clases, los métodos y las propiedades necesarias para que funcione un hospital.

El hospital deberá realizar las siguientes operaciones (cada segundo):

1) recibir pacientes (cada segundo uno aleatorio):
	salud entre (0-50)
	pasarles al área de urgencias
	asginar un médico

2) los medicos de urgencias deben evaluar al paciente:
	reasignar el area del paciente

3) los médicos de cada área deben curar a los pacientes (+10 salud)
	evaluar si está sano, en tal caso le dan el alta (100 de salud)
	
4) Imprimir 

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

	static	generaEspecialidadAliatoria(){
		let nombresEspecialidades = ["Urgencias","Trauma", "UCI", "Reuma", "Rehab"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresEspecialidades.length-1);
		return nombresEspecialidades[indice];
	}

	static tipoEmpleadoAleatorio(){
		let externo = this.generarNumeroAleatorioEntre(0,1);
		if (externo = 1)
			return true;
		else
			return false;
	}

	static asignarSexoAleatorio(){
		//let sexo = null;
		let sexo = this.generarNumeroAleatorioEntre(0,1);
		if (sexo = 0){
			sexo = "F";
		}
		else{
			sexo = "M";
		}
		return sexo;
	}
}

class FabricarPersonas{
	constructor(){
		this._ultimoId = 0;
	}

	crearMedico(){

	}

	crearPersonas(){

	}
}

class Persona{
	constructor(id, nombre, dni, sexo, fechaNacimiento){
		this._id = id;

		// si te han pasado parametros
		if(nombre != null && nombre != "" && typeof(nombre) != "undefined"){
			this._nombre = nombre;
			this._dni = dni;
			this._sexo = sexo;
			this._fechaNacimiento = fechaNacimiento;
		}else{
			this.setAleatoria();
		}
	}

	setAleatoria(){
		this._nombre = Utilidades.generarNombreAleatorio();
		this._dni = Utilidades.generarNumeroAleatorioEntre(0, 9999999);
		this._sexo = Utilidades.asignarSexoAleatorio();
		this._fechaNacimiento = new Date();
	}
}


class Empleado extends Persona{
	constructor(id, nombre, dni, sexo, fechaNacimiento, externo){
		super(id, nombre, dni, sexo, fechaNacimiento);

		if(externo != null && externo != "" && typeof(externo) != "undefined"){
			this._externo = externo;
		}else{
			this._externo = Utilidades.tipoEmpleadoAleatorio();
		}
	}
}

class Medico extends Empleado{
	constructor(id, nombre, dni, sexo, fechaNacimiento, externo, especialidad){
		super(id, nombre, dni, sexo, fechaNacimiento, externo);

		if (especialidad !=null && especialidad != "" && typeof(especialidad) != "undefined"){
			this._especialidad = especialidad;	
		}else{
			this._especialidad = Utilidades.generaEspecialidadAliatoria();
		}
		
	}
}

class Paciente extends Persona{
	constructor (id, nombre, dni, sexo, fechaNacimiento, peso, altura, idMedico, salud){
		super(id, nombre, dni, sexo, fechaNacimiento);

		if ()
		this._peso = Utilidades.generarNumeroAleatorioEntre(1, 150)
		this._altura = Utilidades.generarNumeroAleatorioEntre(20, 200);
		this._idMedico = null;
		this._salud = Utilidades.generarNumeroAleatorioEntre(0,50);
	}
}



class Hospital{
	constructor(){
		this._areas = [];
	}
}


class Area{
	constructor(){
		this._especialidad = "";
		this._medicos = [];
	}


}


//var persona = new Persona(1,"Juancho","ARP23123","M","04-06-1987");

var persona = new Persona();
var empleado = new Empleado();
var medico = new Medico();


