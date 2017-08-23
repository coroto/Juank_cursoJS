class ComidasPage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu){
		super(titulo, url, autentica, estaEnMenu);
		this._navegatorController = null;
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
		<h1> Pagina Comidas </h1>
		`
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 
		this.pintarFooter();
	}
}