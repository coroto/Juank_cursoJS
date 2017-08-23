class UserController{
	constructor(){
		this._apiClient = new ApiClient();
		this._userApiClient = new UserApiClient(this._apiClient);
	}

	crearUsuario(user){
		
		let promise = this._userApiClient.crearUsuarioApi(user).then((response)=> {
			return true;
		});
		return promise;
	}

	validarSesion(user, password){
		let promise = this._userApiClient.validarSesionApi(user, password).then((response)=>{
			return true;
		});
		return promise;
	}

	getUsuario(){
	}
}
