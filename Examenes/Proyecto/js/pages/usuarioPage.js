class UsuarioPage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu, userController){
		super(titulo, url, autentica, estaEnMenu, userController);
		this._navegatorController = null;
		this._userController = userController;
		//this._user = null;
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
		<div class="wrapper">
    		<form class="form-signin">      
	      		<h3 class="form-signin-heading">Actualizar Datos</h2>
	      		<div class="form-group">
				    <label for="username">Username</label>
				    <input type="text" class="form-control" id="txtUsername" />
				</div>

				<div class="form-group">
				    <label for="nombre">Nombre</label>
				    <input type="text" class="form-control" id="txtnombre" />
				</div>

				<div class="form-group">
				    <label for="apellido">Apellido</label>
				    <input type="text" class="form-control" id="txtApellido" />
				</div>

				<div class="form-group">
				    <label for="email">Correo Electrónico</label>
				    <input type="text" class="form-control" id="txtEmail" />
				</div>

	      		<span id="mensaje"></span>
	      		<button class="btn btn-lg btn-warning btn-block" type="button" id="btnActualizar">Actualizar Información</button>   
	      		<button class="btn btn-lg btn-danger btn-block" type="button" id="btnEliminar">Eliminar Usuario</button>  
    		</form>
  		</div>
		`
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 

		let identificadorUser = this._userController._user._id;
		
		this.getUser(identificadorUser);

		//this.pintarFooter();


		let botonCrear = document.body.querySelector("#btnActualizar");
		botonCrear.addEventListener("click", () => this.editarUsuario(identificadorUser));

		let botonEliminar = document.body.querySelector("#btnEliminar");
		//let password = document.querySelector("#txtPassword").value;
		btnEliminar.addEventListener("click", () => this.eliminarUsuario(identificadorUser));
	}

	getUser(userId){
		let promise = this._userController.getUser(userId);
		promise.then((data) =>{
			this._user = data;
			console.log("GET USUARIO");
			document.getElementById("txtUsername").value  = data.username;
			document.getElementById("txtnombre").value = data.nombre;
			document.getElementById("txtApellido").value = data.apellidos;
			document.getElementById("txtEmail").value = data.email;
			console.log(data.username);

		}).catch((e) =>{
			Modal.openModal ("Error!", e.message);
		});

		console.log("Ejecuto GetUser");
	}

	editarUsuario(userId){
		let email = document.getElementById("txtEmail").value;
		let apellidos = document.getElementById("txtApellido").value;
		let nombre = document.getElementById("txtnombre").value;
		let username = document.getElementById("txtUsername").value;
		//let password = document.getElementById("txtPassword").value;
		
		let password = this._userController._user._password;
		alert(password);

		this._user = new User (email, apellidos, nombre, username, password, userId);

		let promise = this._userController.editarUsuario(this._user);
		promise.then((data) =>{
			Modal.openModal ("Aviso", "Actualizacion Correcta");

		}).catch((e) => {
			Modal.openModal ("Error!", e.message);

		});

	}

	eliminarUsuario(userId){
		//let password = document.getElementById("txtPassword").value;
		let password = this._userController._user._password;
		let promise = this._userController.eliminarUsuario(userId, password);
		promise.then((data) =>{
			Modal.openModal ("Aviso", "Eliminación Correcta");
			this._navigatorController.navegarUrl("#login");

		}).catch((e) => {
			Modal.openModal ("Error!", e.message);
		});
	}

}





















