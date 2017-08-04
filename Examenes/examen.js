/* ====    Funciones auxiliares.  ====. */
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
}

function generarNombreAleatorio(){
	var socios = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, socios.length-1);

	return socios[indice];
}

function generarLibroAleatorio(){
	var libros = ["Cien años de soledad", "El señor de los anillos","1984","Un mundo feliz", "Orgullo y prejuicio", "Crimen y castigo", "lolita", "Ulises", "Madame Bovary", "En busca del tiempo perdido"];
	var indice = generarNumeroAleatorioEntre(0, libros.length-1);
	return libros[indice];
}

function generarAutorAleatorio(){
	var autores = ["Gabriel García Márquez","J. R. R. Tolkien","George Orwell","Aldous Huxley", "Jane Austen","Fiódor Dostoyevski","Vladimir Nabokov", "James Joyce", "Gustave Flaubert","Marcel Proust","Juancho Mellizo"];
	var indice = generarNumeroAleatorioEntre(0, autores.length-1);
	return autores[indice];
}

function generarTematicaAleatoria(){
	var tematica = ["Amor","Aventuras","Naturaleza","Historia","Viajes"];
	var indice = generarNumeroAleatorioEntre(0, tematica.length-1);
	return tematica[indice];
}

/*  termina. Funciones auxiliares*/

function Biblioteca (nombre){
	this._nombre  = nombre;
	this._seccion = [];
	this._socios = [];
};
Biblioteca.prototype.agregarSecion = function(seccion){
	this._seccion.push(seccion);
};
Biblioteca.prototype.agregarSocios = function(numeroSocios){
	for (i=0; i < numeroSocios; i++){
		var socio = new Socio();
		this._socios.push(socio);
	}
};
Biblioteca.prototype.añadirLibro= function(libro){
// realizo la valiadcion de tematicas y libros
};


function Seccion(nombre){
	this._nombre = nombre;
	this._libros = [];
};


Seccion.prototype.crearLibros = function(numeroLibros){
	for (i=0; i < numeroLibros; i++){
		var libro = new Libro();
		this._libros.push(libro);
	}
};

function Libro(){
	this._nombre = generarLibroAleatorio();
	this._numPaginas = generarNumeroAleatorioEntre(1,600);
	this._autor = generarAutorAleatorio();
	this._tematica = generarTematicaAleatoria();
};


function Socio(){
	this._nombre = generarNombreAleatorio();
	this._numeroSocio = generarNumeroAleatorioEntre(1,999999);
	this._libros = [];
};
Socio.prototype.devolverLibro=function(){
}
Socio.prototype.dameLibroAleatorio=function(){

}

// crea la Biblioteca 
var biblioteca = new Biblioteca("Biblioteca Publica BBVA");

// Creo las Secciones
var seccionAmor = new Seccion("Amor");
var seccionAventuras = new Seccion("Aventuras");
var seccionNaturaleza = new Seccion("Naturaleza");
var seccionHistoria = new Seccion("Historia");
var seccionViajes = new Seccion("Viajes");

// Añado secciones a la Biblioteca
biblioteca.agregarSecion(seccionAmor);
biblioteca.agregarSecion(seccionAventuras);
biblioteca.agregarSecion(seccionNaturaleza);
biblioteca.agregarSecion(seccionHistoria);
biblioteca.agregarSecion(seccionViajes);

biblioteca.agregarSocios(5);

// var seccion  = new Seccion();
// seccion.crearLibros


seccionAmor.crearLibros();
seccionAventuras.crearLibros(10);
seccionNaturaleza.crearLibros(10);
seccionHistoria.crearLibros(10);
seccionViajes.crearLibros(10);

console.log(biblioteca);



console.error("estamos ejecutando");
var intervalID;
window.onload = function(){
	intervalID = window.setInterval(ejecutarCiclo, 2000);
}
function ejecutarCiclo(){

}

