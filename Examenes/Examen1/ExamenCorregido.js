/*

Vamos a realizar una biblioteca (Yujuuuuu!!)

1) Crea la clase Biblioteca, la cual deberá tener:
	- Nombre (String)
	- Secciones (Array)
	- Socios (Array)

2) Crea la clase Libro, la cual deberá tener:
	- Nombre (String)
	- Número de páginas (Number)
	- Autor (String)
	- Temática (String) (Puede ser Amor, Aventuras, Naturaleza, Historia, Viajes)

3) Crea la clase Sección (para la biblioteca) que tendrá:
	- Nombre (String)
	- Libros (Array)

4) Crea la clase Socio que tendrá:
	- Nombre (String)
	- Numero de socio (Number)
	- Libros (Array)

5) Instancia una nueva biblioteca
Añade 5 seciones a la biblioteca: Amor, Aventuras, Naturaleza, Historia, Viajes
Añade 100 socios aleatorios a la biblioteca
Genera 1000 libros aleatoriamente y añádelos a la biblioteca.
Para ello haz uso de una función añadirLibro(libro) que deberá estar en el objeto biblioteca.
Los libros deberán colocarse en la sección apropiada según su temática.

6) Añade el método ejecutarCiclo() dentro de un socio
En cada ciclo un socio dejará los libros que tenía alquilados y cogerá varios (aleatorio entre 1-3) de forma aleatoria.
Para coger libros deberá hacer uso de una funcion de Biblioteca llamada dameLibroAleatorio();
Para dejar libros deberá hacer uso de una función de Biblioteca llamada devolverLibro(libro);

7) Realiza la función ejecutarCiclo para la biblioteca
La función ejecutarCiclo de biblioteca, llamará a ejecutar ciclo de todos sus socios

8) Crea un intervalo que se encargue de llamar a ejecutarCiclo de biblioteca cada segundo
Crea una función imprimirEstado en biblioteca, que se encargue de imprimir el estado de toda la biblioteca.

Por ejemplo:

Biblioteca Municipal:

Sección Amor
	Numero de libros: 80
Sección Aventuras
	Numero de libros: 80
Sección Naturaleza
	Numero de libros: 80
Sección Historia
	Numero de libros: 80
Sección Viajes
	Numero de libros: 80

Total de libros en la biblioteca: 400
Total de libros prestados a los socios: 600

*/


/* ====    Utilidades  ====. */

function Utilidades (){

}

Utilidades.prototype.generarNumeroAleatorioEntre = function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	return numero;
}

Utilidades.prototype.generarTematicaAleatoria = function (){
	var tematica = ["Amor","Aventuras","Naturaleza","Historia","Viajes"];
	var indice = this.generarNumeroAleatorioEntre(0, tematica.length-1);
	return tematica[indice];
}


Utilidades.prototype.generarNombreAleatorio = function(){
	var nombreSocios = ["Carlos ", "Daniel ", "Fabian ", "Juan Carlos ", "Bryan ", "Saul ", "Christian ", "Marcel ", "Ronal ", "David ", "Fran "];
	var indice = this.generarNumeroAleatorioEntre(0, nombreSocios.length-1);
	return nombreSocios[indice];
}

Utilidades.prototype.generarApellidoAleatorio = function(){
	var nombreSocios = ["Lemoure", "Monsalve", "Garcia", "Mendieta", "Silva", "Garcia", "Mora", "Murcia", "Suarez", "Casillas", "Lopez"];
	var indice = this.generarNumeroAleatorioEntre(0, nombreSocios.length-1);
	return nombreSocios[indice];
}

Utilidades.prototype.generarAutorAleatorio = function(){
	var autores = ["Gabriel García Márquez","J. R. R. Tolkien","George Orwell","Aldous Huxley", "Jane Austen","Fiódor Dostoyevski","Vladimir Nabokov", "James Joyce", "Gustave Flaubert","Marcel Proust","Juancho Mellizo"];
	var indice = this.generarNumeroAleatorioEntre(0, autores.length-1);
	return autores[indice];
}


function Biblioteca (nombre){
	this._nombre = nombre;
	this._secciones = [];
	this._socios = [];	
	this.inicializar();
}

Biblioteca.prototype.inicializar = function(){
	//var seccionAmor = new Seccion("Amor");
	//this._secciones.push(seccionAmor);
	this._secciones.push(new Seccion("Amor"));
	this._secciones.push(new Seccion("Aventuras"));
	this._secciones.push(new Seccion("Naturaleza"));
	this._secciones.push(new Seccion("Historia"));
	this._secciones.push(new Seccion("Viajes"));

	for (var indiceSocio=1; indiceSocio <= 100; indiceSocio++){
		var socio = new Socio (indiceSocio);
		this._socios.push(socio);
	}

	for(var indiceLibros=0;indiceLibros<1000;indiceLibros++){
		this.addLibro(indiceLibros);
	}
}

