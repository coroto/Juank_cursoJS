class PostApiClient{
	constructor(apiClient){
		this._baseUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
		this._apiClient = apiClient;
	}

	//este metodo devuelve una promesa
	//que se resuelve con un array de objetos SuperHeroe

	getAllPost(userId){
		let completeUrl = this._baseUrl + userId;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let posts = [];
			for (let i=0; i<data.length; i++){
				let elemento = data[i];
				// SuperHeroe(identificador, apodo, arma, trabajo, deuda)
				let post = new Post(
					elemento.userId,	
					elemento.id,
					elemento.title,
					elemento.body
				);
				posts.push(post);
			}
			return posts;
		});
		return anotherPromise;
	}
}