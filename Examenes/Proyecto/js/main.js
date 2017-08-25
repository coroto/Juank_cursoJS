class Main{
	constructor(){
		this._navController = new NavigationController();
		this._userController = new UserController();
	}

	agregarPaginasNavController(){

		//titulo, url, autentica
		let loginPage = new LoginPage("Login", "#login", false, false, this._userController);
		this._navController.addPagina(loginPage);

		let crearCuentaPage = new CrearCuenta("Crear Cuenta", "#cuenta", false, false, this._userController);
		this._navController.addPagina(crearCuentaPage);


		let homePage = new HomePage("Home", "#home", true, true);
		this._navController.addPagina(homePage);

		let comidasPages = new ComidasPage("Gestión de Comidas", "#comidas", true, true);
		this._navController.addPagina(comidasPages);

		let bebidasPages = new BebidasPage("Gestión de Bebidas", "#bebidas", true, true);
	    this._navController.addPagina(bebidasPages);

		let usuarioPage = new UsuarioPage("Información Usuario", "#usuario", true, true, this._userController);
		this._navController.addPagina(usuarioPage);

		this._navController.navegarUrl("#login");

	}
}

window.onload = () => {
    let main = new Main();
    main.agregarPaginasNavController();
};