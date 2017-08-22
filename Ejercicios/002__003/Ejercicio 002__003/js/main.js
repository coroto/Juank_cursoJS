/*

Ejercicio 002__003

Xanxo Whatsapp

Partiendo de los ficheros entregados...

Orquesta la comunicación entre los dos iPhones

Los mensajes que envíe el iphone1 llegarán al iphone2 y viceversa.

No olvides pintar también los mensajes enviados por el propio usuario.

Para pintar dispones de la función pintarMensaje(idIphone, mensaje, esPropio) 

Para obtener el mensaje que ha escrito un usuario dispones de la función getMensaje(idIphone) 

*/

class Mensaje{
	constructor(origen, destino, mensaje){
		this._origen = origen;
		this._destino = destino;
		this._mensaje = mensaje;
	}
}

class MainControler {
    constructor() {
        this._pubsub = new PubSub();
        this._celular = new Celular("iphone1", this._pubsub);
        this._celular2 = new Celular("iphone2", this._pubsub);
        this._celular3 = new Celular("iphone3", this._pubsub);
        this._celular4 = new Celular("iphone4", this._pubsub);
    }

    // pintarMensaje(id, mensaje, esPropio, nombreUsuario) {
    //     let selector = "#" + id + " " + ".messages";
    //     let misMensajes = document.querySelector(selector);

    //     let elementMessage = document.createElement("div");

    //     if (esPropio) {
    //         elementMessage.className = "message messageOwn";
    //     } else {
    //         elementMessage.className = "message";

    //         // Como no es propio, ponemos nombre de usuario
    //         let elementUserName = document.createElement("div");
    //         elementUserName.className = "message__username";
    //         elementUserName.innerHTML = nombreUsuario;

    //         // Coloco el nombre de usuario dentro del mensaje
    //         elementMessage.insertBefore(elementUserName, null);
    //     }
    // }
}

class Celular {
    constructor(id, pubSub) {
        this._id = id;
        this._pubSub = pubSub;
        this.suscribirse();
        this.engancharBoton();
    }

    engancharBoton(){
    	
        let textarea = document.querySelector("#" + this._id + " textarea");
        let mensaje = textarea.value;
       

           document.querySelector("#" + this._id + " button").addEventListener("click", 
    		() => this.publicaMensaje()
    	   );
        }

    suscribirse() {
        this._pubSub.sub("TODOS", (objeto) => this.recibirMensaje(objeto));
        this._pubSub.sub(this._id, (objeto) => this.recibirMensaje(objeto));
    }

    recibirMensaje(objeto) {
        let esPropio = objeto._origen == this._id;
        this.pintarMensaje(objeto, esPropio);
    }

    publicaMensaje() {
        let textarea = document.querySelector("#" + this._id + " textarea");
        let mensaje = textarea.value;
        textarea.value = "";

        let select = document.querySelector("#" + this._id + " select");
        let destinatario = select.value;

        let mensajeObj = new Mensaje(
    		this._id,
    		destinatario,
    		mensaje
    	);

        if (mensaje !=""){
            if(destinatario=="TODOS"){
                this._pubSub.pub(destinatario, mensajeObj);
            }else{
                this._pubSub.pub(destinatario, mensajeObj);
                this._pubSub.pub(this._id, mensajeObj);
            }  
        }else{
            alert("campo vacio");
        }

        
    }

    pintarMensaje(mensaje, esPropio) {
        //let divMensaje = document.querySelector()


         let selector = "#" +  this._id + " " + ".messages";
         let misMensajes = document.querySelector(selector);

         let elementMessage = document.createElement("div");

         if (esPropio) {
             elementMessage.className = "message messageOwn";
         } else {
             elementMessage.className = "message";

        //     // Como no es propio, ponemos nombre de usuario
             let elementUserName = document.createElement("div");
             elementUserName.className = "message__username";
             elementUserName.innerHTML = mensaje._origen;

        //     // Coloco el nombre de usuario dentro del mensaje
             elementMessage.insertBefore(elementUserName, null);
        }

        // // Como no es propio, ponemos nombre de usuario
         let elementText = document.createElement("div");
         elementText.className = "message__text";
         elementText.innerHTML = mensaje._mensaje;

        // // Coloco el nombre de usuario dentro del mensaje
         elementMessage.insertBefore(elementText, null);

        // // Inserto el mensaje
         misMensajes.insertBefore(elementMessage, null);

        console.log("Soy el iphone " + this._id + " y he recibido un mensaje:");
        console.log(mensaje);
    }
}


class PubSub {
    constructor() {
        this._suscriptores = {};
    }

    sub(nombreEvento, funcionCallbackSuscriptor) {
        //Si no existe el canal, seteo un array vacio
        if (!this._suscriptores[nombreEvento]) {
            this._suscriptores[nombreEvento] = [];
        }

        // añado el suscriptor al canal
        this._suscriptores[nombreEvento].push(funcionCallbackSuscriptor);
    }

    pub(nombreEvento, data) {
        // Si el evento existe, recorremos el array con los callbacks
        // De los suscriptores, y lo ejecutamos pasándole el data
        if (this._suscriptores[nombreEvento]) {
            let funcionesCallBackSuscriptores = this._suscriptores[nombreEvento];

            for (let i = 0; i < funcionesCallBackSuscriptores.length; i++) {
                let funcionCallbackSuscriptor = funcionesCallBackSuscriptores[i];
                funcionCallbackSuscriptor(data);
            }
        }
    }
}

window.onload = () => {
	let mainControler = new MainControler();
};


// pubsub.sub("TODOS", (data) => console.log("HAN PUBLICADO EN EL CANAL 'TODOS'", data));
// pubsub.sub("TODOS", (data) => console.log("HAN PUBLICADO 2 EN EL CANAL 'TODOS'", data));
// pubsub.sub("TODOS", (data) => console.log("HAN PUBLICADO 3 EN EL CANAL 'TODOS'", data));
// pubsub.sub("TODOS", (data) => console.log("HAN PUBLICADO 4 EN EL CANAL 'TODOS'", data));
// pubsub.sub("celular1", (data) => console.log("HAN PUBLICADO EN EL CANAL 'celular1'", data));

// pubsub.pub("TODOS", { mensaje: "hola", origen: "Fran" });