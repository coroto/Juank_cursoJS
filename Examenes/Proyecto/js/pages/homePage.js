class HomePage extends InnerPage{
	constructor(titulo, url, autentica){
		super(titulo, url, autentica);
		this._navegatorController = null;
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
		<h1> Este es mi Home </h1>
		`
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 
		this.pintarFooter();
	}
}