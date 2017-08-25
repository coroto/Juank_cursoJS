class ComidaApiClient{
	constructor(apiClient){
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/comidas";
		this._apiClient = apiClient;
	}

	getAllComidas(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let comidas = [];
			for (let i=0; i<data.length; i++){
				let elemento = data[i];
				
				let comida = new Comida(
					elemento._id,	
					elemento.tipo,
					elemento.precio,
					elemento.calorias,
					elemento.existencias,
					elemento.nombre
				);
				comidas.push(comida);
			}
			return comidas;
		});
		return anotherPromise;
	}

	crearComida(comida){
		let completeUrl = this._baseUrl;
		let objectComida = {
			tipo : comida._tipo,
			precio : comida._precio,
			calorias : comida._calorias,
			existencias : comida._existencias,
			nombre : comida._nombre
		}
		let promise = this._apiClient.post(completeUrl, objectComida);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}

	guardarComida(comida){
		let completeUrl = this._baseUrl + "/" + comida._id;
		let objectComida = {
			tipo : comida._tipo,
			precio : comida._precio,
			calorias : comida._calorias,
			existencias : comida._existencias,
			nombre : comida._nombre
		}
		let promise = this._apiClient.put(completeUrl, objectComida);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}

	eliminarComida(comida){
		let completeUrl = this._baseUrl + "/" + comida._id;

		let promise = this._apiClient.delete(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}
}



class Comida{
	constructor(_id, tipo, precio, calorias, existencias, nombre){
		this._id = _id;
		this._tipo = tipo;
		this._precio =precio;
		this._calorias = calorias;
		this._existencias = existencias;
		this._nombre = nombre;
	}
}