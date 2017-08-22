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
		this._usuariosApiClient = new UsuariosApiClient(this._apiClient);
		this._almacenUsuarios = new AlmacenUsuarios(this);
		
		this._almacenPost = new AlmacenPost(this);
		this._postApiClient = new PostApiClient(this._apiClient);

		this._paginaActual = 1;
	}

	// verUsuarios(){
	// 	this._almacenUsuarios.init(this._divAlmacen, this._usuariosApiClient. this._paginaActual);
	// }


	paginaSiguiente(){
		this._paginaActual = this._paginaActual + 1;
		this.verUsuarios();

	}

	paginaAnterior(){

		this._paginaActual = this._paginaActual - 1;

		if (this._paginaActual < 1){
			this._paginaActual = 1;
		}

		this.verUsuarios();

	}

	verUsuarios(){
		this._almacenUsuarios.init(this._divAlmacen, this._usuariosApiClient);
	}

	verPost(idUsuario){
		this._almacenPost.init(this._divAlmacen, this._postApiClient, idUsuario);
	}

	verComentarios(idPost, idUsuario){

	}

	init(){
		this.pintarEstructura();
		//this._almacenUsuarios.init(this._divAlmacen, this._usuariosApiClient);
		this.verUsuarios();
	}

	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacen = document.createElement("div");
		this._divAlmacen.className = "almacen-usuarios";

		this._container.appendChild(this._divAlmacen);
		document.body.appendChild(this._container);
	}
}

class User{
	constructor(id, name, username, email, address, phone, website, company){
		this._id = id;
		this._name = name;
		this._username = username;	
		this._email = email;
		this._address = address; 
		this._phone = phone;
		this._website = website;
		this._company = company;
	}
}

class Address{
	constructor(street, suite, city, zipcode, geo){
		this._street = street;
		this._suite = suite;
		this._city = city;
		this._zipcode = zipcode;
		this._geo = geo;
	}
}


class Post{
	constructor(userId, id, title, body){
		this._userId = userId;
		this._id = id;
		this._title = title;
		this._body = body;
	}
}

class Comments {
	constructor(postId, id, name, email, body){
		this._postId = postId;
	    this._id = id;
	    this._name = name;
	    this._email = email;
	    this._body = body;
	}
}
	
class AlmacenUsuarios{
	constructor(mainController){
		this._contenedorHtml = null;
		this._usuarios = [];
		this._usuariosApiClient = null;
		this._mainController = mainController;
	}

	init(contenedorHtml, usuariosApiClient, pagina){
		this._contenedorHtml = contenedorHtml;
		this._usuariosApiClient = usuariosApiClient;
		this.pintarEstructura();
		this.getAllUsuariosAndPaint(pagina);
		
	}

	getAllUsuariosAndPaint(pagina){
		this._usuariosApiClient.getAllUsuarios(pagina).then((data) => {
			this.getAllUsuarios(data);
			
		});
	}

