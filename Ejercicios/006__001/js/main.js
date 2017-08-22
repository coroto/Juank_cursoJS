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
		this._divAlmacenSuperHeroes = null;
		this._apiClient = new ApiClient();
		this._superHeroesApiClient = new SuperHeroApiClient(this._apiClient);
		this._almacenSuperHeroes = new AlmacenSuperHeroes();
	}

	init(){
		this.pintarEstructura();
		this._almacenSuperHeroes.init(this._divAlmacenSuperHeroes, this._superHeroesApiClient);
	}

	pintarEstructura(){
		/*
			<div class="container">
				<div class="almacen-superheroes">
				</div>
			</div>
		*/

		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacenSuperHeroes = document.createElement("div");
		this._divAlmacenSuperHeroes.className = "almacen-superheroes";

		this._container.appendChild(this._divAlmacenSuperHeroes);
		document.body.appendChild(this._container);
	}

}

class SuperHeroe{
	constructor(identificador, apodo, arma, trabajo, deuda){
		this._identificador = identificador;
		this._apodo = apodo;
		this._arma = arma;
		this._trabajo = trabajo;
		this._deuda = deuda;
	}
}

class AlmacenSuperHeroes{
	constructor(){
		this._contenedorHtml = null;
		this._superHeroes = [];
		this._superHeroesApiClient = null;
	}

	init(contenedorHtml, superHeroesApiClient){
		this._contenedorHtml = contenedorHtml;
		this._superHeroesApiClient = superHeroesApiClient;
		this.pintarEstructura();
		this.getAllSuperHeroesAndPaint();
	}

	getAllSuperHeroesAndPaint(){
		this._superHeroesApiClient.getAllSuperHeroes().then((data) => {
			this.getAllSuperHeroes(data);
			
		});
	}

