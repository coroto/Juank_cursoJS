class PokemonApiClient{
	constructor(apiClient){
		this._baseUrl = "http://pokeapi.co/api/v2/pokemon/?offset=";
		this._apiClient = apiClient;
	}

	getPokemonsAtPage(pagina){	
		
		let offset = (pagina - 1) * 20;
        //let completeUrl = `${this._baseUrl}/?offset=${offset}`;
        let completeUrl = this._baseUrl + offset;
        console.log(completeUrl);

		//let completeUrl = this._baseUrl + pagina;
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
		let promise = this._apiClient.get(url, null);
		var anotherPromise = promise.then((data)=>{
			let pokemon = new Pokemon(
					data.name, 
					data.urlDePokemon,					
					data.weight,
					data.height,
					data.sprites.front_default
			);
			return pokemon;
		});
		return anotherPromise;
	}
}
