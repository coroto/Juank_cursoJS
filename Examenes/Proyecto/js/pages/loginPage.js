class LoginPage extends Page{
	//titulo, url, autentica
	constructor(titulo, url, autentica){
		super(titulo, url, autentica);
		this._navigatorController = null;
	}

	pintarPagina(){
		let estructura = `
		<div class="wrapper">
    		<form class="form-signin">       
	      		<h2 class="form-signin-heading">Iniciar Sesión</h2>
	      		<input type="text" class="form-control" name="username" placeholder="Nombre de Usuario" required="" autofocus="" />
	      		<input type="password" class="form-control" name="password" placeholder="Constraseña" required=""/>      
	      		<label class="checkbox">
	        		<input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Remember me
	      		</label>
	      		<button class="btn btn-lg btn-primary btn-block" type="button" id="iniciarSesion">Iniciar Sesión</button>   
	      		<button class="btn btn-lg btn-danger btn-block" type="button">Crear Cuenta</button>
    		</form>
  		</div>
		`
		document.body.innerHTML = (estructura);

		//this._contenedorHtml.innerHTML  = estructura;

		let botonIniciar = document.querySelector("#iniciarSesion");
		 botonIniciar.addEventListener("click", () => this.validarSesion());	 
	}

	validarSesion(){
		this._navigatorController.navegarUrl("#home");
	}
}