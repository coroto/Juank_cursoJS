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
		botonIniciar.addEventListener("click", () => this.validarSesion());

		let botonCrearCuenta = document.body.querySelector("#crearCuenta");
		botonCrearCuenta.addEventListener("click", () => {
		    this._navigatorController.navegarUrl("#cuenta")
		});
	}

	validarSesion(){
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		let promise = this._userController.validarSesion(username, password);
		promise.then((data) =>{
			this._navigatorController.navegarUrl("#home");
		}).catch((e) =>{
			let error = e.message;
			let mensajeData = "Por favor Validar: " + error;
			let mensaje = document.body.querySelector("#mensaje");
			mensaje.innerHTML = mensajeData;

			console.error(e.message);
		});
	}
}