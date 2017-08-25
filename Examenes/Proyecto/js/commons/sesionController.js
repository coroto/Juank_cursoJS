class SesionController{
	constructor(){
	}

	static cerrarSesion(nombreSesion){
		localStorage.removeItem(nombreSesion);
	}
}