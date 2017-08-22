class InnerPage extends Page{
	constructor(titulo, url, autentica){
		super(titulo, url, autentica);
		this._navigatorController = null;
	}

 	pintarHeader(){
 		let header = `
 			<div class="header">
 				<h1> Esta es mi cabecera </h1>
 			</div>
 		`
 		document.body.innerHTML = (header);	
 	}

 	pintarFooter(){
 		let divContendor = document.createElement("div");
 		let footer = `
 			<div class="header">
 				<h1> Esta es mi  Pie </h1>
 			</div>
 		`
 		divContendor.innerHTML = (footer);
 		document.body.appendChild(divContendor); 
 	}
}