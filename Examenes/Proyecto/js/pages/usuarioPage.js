class UsuarioPage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu){
		super(titulo, url, autentica, estaEnMenu);
		this._navegatorController = null;
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
		<div class="wrapper">
    		<form class="form-signin">      
	      		<h2 class="form-signin-heading">Información Usuario</h2>
	      		<div class="form-group">
				    <label for="nombreUsuario">Username</label>
				    <input type="text" class="form-control" id="username" />
				</div>

				<div class="form-group">
				    <label for="nombre">Nombre</label>
				    <input type="text" class="form-control" id="nombre" />
				</div>

				<div class="form-group">
				    <label for="apellido">Nombre</label>
				    <input type="text" class="form-control" id="apellido" />
				</div>

				<div class="form-group">
				    <label for="email">Correo Electrónico</label>
				    <input type="text" class="form-control" id="email" />
				</div>

				<div class="form-group">
				    <label for="password">Contraseña</label>
				    <input type="text" class="form-control" id="password" placeholder="Ingresa Tu contraseña" required="" autofocus="" />
				</div>

	      		<span id="mensaje"></span>
	      		<button class="btn btn-lg btn-warning btn-block" type="button" id="iniciarSesion">Actualizar Información</button>   
	      		
    		</form>
  		</div>
		`
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 
		this.getUser("599cb3decff12304d258f5e9");
		this.pintarFooter();
	}

	getUser(userId){
		console.log(" Trae Información de 1 Usuario");
	}

}