	getAllUsuarios(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let usuario = data[i];
		 	let row = this.getRowForUser(usuario);
		 	tbody.appendChild(row);
		}
	}


	getRowForUser(usuario){
		//id, name, username, email, address, phone, website, company
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = usuario._id;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = usuario._name;
		tr.appendChild(td2);

		//
		let td3 = document.createElement("td");

		let buttonPost = document.createElement("button");
		buttonPost.innerHTML = usuario._username;
		buttonPost.className = "btn btn-link";
		td3.appendChild(buttonPost);
		tr.appendChild(td3);

		buttonPost.addEventListener("click", () => this._mainController.verPost(usuario._id));

		//

		let td4 = document.createElement("td");
		td4.innerHTML = usuario._email;
		tr.appendChild(td4);

		let td5 = document.createElement("td");
		/*td5.innerHTML = usuario._address;
		tr.appendChild(td5);*/


		let buttonAddress = document.createElement("button");
		buttonAddress.innerHTML = "Ver Direccion";
		buttonAddress.className = "btn btn-warning";
		td5.appendChild(buttonAddress);
		tr.appendChild(td5);
		let html = "<p>Ciudad: "+ usuario._address._city +"</p>";
		html = html + "<p>zipcode: "+ usuario._address._zipcode +"</p>";
		html = html + "<img src ='http://icons.iconarchive.com/icons/hektakun/pokemon/icons-390.jpg'>";
		buttonAddress.addEventListener("click", () => Modal.openModal("Direccion", html));


		let td6 = document.createElement("td");
		td6.innerHTML = usuario._phone;
		tr.appendChild(td6);

		let td7 = document.createElement("td");
		td7.innerHTML = usuario._website;
		tr.appendChild(td7);

		let td8 = document.createElement("td");
		td8.innerHTML = usuario._company.name;
		tr.appendChild(td8);

		return tr;
	}


	pintarEstructura(){
		let estructura = `
			<h1 class="main-title"> Blog</h1>
			<h2 class="form-title"> Usuarios </h2>
			
			
		
			<div class="reset">
				<button id="refrescar" class="btn btn-primary">Refrescar</button>
			</div>

			<div class="siguiente">
				<button id="siguiente" class="btn btn-primary">Siguiente</button>
			</div>

			<table class="table table-striped table-bordered">
		  		<thead>
		  			<tr>
		  				<th>ID</th>
		  				<th>Nombre</th>
		  				<th>Username</th>
		  				<th>email</th>
		  				<th>address</th>
		  				<th>phone</th>
		  				<th>website</th>
		  				<th>company</th>
		  			</tr>
		  		</thead>
		  		<tbody>

		  		</tbody>
			</table>
			`;

		this._contenedorHtml.innerHTML  = estructura;
		let botonRefrescar = this._contenedorHtml.querySelector("#refrescar");
		botonRefrescar.addEventListener("click", () => this.getAllUsuariosAndPaint());


		this._contenedorHtml.innerHTML  = estructura;
		let botonSiguiente = this._contenedorHtml.querySelector("#siguiente");
		botonSiguiente.addEventListener("click", () => this._mainController.paginaSiguiente());
	}

}


class AlmacenPost{
	constructor(mainController){
		this._contenedorHtml = null;
		this._userId = null;
		this._mainController = mainController;
		this._postApiClient = null;
	}

	init(contenedorHtml, postApiClient, userId){
		this._contenedorHtml = contenedorHtml;
		this.pintarEstructura();
		this.getAllPostAndPaint(userId);
		this._userId = userId;
		this._postApiClient = postApiClient;
	}

	getAllPostAndPaint(userId){
		this._mainController._postApiClient.getAllPost(userId).then((data) => {
			this.getAllPost(data);
			
		});
	}

	getAllPost(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let post = data[i];
		 	let row = this.getRowForPost(post);
		 	tbody.appendChild(row);
		}
	}


	getRowForPost(post){
		//userId, id, title, body
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = post._userId;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = post._id;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = post._title;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = post._body;
		tr.appendChild(td4);

		return tr;
	}


	pintarEstructura(){
		let estructura = `
			<h1 class="main-title"> Blog</h1>
			<h2 class="form-title"> Post </h2>
			
			
		
			<div class="reset">
				<button id="retornar" class="btn btn-danger">Retornar</button>
			</div>

			<table class="table table-striped table-bordered">
		  		<thead>
		  			<tr>
		  				<th>userId</th>
		  				<th>id</th>
		  				<th>title</th>
		  				<th>body</th>
		  			</tr>
		  		</thead>
		  		<tbody>

		  		</tbody>
			</table>
			`;

		this._contenedorHtml.innerHTML  = estructura;
		let botonretornar = this._contenedorHtml.querySelector("#retornar");
		botonretornar.addEventListener("click", () => this._mainController.verUsuarios());
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
















