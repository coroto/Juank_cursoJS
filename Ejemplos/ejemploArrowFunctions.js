class Persona {
    constructor(nombre) {
        this._nombre = nombre;
    }

    presentarse() {
        console.log("Hola, mi nombre es " + this._nombre);
    }

    presentarseDentroDeUnSegundo() {
        // var referencia = this;
        setTimeout(() => {
            this.presentarse();
        }, 1000);
    }

    iniciarCiclo() {
        setInterval(() => this.ejecutarCiclo(), 1000);
    }

    ejecutarCiclo() {
        console.log("ciclo");
    }
}

// NO MÁS
// CACA
var intervalID = window.setInterval(function() {
    //zoo.asdas
    //biblioteca.asdasd
});

var prueba = new Persona("Fran");

prueba.presentarseDentroDeUnSegundo();
prueba.iniciarCiclo();