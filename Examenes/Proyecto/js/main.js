class Main{
	constructor(){
		this._navController = new NavigationController();
	}

	agregarPaginasNavController(){

		//titulo, url
		let loginPage = new LoginPage("Login", "#login", false);
		this._navController.addPagina(loginPage);

		let crearCuentaPage = new CrearCuenta("Crear Cuenta", "#cuenta", false);
		this._navController.addPagina(crearCuentaPage);

		let homePage = new HomePage("Home", "#home", true);
		this._navController.addPagina(homePage);

		// let page1 = new Page("Page 1", "#page1", true);
		// this._navController.addPagina(page1);

		// let page2 = new Page("Page 2", "#page2", true);
		// this._navController.addPagina(page2);

		// let page3 = new Page("Page 3", "#page3", true);
		// this._navController.addPagina(page3);

		// let page4 = new Page("Page 3", "#page3", true);
		// this._navController.addPagina(page4);

		this._navController.navegarUrl("#login");

	}
}

window.onload = () => {
    let main = new Main();
    main.agregarPaginasNavController();
};