class Page{
	constructor(titulo, url, autentica, estaEnMenu, userController){
		this._titulo = titulo;
		this._url = url;
		this._autentica = autentica;
		this._estaEnMenu = estaEnMenu;
		this._navigatorController = null;
		this._userController = userController;
	}
}