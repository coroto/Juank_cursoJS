class InnerPage extends Page {
    constructor(titulo, url, autentica, estaEnMenu) {
        super(titulo, url, autentica, estaEnMenu);
        this._navigatorController = null;
    }

    pintarHeader() {

    	let paginasMenu = this._navigatorController.getMenuLinks();

        let header = `
	    <div id="navbar-main">
	        <!-- Fixed navbar -->
	        <div class="navbar navbar-inverse">
	            <div class="container">
	                <div class="navbar-header">
	                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	                        <span class="icon icon-shield" style="font-size:30px; color:#3498db;"></span>
	                    </button>
	                    <a class="navbar-brand hidden-xs hidden-sm" href="#home"><span class="icon icon-shield" style="font-size:18px; color:#3498db;"></span></a>
	                </div>
	                <div class="navbar-collapse collapse">
	                    <ul id="ul-menu" class="nav navbar-nav">
	                    	<!-- aqui van los enlaces del menu -->
	                    	<li>
    							<a href="#login" data-link="#login" class="smoothScroll boton-menu">Salir</a>
    						</li>
	                    </ul>
	                </div>
	                <!--/.nav-collapse -->
	            </div>
	        </div>
	    </div>`;
        document.body.innerHTML = header;

        let enlacesHTML = "";

        for(let i=0; i<paginasMenu.length; i++){
        	let pagina = paginasMenu[i];

 			let enlace = `
 			<li>
    			<a href="${pagina._url}" data-link="${pagina._url}" class="smoothScroll boton-menu">${pagina._titulo}</a>
    		</li>`;

    		enlacesHTML += enlace;
        }

        document.body.querySelector("#ul-menu").innerHTML = enlacesHTML + document.body.querySelector("#ul-menu").innerHTML;

        let enlacesMenu = document.body.querySelectorAll(".boton-menu");

        enlacesMenu.forEach((enlace) => {
            let href = enlace.getAttribute("data-link");
            enlace.addEventListener("click", (event) => {
                event.preventDefault();
                this._navigatorController.navegarUrl(href);
            });
        });
    }

    pintarFooter() {
        let divContendor = document.createElement("div");
        let footer = `
			 <footer class="footer">
			    <div class="container">
			        <ul class="social-icon animate pull-right">
			        	<li>
			        		<a href="#" title="facebook" target="_blank">
			        		<i class="fa fa-facebook"></i>
			        		</a>
			        	</li>
			            <!-- change the link to social page and edit title-->
			            <li><a href="#" title="twitter" target="_blank"><i class="fa fa-twitter"></i></a></li>
			            <li><a href="#" title="google plus" target="_blank"><i class="fa fa-google-plus"></i></a></li>
			        </ul>
			    </div>
			</footer>
 		`;
        divContendor.innerHTML = (footer);
        document.body.appendChild(divContendor);
    }
}