Biblioteca.prototype.addLibro = function(indiceLibros){
	//this.buscarSeccion(libro.tematica)
	//this.addLibro(libro);

    libroAleatorio = new Libro(indiceLibros);
    var seccion = this.buscarSeccion(libroAleatorio._tematica);
    seccion._libros.push(libroAleatorio);

}

Biblioteca.prototype.buscarSeccion = function(nombreSeccion) {
    var seccionAdevolver = null;
    for (indiceSeccion in this._secciones) {
        seccion = this._secciones[indiceSeccion];
        if (seccion._nombre == nombreSeccion)
            seccionAdevolver = seccion;
    }

    return seccionAdevolver;
}

Biblioteca.prototype.dameLibroAleatorio = function(){
	var utilidades = new Utilidades();
	var libro = null;
	var numeroSeccionAleatoria = utilidades.generarNumeroAleatorioEntre(0, this._secciones.length - 1);
	var seccion = this._secciones[numeroSeccionAleatoria];
	var numeroLibroAleatorio = utilidades.generarNumeroAleatorioEntre(0, seccion._libros.length -1);
	var libro = seccion._libros[numeroLibroAleatorio];
	seccion._libros.splice(numeroLibroAleatorio, 1);

	return libro;
}

Biblioteca.prototype.devolverLibro = function(libro){
	var seccion = this.buscarSeccion(libro._tematica);
	seccion._libros.push(libro);
}

Biblioteca.prototype.ejecutarCiclo = function(){
	for (var i=0; i < this._socios.length; i++){
		var socio = this._socios[i];
		socio.ejecutarCicloSocio();
		//console.log("NO he fallado");
		
	}
}

Biblioteca.prototype.imprimirEstado = function(){
	
console.log("%c======== Estado Biblioteca ========", "color: blue");
	var totalLibros = 0;
	var totalLibrosSocios = 0;
	for (var i = 0; i < this._secciones.length; i++) {
		var seccion = this._secciones[i];
		console.log(" Sección nombre: " + seccion._nombre);
		console.log(" Numero de libros: " + seccion._libros.length);
		totalLibros += seccion._libros.length;
	}

	console.log("Total de libros en la biblioteca: "+ totalLibros);

	for (i=0; i < this._socios.length; i++){
		var socio = this._socios[i];
		totalLibrosSocios +=  socio._libros.length;
	}

	console.log("Total de libros prestados a los socios: " + totalLibrosSocios);
// Total de libros prestados a los socios: 600
	console.log("%c====================================================", "color: blue");
}

function Libro(indice){
	var utilidades = new Utilidades();
	this._nombre  = "Libro: "+ indice;
	this._numeroDePaginas = utilidades.generarNumeroAleatorioEntre(1,600);
	this._autor = utilidades.generarAutorAleatorio();
	this._tematica = utilidades.generarTematicaAleatoria(); //Amor, Aventuras, Naturaleza, Historia, Viajes)
}



function Seccion(nombre){
	this._nombre = nombre;
	this._libros =[];
}

function Socio(numeroSocio){
	var utilidades = new Utilidades();
	this._nombre = utilidades.generarNombreAleatorio() + utilidades.generarApellidoAleatorio();
	this._numeroSocio = numeroSocio;
	this._libros = [];
}

// 6) Añade el método ejecutarCiclo() dentro de un socio
// En cada ciclo un socio dejará los libros que tenía alquilados y cogerá varios (aleatorio entre 1-3) de forma aleatoria.
// Para coger libros deberá hacer uso de una funcion de Biblioteca llamada dameLibroAleatorio();
// Para dejar libros deberá hacer uso de una función de Biblioteca llamada devolverLibro(libro);

Socio.prototype.ejecutarCicloSocio = function(){
	var utilidades = new Utilidades();

	for (var i = this._libros.length-1; i >= 0; i--){
		var libroSocio = this._libros[i];
		biblioteca.devolverLibro(libroSocio);
		this._libros.splice(i,1);
	}


	var numeroDeLibrosATomar = utilidades.generarNumeroAleatorioEntre(1, 3);
	for (var i=0; i < numeroDeLibrosATomar; i++){
		var libro = biblioteca.dameLibroAleatorio();
		this._libros.push(libro);
	}
	
	

//dameLibroAleatorio	
//devolverLibro
}

var biblioteca = new Biblioteca("Biblioteca Publica BBVA");
var IDInterval;

IDInterval = window.setInterval(function(){
	biblioteca.ejecutarCiclo();
	biblioteca.imprimirEstado();
}, 2000);





//biblioteca.inicializar();
//console.log(biblioteca);



