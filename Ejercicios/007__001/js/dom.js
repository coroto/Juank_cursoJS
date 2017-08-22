
window.onload = function(){
	cabecera();
	contenedor();
}

function cabecera(){
	var cabecera = document.createElement('header');
	document.body.appendChild(cabecera);

	var logo = document.createElement('img');
		logo.src = 'images/logo.svg';
		logo.alt = 'logo';

	var boton = document.createElement('button');
	var buscadorTexto = document.createElement('input');
		buscadorTexto.type = 'text';
		buscadorTexto.name = 'buscador';

	cabecera.appendChild(logo);
	cabecera.appendChild(boton);
	cabecera.appendChild(buscadorTexto);
}

function contenedor(){
	var contenedor = crearElemento("div", "contenedor", document.body);
	/* Se incluye nav*/
	var menuNavegacion = crearElemento("nav", "secciones", contenedor);
	/* lista menu*/
	var listamenuNavegacion = crearElemento("ul", "menu", menuNavegacion);
	/* items de la lista*/
	var itemsMenu =["ALCATEL A5 LED","ANÁLISIS 'GOT'","TOP 10 SEMANAL","RECOMENDADOS NETFLIX"];
	for (var i=0; i < itemsMenu.length; i++){
		crearElemento("li", null, listamenuNavegacion, itemsMenu[i]);
		// var itemsListaMenuNav = document.createElement('li');	
		// itemsListaMenuNav.innerHTML= itemsMenu[i];
		// listamenuNavegacion.appendChild(itemsListaMenuNav);		
	}
	/* fin del nav*/
	var seccionNoticias = crearElemento ("section", "noticias", contenedor, null);

	// var seccionNoticias = document.createElement('section');
	// 	seccionNoticias.className = "noticias";
	// contenedor.appendChild(seccionNoticias);
	
	var articuloNoticias = crearElemento("article", null, seccionNoticias, null)
	// var articuloNoticias = document.createElement('article');
	// 	seccionNoticias.appendChild(articuloNoticias);	
	
	var rowNoticias = crearElemento("div", "row", articuloNoticias, null);
	var noticiasCol1 = crearElemento("div", "col-xs-12 col-sd-4 col-md-4", rowNoticias, null);
	
	var noticiasCol2 = crearElemento("div", "hidden-xs col-sd-8 col-md-8", rowNoticias, null);
	var divimgNotcol2 = crearElemento("div", "imagenInformacion", noticiasCol2, null);
	var imgNoticia = crearElemento("img", "img-responsive", divimgNotcol2, null);
}

function crearElemento(nombre, clases, padre, innerHTML){
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

// var newElem = document.createElement('div');
// newElem.id = 'nuevoElemento';
// newElem.className = 'bloque';
// newElem.style = 'background:red; width:200px; height:200px'; 
// var body = document.querySelector('body'); 
// body.appendChild(newElem);