class SuperHeroApiClient{
	constructor(apiClient){
		this._baseUrl = "https://ironhack-characters.herokuapp.com/characters";
		this._apiClient = apiClient;
	}

	//este metodo devuelve una promesa
	//que se resuelve con un array de objetos SuperHeroe

	getAllSuperHeroes(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let superHeroes = [];
			for (let i=0; i<data.length; i++){
				let elemento = data[i];
				// SuperHeroe(identificador, apodo, arma, trabajo, deuda)
				let superHeroe = new SuperHeroe(
					elemento.id,	
					elemento.name,
					elemento.weapon,
					elemento.occupation,
					elemento.debt
				);
				superHeroes.push(superHeroe);
			}
			return superHeroes;
		});
		return anotherPromise;
	}

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