class CrearCuenta extends Page{
	//titulo, url, autentica
	constructor(titulo, url, autentica, estaEnMenu, userController){
		super(titulo, url, autentica, estaEnMenu, userController);
		this._navigatorController = null;
		this._userController = userController;

		this._user = null;
	}

	pintarPagina(){
		let estructura = `
		<div class="wrapper">
    		<form class="form-signin" id="formUsuario">       
	      		<h2 class="form-signin-heading">Te damos la Bienvenida.</h2>
	      		<input type="text" class="form-control" name="email" id="email" placeholder="Correo electrónico" required="" autofocus="" />
	      		<input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="Apellidos" required=""/>   
	      		<input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" required=""/>   
	      		<input type="text" class="form-control" name="username" id="username" placeholder="Nombre Usuario" required=""/>  
	      		<input type="password" class="form-control" name="password" id="password" placeholder="Contraseña" required=""/>  
	      		<span id="mensaje"></span>
	       		<button class="btn btn-lg btn-success btn-block" type="button" id="crear">Terminado</button>   
    		</form>
  		</div>
		`;
		document.body.innerHTML = (estructura);

		let botonCrear = document.body.querySelector("#crear");
		botonCrear.addEventListener("click", () => this.crearUsuario());
	}

	crearUsuario(){

		console.log("CREAR USUARIO");
		let email = document.getElementById("email").value;
		let apellidos = document.getElementById("apellidos").value;
		let nombre = document.getElementById("nombre").value;
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		
		this._user = new User (email, apellidos, nombre, username, password);

		let promise = this._userController.crearUsuario(this._user);
		promise.then((data) =>{
			let user = data.username;
			let mensajeData = "usuario " + user + " Creado OK";
			let mensaje = document.body.querySelector("#mensaje");
			mensaje.innerHTML = mensajeData;

			document.getElementById("formUsuario").reset();

			this._navigatorController.navegarUrl("#login");

		}).catch((e) => {
			let error = e.message;
			let mensajeData = "Por favor Validar: " + error;
			let mensaje = document.body.querySelector("#mensaje");
			mensaje.innerHTML = mensajeData;

			console.error(e.message);
		});
	}
}