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

	init(){
		this.pintarEstructuraInicial();
		//this._pokedex.init(this._divAlmacen, this._pokemonApiClient);
		this.verPokemones();
	}

	pintarEstructuraInicial(){
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacen = document.createElement("div");
		this._divAlmacen.className = "almacen-pokemones";

		this._container.appendChild(this._divAlmacen);
		document.body.appendChild(this._container);
	}

	verPokemones(){
		this._pokedex.init(this._divAlmacen, this._pokemonApiClient, this._paginaActual);
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
		this.verPokemones();
	}

}

class Pokemon{
	constructor(name, url, peso, altura, urlImage){
		this._name = name;
		this._url = url;
		this._peso = peso;
		this._altura = altura;
		this._urlImagen = urlImage;
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
		this.pintarEstructura(pagina);
		this.getAllPokemonsAndPaint(pagina);
		
	}

		pintarEstructura(pagina){
		let estructura = `
			<div class="menu">
				<div class="container-fluid">
					<div class="navbar-header">
						<h1>PoKeDeX</h1>
					</div>
				</div>
			</div>

			<div class="anterior">
				<button id="anterior" class="btn btn-primary">Anterior</button>
			</div>
			<span> Pagina Actual: ${pagina}</span>
			<div class="siguiente">
				<button id="siguiente" class="btn btn-primary">Siguiente</button>
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

		let td1 = document.createElement("td");
		td1.innerHTML = pokemon._name;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		let buttonDetalles = document.createElement("button");
		buttonDetalles.innerHTML = "Detalles";
		buttonDetalles.className = "btn btn-danger";
		buttonDetalles.addEventListener("click", () => this.getDetallePokemonAndPaint(pokemon._url));
		td2.appendChild(buttonDetalles);
		tr.appendChild(td2);
		//buttonDetalles.addEventListener("click", () => Modal.openModal(pokemon._name, html));
		// llamar 2 funciones
		//buttonDetalles.addEventListener("click", ()=>{
		//	this.getDetallePokemonAndPaint(pokemon._url);
		//	Modal.openModal(pokemon._name, "html")
		//});
		return tr;
	}

	getDetallePokemonAndPaint(urlDetalle){
		this._pokemonApiClient.getPokemonByUrl(urlDetalle).then((data) => {
			this.pintarDetalle(data);			
		});
	}


	pintarDetalle(pokemon){
		let imagen = pokemon._urlImagen;
		let nombre = pokemon._name;
		let peso = pokemon._peso;
		let altura = pokemon._altura;
		let html = `<p><img src="${imagen}"></p>
                    <p><strong>Nombre:</strong> ${nombre} </p>
                    <p><strong>Peso:</strong> ${peso}</p>
                    <p><strong>Altura:</strong> ${altura}</p>
                    `;
        console.log(html);
        Modal.openModal(pokemon._name, html);
        return html;
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
















