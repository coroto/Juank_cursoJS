class CrearCuenta extends Page{
	//titulo, url, autentica
	constructor(titulo, url, autentica){
		super(titulo, url, autentica);
		this._navigatorController = null;
	}

	pintarPagina(){
		let estructura = `
		<h1> Cración Cuenta</h1>
		
		`
		document.body.innerHTML = (estructura);
	}
}