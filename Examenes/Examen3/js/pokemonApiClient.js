class PokemonApiClient{
	constructor(apiClient){
		this._baseUrl = "http://pokeapi.co/api/v2/pokemon/?offset=";
		this._apiClient = apiClient;
	}

	getPokemonsAtPage(pagina){	
		
		let completeUrl = this._baseUrl + pagina;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let datos = data.results;
			let pokemones = [];
			for (let i=0; i<datos.length; i++){
				
				let elemento = datos[i];
					let name = elemento.name;	
					let url = elemento.url;

				let pokemon = new Pokemon(name,url);			
				
				pokemones.push(pokemon);
			}
			return pokemones;
		});
		return anotherPromise;
	}



	getPokemonByUrl(url){

	}
}
