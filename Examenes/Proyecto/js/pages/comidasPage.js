class ComidasPage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu){
		super(titulo, url, autentica, estaEnMenu);
		this._navegatorController = null;
		this._comidaApiClient = new ComidaApiClient(new ApiClient());
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
			<div class="container">
		        <h1 class="main-title"> Nuestro Menú</h1>
		        <div class="well">
		            <form class="form-inline" id="formulario">
		                <div class="selectpicker">
		                    <label for="tipo">Tipo</label>
		                    <select class="form-control" id="selectTipo">
		                        <option value="Entrante">Entrante</option>
		                        <option value="Principal">Principal</option>
		                        <option value="Postre">Postre</option>
		                    </select>
		                </div>
		                <div class="form-group">
		                    <label for="nombre">Nombre</label>
		                    <input type="text" class="form-control" id="txtNombre" placeholder="Ajiaco">
		                </div>
		                <div class="form-group">
		                    <div class="input-group">
		                       
		                        <div class="input-group-addon">$</div>
		                        <input type="text" class="form-control" id="txtPrecio" placeholder="Precio">
		                    </div>
		                </div>
		                <div class="form-group">
		                    <label for="calorias">Calorias</label>
		                    <input type="text" class="form-control" id="txtCalorias" placeholder="10">
		                </div>
		                <div class="form-group">
		                    <label for="existencias">Existencias</label>
		                    <input type="text" class="form-control" id="txtExistencias" placeholder="400">
		                </div>
		                <button type="button" id="crear" class="btn btn-success">Crear</button>
		                <button type="button" id="guardar" class="btn btn-success" style="display:none">Guardar</button>

		            </form>
		        </div>

		        <table class="table table-striped table-bordered">
		            <thead>
		                <tr>
		                    <th>Tipo</th>
		                    <th>Nombre</th>
		                    <th>Precio</th>
		                    <th>Acciones</th>
		                </tr>
		            </thead>
		            <tbody>
		            </tbody>
		        </table>
		    </div>
		`;
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 
		this.pintarFooter();
		this.getComidaAndPaint();
		this.eventoCrearComida();
	}

	getComidaAndPaint(){
		this._comidaApiClient.getAllComidas().then((data) => {
			this.getAllComidas(data);
			
		});
	}

	getAllComidas(data){
		console.log(data);

		let tbody = document.body.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let comida = data[i];
			let row = this.getRowForComida(comida);
			tbody.appendChild(row);
		}
	}

	getRowForComida(comida){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = comida._nombre;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = comida._existencias;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = comida._calorias;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		
		let buttonDetalles = document.createElement("Button");
		buttonDetalles.innerHTML = "Detalle";
		buttonDetalles.className = "btn btn-info btn-xs";
		buttonDetalles.addEventListener("click", () => this.verDetalleComida(comida));
		td4.appendChild(buttonDetalles);

		let buttonEditar = document.createElement("Button");
		buttonEditar.innerHTML = "Editar";
		buttonEditar.className = "btn btn-warning btn-xs";
		buttonEditar.addEventListener("click", () => this.editarComida(comida));
		td4.appendChild(buttonEditar);

		let buttonEliminar = document.createElement("Button");
		buttonEliminar.innerHTML = "Eliminar";
		buttonEliminar.className = "btn btn-danger btn-xs";
		buttonEliminar.addEventListener("click", () => this.eliminarComida(comida));
		td4.appendChild(buttonEliminar);

		tr.appendChild(td4);

		return tr;
	}

	eventoCrearComida(){
		let buttonCrear = document.body.querySelector("#crear");
		buttonCrear.addEventListener("click",()=> {
			let tipo = document.body.querySelector("#selectTipo").value;
			let nombre = document.body.querySelector("#txtNombre").value;
			let precio = document.body.querySelector("#txtPrecio").value;
			let calorias = document.body.querySelector("#txtCalorias").value;
			let existencias = document.body.querySelector("#txtExistencias").value;
			
			let comida = new Comida(null, tipo, precio, calorias, existencias, nombre);

			let promise = this._comidaApiClient.crearComida(comida);
			promise.then((data) =>{
				this.getComidaAndPaint(data);
				document.getElementById("formulario").reset();
				Modal.openModal ("Creación Exitosa", "Producto Creado" );
			}).catch((e)=>{
				Modal.openModal ("Error", e.message);
			});

		});
	}

	editarComida(comida){
		document.body.querySelector("#selectTipo").value = comida._tipo;
		document.body.querySelector("#txtNombre").value = comida._nombre;
		document.body.querySelector("#txtPrecio").value = comida._precio;
		document.body.querySelector("#txtCalorias").value = comida._calorias;
		document.body.querySelector("#txtExistencias").value = comida._existencias;

		let buttonGuardar = document.body.querySelector("#guardar");
		buttonGuardar =	Utilidades.removeAllEventListenersToElement(buttonGuardar);


		buttonGuardar.setAttribute("style", "display:block");

		buttonGuardar.addEventListener("click",()=> {
			let tipo = document.body.querySelector("#selectTipo").value;
			let nombre = document.body.querySelector("#txtNombre").value;
			let precio = document.body.querySelector("#txtPrecio").value;
			let calorias = document.body.querySelector("#txtCalorias").value;
			let existencias = document.body.querySelector("#txtExistencias").value;
			
			let objComida = new Comida(comida._id, tipo, precio, calorias, existencias, nombre);

			// this._comidaApiClient.guardarComida(objComida).then((data) => {
			// 	this.getComidaAndPaint(data);
			// 	buttonGuardar.setAttribute("style", "display:none");
			// 	let buttonCrear = document.body.querySelector("#crear");
			// 	buttonCrear.setAttribute("style", "display:block");
			// 	document.getElementById("formulario").reset();
			// 	Modal.openModal ("Edición Exitosa", "Producto Modificado" );
			// });

			let promise = this._comidaApiClient.guardarComida(objComida);
			promise.then((data) => {
				this.getComidaAndPaint(data);
				buttonGuardar.setAttribute("style", "display:none");
				let buttonCrear = document.body.querySelector("#crear");
				buttonCrear.setAttribute("style", "display:block");
				document.getElementById("formulario").reset();
				Modal.openModal ("Edición Exitosa", "Producto Modificado" );
			}).catch((e)=>{
				Modal.openModal ("Error", e.message);
			});
		});

		
		let buttonCrear = document.body.querySelector("#crear");
		buttonCrear.setAttribute("style", "display:none");
	}


	eliminarComida(comida){

		let promise = this._comidaApiClient.eliminarComida(comida);
		promise.then((data) =>{
			this.getComidaAndPaint(data);
			Modal.openModal ("Eliminación Exitosa", "Producto Eliminado" );
		}).catch((e)=>{
				Modal.openModal ("Error", e.message);
		});
	}

	verDetalleComida(comida){
		let nombre = comida._tipo;
		let precio = comida._precio;
		let tipo = comida._tipo;
		let calorias = comida._calorias;
		let existencias = comida._existencias;

		let cuerpoMsj = `<p> <strong> Nombre: </strong> ${nombre} </p>
						<p> <strong> Precio: </strong> ${precio} </p>
						<p> <strong> Tipo: </strong> ${tipo} </p>
						<p> <strong> Calorias: </strong> ${calorias} </p>
						<p> <strong> Existencias: </strong> ${existencias} </p>
		`;

		Modal.openModal ("Detalle Comida", cuerpoMsj);
		return cuerpoMsj;
	}
}














