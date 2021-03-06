class Modal {
    constructor() {}

    static closeModal() {
        var modal = document.body.querySelector("#contenedorModal");
        if (modal) {
            modal.parentElement.removeChild(modal);
        }
    }

    static openModal(titulo, mensaje) {
        let contenedorModal = document.createElement("div");
        contenedorModal.id = "contenedorModal";
        contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" id="close-modal-button">×</button>
						<h4 class="modal-title">${titulo}</h4>
					</div>
					<div class="modal-body">
						${mensaje}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
					</div>
				</div>

			</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

        let botonCerrar = contenedorModal.querySelector("#close-modal-button");
        botonCerrar.addEventListener("click", () => this.closeModal());

        let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
        botonCerrar2.addEventListener("click", () => this.closeModal());

        document.body.appendChild(contenedorModal);
    };
}