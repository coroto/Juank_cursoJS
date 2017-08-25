class BebidasPage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu){
		super(titulo, url, autentica, estaEnMenu);
		this._bebidaApiClient = new BebidaApiClient(new ApiClient());
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");
		let contenido = `
		<div class="container">
		        <h1 class="main-title"> Nuestras Bebidas</h1>
		        <div class="well">
		            <form class="form-inline" id="formulario">
		                <div class="form-group">
		                    <label for="nombre">Nombre</label>
		                    <input type="text" class="form-control" id="txtNombre" placeholder="Guaro">
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
		                    <label for="grados">Grados</label>
		                    <input type="text" class="form-control" id="txtGrados" placeholder="10">
		                </div>
		                <div class="form-group">
		                    <label for="existencias">Existencias</label>
		                    <input type="text" class="form-control" id="txtExistencias" placeholder="400">
		                </div>

		                <div class="form-group">
							<label>
								<input type="checkbox" id="checkAlcohol"> Alcohólica
							</label>
						</div>

		                <button type="button" id="crear" class="btn btn-success">Crear</button>
		                

		            </form>
		        </div>

		        <table class="table table-striped table-bordered">
		            <thead>
		                <tr>
		                    <th>Nombre</th>
		                    <th>Precio</th>
		                    <th>Alcohólica</th>
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
		//this.pintarFooter();
		this.getBebidaAndPaint();
		this.eventoCrearBebida();
	}

	getBebidaAndPaint(){
		this._bebidaApiClient.getAllBebidas().then((data) => {
			this.getAllBebidas(data);
			
		});
	}

	getAllBebidas(data){
		console.log(data);

		let tbody = document.body.querySelector("tbody");
		tbody.innerHTML = "";

		for (let i=0; i<data.length; i++){
			let bebida = data[i];
			let row = this.getRowForBebida(bebida);
			tbody.appendChild(row);
		}
	}

	getRowForBebida(bebida){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = bebida._nombre;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = bebida._precio;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = bebida._esAlcoholica;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		
		let buttonDetalles = document.createElement("Button");
		buttonDetalles.innerHTML = "Detalle";
		buttonDetalles.className = "btn btn-info btn-xs";
		buttonDetalles.addEventListener("click", () => this.verDetalleBebida(bebida));
		td4.appendChild(buttonDetalles);

		let buttonEditar = document.createElement("Button");
		buttonEditar.innerHTML = "Editar";
		buttonEditar.className = "btn btn-warning btn-xs";
		buttonEditar.addEventListener("click", () => this.editarBebida(bebida));
		td4.appendChild(buttonEditar);

		let buttonEliminar = document.createElement("Button");
		buttonEliminar.innerHTML = "Eliminar";
		buttonEliminar.className = "btn btn-danger btn-xs";
		buttonEliminar.addEventListener("click", () => this.eliminarBebida(bebida));
		td4.appendChild(buttonEliminar);

		tr.appendChild(td4);

		return tr;
	}	

	eventoCrearBebida(){
		let buttonCrear = document.body.querySelector("#crear");
		buttonCrear.addEventListener("click",()=> {
			let nombre = document.body.querySelector("#txtNombre").value;
			let precio = document.body.querySelector("#txtPrecio").value;
			let calorias = document.body.querySelector("#txtCalorias").value;
			let grados = document.body.querySelector("#txtGrados").value;
			let existencias = document.body.querySelector("#txtExistencias").value;
			let esAlcoholica = checkAlcohol.checked;

			//_id, grados, esAlcoholica, precio, calorias, existencias, nombre
			let bebida = new Bebida(null, grados, esAlcoholica, precio, calorias, existencias, nombre);

			// this._bebidaApiClient.crearBebida(bebida).then((data) => {
			// 	this.getBebidaAndPaint(data);
			// 		document.getElementById("formulario").reset();
			// 		Modal.openModal ("Creación Exitosa", "Bebida Creado");
			// });
			let promise = this._bebidaApiClient.crearBebida(bebida);
			promise.then((data) =>{
				this.getBebidaAndPaint(data);
				document.getElementById("formulario").reset();
				Modal.openModal ("Creación Exitosa", "Bebida Creada");
			}).catch((e)=>{
				Modal.openModal ("Error", e.message);
			});

		});
	}

	editarBebida(bebida){
		document.body.querySelector("#txtNombre").value = bebida._nombre;
		document.body.querySelector("#txtPrecio").value = bebida._precio;
		document.body.querySelector("#txtCalorias").value = bebida._calorias;
		document.body.querySelector("#txtGrados").value = bebida._grados;
		document.body.querySelector("#txtExistencias").value = bebida._existencias;
		checkAlcohol.checked = bebida._esAlcoholica;

		
		let formulario = document.body.querySelector("#formulario");
		
		let btnGuardar = formulario.querySelector("#guardar");

		if (btnGuardar !=null){
			formulario.removeChild(btnGuardar);
		}
		let buttonGuardar = document.createElement("button");
		buttonGuardar.innerHTML="guardar";
		buttonGuardar.className = "btn btn-success";
		buttonGuardar.id = "guardar";
		buttonGuardar.setAttribute("type","button");

		//buttonGuardar.setAttribute("style", "display:block");

		buttonGuardar.addEventListener("click",()=> {
			let nombre = document.body.querySelector("#txtNombre").value;
			let precio = document.body.querySelector("#txtPrecio").value;
			let calorias = document.body.querySelector("#txtCalorias").value;
			let grados = document.body.querySelector("#txtGrados").value;
			let existencias = document.body.querySelector("#txtExistencias").value;
			let esAlcoholica = checkAlcohol.checked;
			
			let objBebida = new Bebida(bebida._id, grados, esAlcoholica, precio, calorias, existencias, nombre);

			let promise = this._bebidaApiClient.editarBebida(objBebida);
			promise.then((data) =>{
				this.getBebidaAndPaint(data);
				buttonGuardar.setAttribute("style", "display:none");
				let buttonCrear = document.body.querySelector("#crear");
				buttonCrear.setAttribute("style", "display:block");
				document.getElementById("formulario").reset();
				Modal.openModal ("Edición Exitosa", "Bebida Modificada" );
			}).catch((e)=>{
				Modal.openModal ("Error", e.message);
			});

		});

		formulario.appendChild(buttonGuardar);

		let buttonCrear = document.body.querySelector("#crear");
		buttonCrear.setAttribute("style", "display:none");
	}


	eliminarBebida(bebida){

		let promise  = this._bebidaApiClient.eliminarBebida(bebida);
		promise.then((data) =>{
			this.getBebidaAndPaint(data);
			Modal.openModal ("Eliminación Exitosa", "Bebida Eliminada" );
		}).catch((e)=>{
				Modal.openModal ("Error", e.message);
		});
	}

	verDetalleBebida(bebida){
		let nombre = bebida._nombre;
		let precio = bebida._precio;
		let grados = bebida._grados;
		let calorias = bebida._calorias;
		let existencias = bebida._existencias;
		let esAlcoholica = bebida._esAlcoholica;

		let cuerpoMsj = `<p> <strong> Nombre: </strong> ${nombre} </p>
						<p> <strong> Precio: </strong> ${precio} </p>
						<p> <strong> Grados: </strong> ${grados} </p>
						<p> <strong> Calorias: </strong> ${calorias} </p>
						<p> <strong> Existencias: </strong> ${existencias} </p>
						<p> <strong> Alcohólica: </strong> ${esAlcoholica} </p>
		`;

		Modal.openModal ("Detalle Bebida", cuerpoMsj);
		return cuerpoMsj;
	}

}

