	getAllSuperHeroes(data){
		console.log(data);

		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let superHeroe = data[i];
			let row = this.getRowForSuperHeroe(superHeroe);
			tbody.appendChild(row);
		}
	}

	// debemos insertar filas como esta :

		// <tr>
		// 	<td>1</td>
		// 	<td>Spider</td>
		// 	<td>Nada</td>
		// 	<td>estudiante</td>
		// 	<td>true</td>
		// 	<td>
		// 		<button class="btn btn-danger"> Borrar </button>
		// 		<button class="btn btn-primary"> Editar </button>
		// 	</td>
		// </tr>

	getRowForSuperHeroe(superHeroe){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = superHeroe._identificador;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = superHeroe._apodo;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = superHeroe._arma;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = superHeroe._trabajo;
		tr.appendChild(td4);

		let td5 = document.createElement("td");
		td5.innerHTML = superHeroe._deuda;
		tr.appendChild(td5);

		let td6 = document.createElement("td");

		let button1 = document.createElement("Button");
		button1.innerHTML = "Editar";
		button1.className = "btn btn-warning btn-sm";
		button1.addEventListener("click", () => this.editarSuperHeroe(superHeroe));
		td6.appendChild(button1);


		let button2 = document.createElement("Button");
		button2.innerHTML = "Borrar";
		button2.className = "btn btn-danger btn-sm";
		button2.addEventListener("click", () => this.borrarSuperHeroe(superHeroe));
		td6.appendChild(button2);

		tr.appendChild(td6);
		return tr;
	}

	editarSuperHeroe(superHeroe){

		document.getElementById("nombre").value = superHeroe._apodo;
		document.getElementById("arma").value = superHeroe._arma;
		document.getElementById("profesion").value = superHeroe._trabajo;
		checkdeuda.checked = superHeroe._deuda;



		let botonEditar = this._contenedorHtml.querySelector("#editar");
		botonEditar = Utilidades.removeAllEventListenersToElement(botonEditar);
		botonEditar.addEventListener("click", () => this.modificarSuperHeroe(superHeroe._identificador));	

		botonEditar.setAttribute("style", "");

		let botonCrear = this._contenedorHtml.querySelector("#crear");	
		botonCrear.setAttribute("style", "display:none");	

		console.log("EDITAR SUPER HEROE");
		console.log(superHeroe);
	}

	modificarSuperHeroe(identificador){

		let apodo = document.getElementById("nombre").value;
		let arma = document.getElementById("arma").value;
		let trabajo = document.getElementById("profesion").value;
		let deuda = checkdeuda.checked;
	
		let superHeroe = new SuperHeroe(identificador, apodo, arma, trabajo, deuda);

		this._superHeroesApiClient.editSuperHeroe(superHeroe).then((data) => {
			console.log(" SE MODIFICO .  TODO BIEN");
			this.getAllSuperHeroesAndPaint();
			this.resetFormulario();
		});



		// let botonCrear = this._contenedorHtml.querySelector("#crear");	
		// botonCrear.setAttribute("style", "");	

		// let botonEditar = this._contenedorHtml.querySelector("#editar");
		// botonEditar.setAttribute("style", "display:none");

		console.log("MODIFICAR SUPER HEROE");
		console.log(superHeroe);
	}


	borrarSuperHeroe(superHeroe){

		this._superHeroesApiClient.deleteSuperHeroe(superHeroe).then((data) => {
			console.log(" SE BORRO .  TODO BIEN");
			this.getAllSuperHeroesAndPaint();
		});

		console.log("BORRAR SUPER HEROE");
		console.log(superHeroe);
	}

	crearSuperHeroe(){
		let apodo = document.getElementById("nombre").value;
		let arma = document.getElementById("arma").value;
		let trabajo = document.getElementById("profesion").value;
		let deuda = checkdeuda.checked;
		console.log (deuda);

		let superHeroe = new SuperHeroe(null, apodo, arma, trabajo, deuda);

		this._superHeroesApiClient.createSuperHeroe(superHeroe).then((data) => {
			console.log(" SE CREO .  TODO BIEN");

			this.getAllSuperHeroesAndPaint();
			this.resetFormulario();
			
		});

		//this.getAllSuperHeroesAndPaint();

		console.log("CREAR SUPER HEROE");
		console.log(superHeroe);
	}

	resetFormulario(){
		document.getElementById("formulario").reset();

		let botonCrear = this._contenedorHtml.querySelector("#crear");	
		botonCrear.setAttribute("style", "");	

		let botonEditar = this._contenedorHtml.querySelector("#editar");
		botonEditar.setAttribute("style", "display:none");
	}


	pintarEstructura(){
		let estructura = `
			<h1 class="main-title"> CRUD de Superhéroes</h1>
			<div class="well">
			<h2 class="form-title"> Formulario </h2>
			<form class="form-inline" id="formulario">
			  <div class="form-group">
			    <label for="nombre">Nombre</label>
			    <input type="text" class="form-control" id="nombre" placeholder="Han Solo">
			  </div>
			  <div class="form-group">
			    <label for="arma">Arma</label>
			    <input type="text" class="form-control" id="arma" placeholder="Escudo">
			  </div>
			  <div class="form-group">
			    <label for="profesion">Profesión</label>
			    <input type="text" class="form-control" id="profesion" placeholder="Soldado">
			  </div>

				<div class="form-group">
					<label>
						<input type="checkbox" id="checkdeuda"> Deuda
					</label>
				</div>

			  <button type="button" id="crear" class="btn btn-success">Crear</button>
			  <button type="button" id="editar" class="btn btn-success" style="display:none">Editar</button>
			  <button type="button" id="reiniciar" class="btn btn-info">Reset</button>
			  
			</form>
		</div>
		
		<div class="reset">
			<button id="refrescar" class="btn btn-primary">Refrescar</button>
		</div>



			<table class="table table-striped table-bordered">
		  		<thead>
		  			<tr>
		  				<th>ID</th>
		  				<th>Nombre</th>
		  				<th>Arma</th>
		  				<th>Profesión</th>
		  				<th>Deuda</th>
		  				<th>Acciones</th>
		  			</tr>
		  		</thead>
		  		<tbody>

		  		</tbody>
			</table>`;

		this._contenedorHtml.innerHTML  = estructura;
		let botonRefrescar = this._contenedorHtml.querySelector("#refrescar");
		botonRefrescar.addEventListener("click", () => this.getAllSuperHeroesAndPaint());


		let botonCrear = this._contenedorHtml.querySelector("#crear");
		botonCrear.addEventListener("click", () => this.crearSuperHeroe());		

		let botonReset = this._contenedorHtml.querySelector("#reiniciar");
		botonReset.addEventListener("click", () => this.resetFormulario());	
	}

}


window.onload = () =>{
	let mc = new MainController();
	mc.init();
}
