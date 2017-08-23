class NavigationController{
	constructor(){
		this._paginas = [];
	}

	addPagina(pagina){
		this._paginas.push(pagina);
		pagina._navigatorController = this;
	}

	navegarUrl(url){
		let paginaSolicitada = null;
		for (let i = 0; i < this._paginas.length; i++){	
			let pagina = this._paginas[i];
			if (pagina._url == url){
				paginaSolicitada = pagina;
			}
		}

		if (!paginaSolicitada) {
			console.error("Recurso Solicitado NO Disponible");
		}else{
			window.history.pushState(null, paginaSolicitada._titulo, paginaSolicitada._url);
			paginaSolicitada.pintarPagina();
		}
	}

	getMenuLinks(){
		// devuelvo solo las que estaEnMenu == true
		let elementosFiltrados = this._paginas.filter((elemento) => {
			return (elemento._estaEnMenu == true);
		});

		return elementosFiltrados;
	}
}