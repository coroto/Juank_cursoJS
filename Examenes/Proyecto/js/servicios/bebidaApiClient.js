class BebidaApiClient{
	constructor(apiClient){
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/bebidas";
		this._apiClient = apiClient;
	}

	getAllBebidas(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			
			let bebidas = [];
			for (let i=0; i<data.length; i++){
				let elemento = data[i];
				
				let bebida = new Bebida(
					elemento._id,	
					elemento.grados,
					elemento.esAlcoholica,
					elemento.precio,
					elemento.calorias,
					elemento.existencias,
					elemento.nombre
				);
				bebidas.push(bebida);
			}
			return bebidas;
		});
		return anotherPromise;
	}

	crearBebida(bebida){
		let completeUrl = this._baseUrl;
		let objectBebida = {
			grados : bebida._grados,
			esAlcoholica : bebida._esAlcoholica,
			precio : bebida._precio,
			calorias : bebida._calorias,
			existencias : bebida._existencias,
			nombre : bebida._nombre
		}
		let promise = this._apiClient.post(completeUrl, objectBebida);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}

	editarBebida(bebida){
		let completeUrl = this._baseUrl + "/" + bebida._id;
		let objectBebida = {
			grados : bebida._grados,
			esAlcoholica : bebida._esAlcoholica,
			precio : bebida._precio,
			calorias : bebida._calorias,
			existencias : bebida._existencias,
			nombre : bebida._nombre
		}
		let promise = this._apiClient.put(completeUrl, objectBebida);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}

	eliminarBebida(bebida){
		let completeUrl = this._baseUrl + "/" + bebida._id;

		let promise = this._apiClient.delete(completeUrl, null);

		let anotherPromise = promise.then((data) =>{
			return true;
			
		});
		return anotherPromise;
	}

}

class Bebida{
	constructor(_id, grados, esAlcoholica, precio, calorias, existencias, nombre){
		this._id = _id;
		this._grados = grados;
		this._esAlcoholica =esAlcoholica;
		this._precio = precio;
		this._calorias = calorias;
		this._existencias = existencias;
		this._nombre = nombre;
	}
}







