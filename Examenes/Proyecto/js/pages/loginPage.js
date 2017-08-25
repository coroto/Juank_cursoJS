class LoginPage extends Page{
	//titulo, url, autentica
	constructor(titulo, url, autentica, estaEnMenu, userController){
		super(titulo, url, autentica, estaEnMenu, userController);
		this._navigatorController = null;
		this._userController = userController;
	}

	pintarPagina(){
		let estructura = `
		<div class="wrapper">
    		<form class="form-signin">       
	      		<h2 class="form-signin-heading">Iniciar Sesión</h2>
	      		<input type="text" class="form-control" name="username" id="username" placeholder="Nombre de Usuario" required="" autofocus="" />
	      		<input type="password" class="form-control" name="password"  id="password" placeholder="Constraseña" required=""/>      
	      		<label class="checkbox">
	        		<input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Remember me
	      		</label>

	      		<span id="mensaje"></span>
	      		<button class="btn btn-lg btn-primary btn-block" type="button" id="iniciarSesion">Iniciar Sesión</button>   
	      		<button class="btn bººtn-lg btn-danger btn-block" type="button" id="crearCuenta">Crear Cuenta</button>
    		</form>
  		</div>
		`;
		document.body.innerHTML = (estructura);

		//this._contenedorHtml.innerHTML  = estructura;

		let botonIniciar = document.body.querySelector("#iniciarSesion");
		botonIniciar.addEventListener("click", () => this.login());

		let botonCrearCuenta = document.body.querySelector("#crearCuenta");
		botonCrearCuenta.addEventListener("click", () => {
		    this._navigatorController.navegarUrl("#cuenta");
		});



		let userInLocalStorage = this._userController.getUserLocalStorage();
		if(userInLocalStorage != null){
			let promise = this._userController.login(userInLocalStorage._username, userInLocalStorage._password, true);
			promise.then((data) =>{
				this._navigatorController.navegarUrl("#home");
			}).catch((e) =>{
				let error = e.message;
				let mensajeData = "Por favor Validar: " + error;
				let mensaje = document.body.querySelector("#mensaje");
				mensaje.innerHTML = mensajeData;
				//localStorage.removeItem("user");
				this._userController.cerrarSesion();
				console.error(e.message);
			});
		}

	}

	login(){

		this._userController.getUserLocalStorage();
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		let sesion = rememberMe.checked;


		let promise = this._userController.login(username, password, sesion);
		promise.then((data) =>{
			this._navigatorController.navegarUrl("#home");

			console.log("usuario " + data._username);
			console.log("id " +data._id);
		}).catch((e) =>{
			let error = e.message;
			let mensajeData = "Por favor Validar: " + error;
			let mensaje = document.body.querySelector("#mensaje");
			mensaje.innerHTML = mensajeData;

			console.error(e.message);
		});
	}
}