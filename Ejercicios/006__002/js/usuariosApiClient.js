class UsuariosApiClient{
	constructor(apiClient){
		this._baseUrl = "https://jsonplaceholder.typicode.com/users";
		this._apiClient = apiClient;
	}

	//este metodo devuelve una promesa
	//que se resuelve con un array de objetos SuperHeroe
	// getAllUsuarios(pagina){
	// 	let completeUrl = this._baseUrl + "/" + pagina;


	getAllUsuarios(){
		let completeUrl = this._baseUrl ;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let usuarios = [];
			for (let i=0; i<data.length; i++){

				let elemento = data[i];
					// mapeo del objeto Address
					let street = elemento.address.street;
					let suite =  elemento.address.suite;
					let city = elemento.address.city;
					let zipcode = elemento.address.zipcode;
					let geo = elemento.address.geo;
					// paso parametros para creacion de address
				let address =new Address(street, suite, city, zipcode, geo);


				let usuario = new User(
					elemento.id,	
					elemento.name,
					elemento.username,
					elemento.email,
					address, 
					elemento.phone,
					elemento.website,
					elemento.company
				);
				usuarios.push(usuario);
			}
			return usuarios;
		});
		return anotherPromise;
	}

	// getAllUsuarios1(){
	// 	let promise = this._apiClient.get(completeUrl, null).then((data) =>{
	// 		let superHeroes = data.map((elemento) =>{
	// 			let superHeroe = new superHeroe(elemento.id, elemeto.nombre)
	// 				return superHeroe;
	// 		});
	// 		return superHeroe;
	// });

	createSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl;
		let superHeroeObject = {
			name: superHeroe._apodo,
			occupation: superHeroe._trabajo,
			debt: superHeroe._deuda,
			weapon: superHeroe._arma,
			id: superHeroe._identificador
		};

		let promise = this._apiClient.post(completeUrl, superHeroeObject);

		let anotherPromise = promise.then((data) => {
				console.log("data");
				console.log(data);
				return true;
		});
		return anotherPromise;

	}

	editSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl + "/" + superHeroe._identificador;
		let superHeroeObject = {
			name: superHeroe._apodo,
			occupation: superHeroe._trabajo,
			debt: superHeroe._deuda,
			weapon: superHeroe._arma,
			id: superHeroe._identificador
		};

		let promise = this._apiClient.put(completeUrl, superHeroeObject);

		let anotherPromise = promise.then((data) => {
				console.log("data");
				console.log(data);
				return true;
		});
		return anotherPromise;
		
	}

	deleteSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl + "/" + superHeroe._identificador;

		let promise = this._apiClient.delete(completeUrl, null);

		let anotherPromise = promise.then((data) => {
				console.log("data");
				console.log(data);
				return true;
		});
		return anotherPromise;
	}

}