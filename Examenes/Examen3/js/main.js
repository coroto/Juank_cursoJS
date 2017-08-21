class Utilidades{
	constructor(){
	}

	static removeAllEventListenersToElement(element){
		var newElement = element.cloneNode(true);
		element.parentNode.replaceChild(newElement, element);
		return newElement;
	}
}

class MainController{
	constructor(){
		this._container = null;
		this._divAlmacen = null;
		this._apiClient = new ApiClient();
		this._pokemonApiClient = new PokemonApiClient(this._apiClient);
		this._pokedex = new Pokedex(this);

		this._paginaActual = 1;
	}

	paginaSiguiente(){
		this._paginaActual = this._paginaActual + 1;
		this.verPokemones();
	}
	paginaAnterior(){

		if (this._paginaActual <= 1){
			this._paginaActual = 1;
		}else{
			this._paginaActual = this._paginaActual - 1;
		}

		console.warn(this._paginaActual);
		this.verPokemones();

	}

	// verPokemones(){
	// 	this._pokedex.init(this._divAlmacen, this._pokemonApiClient);
	// }

	verPokemones(){
		this._pokedex.init(this._divAlmacen, this._pokemonApiClient, this._paginaActual);
	}

	verPost(idUsuario){
		this._almacenPost.init(this._divAlmacen, this._postApiClient, idUsuario);
	}


	init(){
		this.pintarEstructura();
		//this._pokedex.init(this._divAlmacen, this._pokemonApiClient);
		this.verPokemones();
	}

	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacen = document.createElement("div");
		this._divAlmacen.className = "almacen-pokemones";

		this._container.appendChild(this._divAlmacen);
		document.body.appendChild(this._container);
	}
}

class Pokemon{
	constructor(name, url){
		this._name = name;
		this._url = url;
	}
}

// class Pokemon{
// 	constructor(results){
// 		this._results = results;
// 	}
// }

class PokemonDetalle{
	constructor(name, image, weight, height){
		this._name = name;
		this._image = image;
		this._weight = weight;
		this._height = height;
	}
}


class Pokedex{
	constructor(mainController){
		this._contenedorHtml = null;
		this._pokemones = [];
		this._pokemonApiClient = null;
		this._mainController = mainController;
	}

	init(contenedorHtml, pokemonApiClient, pagina){
		this._contenedorHtml = contenedorHtml;
		this._pokemonApiClient = pokemonApiClient;
		this.pintarEstructura();
		this.getAllPokemonsAndPaint(pagina);
		
	}

	getAllPokemonsAndPaint(pagina){
		this._pokemonApiClient.getPokemonsAtPage(pagina).then((data) => {
			this.getPokemonsAtPage(data);
			
		});
	}

	getPokemonsAtPage(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let pokemon = data[i];
		 	let row = this.getRowForPokemon(pokemon);
		 	tbody.appendChild(row);
		}
	}


	getRowForPokemon(pokemon){
		//id, name, username, email, address, phone, website, company
		let tr = document.createElement("tr");

		let td2 = document.createElement("td");
		td2.innerHTML = pokemon._name;
		tr.appendChild(td2);

		let td5 = document.createElement("td");
		/*td5.innerHTML = pokemon._address;
		tr.appendChild(td5);*/


		let buttonDetalles = document.createElement("button");
		buttonDetalles.innerHTML = "Detalles";
		buttonDetalles.className = "btn btn-info";
		td5.appendChild(buttonDetalles);
		tr.appendChild(td5);
		//let html = "<p>Ciudad: "+ pokemon._address._city +"</p>";
		//html = html + "<p>zipcode: "+ pokemon._address._zipcode +"</p>";
		//html = html + "<img src ='http://icons.iconarchive.com/icons/hektakun/pokemon/icons-390.jpg'>";
		buttonDetalles.addEventListener("click", () => Modal.openModal("Mi Pokemon", html));


		return tr;
	}


	pintarEstructura(){
		let estructura = `
			<h1 class="main-title"> Pokedex</h1>
			<h2 class="form-title"> Pokemones </h2>
			
			
		
			<div class="siguiente">
				<button id="siguiente" class="btn btn-primary">Siguiente</button>
			</div>

			<div class="anterior">
				<button id="anterior" class="btn btn-primary">Anterior</button>
			</div>

			<table class="table table-striped table-bordered">
		  		<thead>
		  			<tr>
		  				<th>Nombre</th>
		  				<th>Detalles</th>		  				
		  			</tr>
		  		</thead>
		  		<tbody>

		  		</tbody>
			</table>
			`;


		this._contenedorHtml.innerHTML  = estructura;

		let botonAnterior = this._contenedorHtml.querySelector("#anterior");
		 botonAnterior.addEventListener("click", () => this._mainController.paginaAnterior());
		 
		let botonSiguiente = this._contenedorHtml.querySelector("#siguiente");
		botonSiguiente.addEventListener("click", () => this._mainController.paginaSiguiente());

		// this._contenedorHtml.innerHTML  = estructura;
		 
	}

}

class Modal{
	constructor(){
	}

	static closeModal(){
		var modal = document.body.querySelector("#contenedorModal");
		if(modal){
				modal.parentElement.removeChild(modal);
			}
	}

	static	openModal(titulo, mensaje){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
		<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
		<div class="modal-header">
		<button type="button" class="close" id="close-modal-button">×</button>
		<h4 class="modal-title">${titulo}</h4>
		</div>
		<div class="modal-body">
		${mensaje}
		</div>
		<div class="modal-footer">
		<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
		</div>
		</div>

		</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

			let botonCerrar = contenedorModal.querySelector("#close-modal-button");
			botonCerrar.addEventListener("click", () => this.closeModal());

			let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
			botonCerrar2.addEventListener("click", () => this.closeModal());

			document.body.appendChild(contenedorModal);
		};

}




window.onload = () =>{
	let mc = new MainController();
	mc.init();
}
















