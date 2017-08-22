var peticionDeListadoDeUsersHaCambiado = function(event){
	var objetoQueHaHechoLaPeticion = event.target;

	if(objetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la petición HTTP");

		if(objetoQueHaHechoLaPeticion.status == 200){
			var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
			tratamientoDeUsuarios(reponseObject);
		}
	}
}

var peticionDeFollowersHaCambiado = function(event){
	var objetoQueHaHechoLaPeticion = event.target;

	if(objetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la petición HTTP");

		if(objetoQueHaHechoLaPeticion.status == 200){
			var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
			console.log("Los followers son:");
			console.log(reponseObject);
		}
	}
} 

var tratamientoDeUsuarios = function(usuarios){
	var primerUsuario = usuarios[0];
	var nombrePrimerUsuario = primerUsuario.login;
	var urlFollowersPrimerUsuario = primerUsuario.followers_url;

	console.log(nombrePrimerUsuario);
	console.log(urlFollowersPrimerUsuario);

	var peticionObject = new XMLHttpRequest();

	peticionObject.onreadystatechange = peticionDeFollowersHaCambiado;
	peticionObject.open("GET", urlFollowersPrimerUsuario);
	peticionObject.send();
}

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = peticionDeListadoDeUsersHaCambiado;
xhr.open("GET", "https://api.github.com/users");
xhr.send();
