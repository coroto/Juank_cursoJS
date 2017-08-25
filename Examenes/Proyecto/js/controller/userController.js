class UserController{
	constructor(){
		this._apiClient = new ApiClient();
		this._userApiClient = new UserApiClient(this._apiClient);
		this._user = null;
	}

	crearUsuario(user){
		
		let promise = this._userApiClient.crearUsuarioApi(user).then((response)=> {
			return true;
		});
		return promise;
	}

	editarUsuario(user){
		let promise = this._userApiClient.editarUsuarioApi(user).then((response)=> {
			return response;
		});
		return promise;
	}


	eliminarUsuario(userId, password){
		let promise = this._userApiClient.eliminarUsuarioApi(userId, password).then((response)=> {
			return true;
		});
		return promise;	
	}


	login(user, password, sesion){
		let promise = this._userApiClient.validarSesionApi(user, password).then((user)=>{
			this._user = user;
			user._password = password;

			if (sesion == true){
				localStorage.setItem('user', JSON.stringify(user));
			}
			
			return user;
		});
		return promise;
	}

	getUser(userId){
		let promise = this._userApiClient.getUserApi(userId).then((response)=>{
			return response;
		});
		return promise;
	}

	getUserLocalStorage(){
		let objectSesion = null;

		let usuarioSesion = localStorage.getItem('user');
		if(usuarioSesion != null){
			objectSesion = JSON.parse(usuarioSesion);
		}
		console.log('mi datos de sesión : ', JSON.parse(usuarioSesion));

		return objectSesion;
	}

	cerrarSesion(){
		localStorage.removeItem("user");

	}

}
