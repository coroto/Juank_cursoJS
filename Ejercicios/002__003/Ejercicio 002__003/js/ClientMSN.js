class ClientMNS {
    constructor(apiClient) {
        //        this._baseUrl = "https://jsonplaceholder.typicode.com/users";
        this._apiClient = apiClient;
    }

    getMensaje() {
        let completeUrl = this._baseUrl;
        let promise = this._apiClient.get(completeUrl, null);
        //data es el array que se envia de la misma forma
        let anotherPromise = promise.then((data) => {
            let celulares = data.map((elemento) => {
                let celular = new Usuario(elemento.id)
                return celular;
            });
            return celulares;
        });

        return anotherPromise;
    }
}