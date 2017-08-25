class UserApiClient{
	constructor(apiClient){
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/users";
		this._apiClient = apiClient;
	}

	crearUsuarioApi(user){
		let completeUrl = this._baseUrl;
		let usuarioObject = {
			email: user._email,
			apellidos: user._apellidos,
			nombre: user._nombre,
			username: user._username,
			password: user._password
		};

		let promise = this._apiClient.post(completeUrl, usuarioObject);

		let anotherPromise = promise.then((data) => {
			console.log("servicio Crear Usuario");
			console.log(data);
			return data;
		});

		return anotherPromise;
	}

	editarUsuarioApi(user){
		let completeUrl = this._baseUrl + "/" + user._id;
		let usuarioObject = {
			email: user._email,
			apellidos: user._apellidos,
			nombre: user._nombre,
			username: user._username,
			password: user._password
		};

		let promise = this._apiClient.put(completeUrl, usuarioObject);

		let anotherPromise = promise.then((data) => {
				console.log("Servicio Editar Usuario");
				console.log(data);
				return true;
		});
		return anotherPromise;
	}

	eliminarUsuarioApi(userId, password){
		let completeUrl = this._baseUrl + "/" + userId;

		let usuarioObject = {
			password: password
		};

		let promise = this._apiClient.delete(completeUrl, usuarioObject);

		let anotherPromise = promise.then((data) => {
				console.log("Eliminación Usuario");
				console.log(data);
				return true;
		});
		return anotherPromise;

	}

	validarSesionApi(user, password){
		let completeUrl = this._baseUrl + "/login";
		let usuarioObject = {
			username: user,
			password: password
		};

		let promise = this._apiClient.post(completeUrl, usuarioObject);

		let anotherPromise = promise.then((data) => {
			console.log("Servicio Login");
			console.log(data);
			let user = new User (data.email, data.apellidos, data.nombre, data.username, null, data._id);
			return user;
		});
		return anotherPromise;
	}

	getUserApi(userId){
		let completeUrl = this._baseUrl +"/" + userId;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			console.log("Servicio traer info usuario");
			let userApi = {
				id: data._id,
				email: data.email,
				apellidos: data.apellidos,
				nombre: data.nombre,
				username: data.username
			};

			return userApi;
		});
		return anotherPromise;
	}

}

class User{
	constructor(email, apellidos, nombre, username, password, id){
		this._email = email;
		this._apellidos = apellidos;
		this._nombre = nombre;
		this._username = username;
		this._password = password;
		this._id = id;
	}

}