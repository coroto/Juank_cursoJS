class Persona {
    constructor(nombre) {
        this._nombre = nombre;
    }

    presentarse() {
        console.log("Hola, mi nombre es " + this._nombre);
    }

    presentarseDentroDeUnSegundo() {
        var referenciaAlObjeto = this;
        setTimeout(function() {
            referenciaAlObjeto.presentarse();
        }, 1000);
    }
}


function presentarseGlobal() {
    console.log("Hola, mi nombre es " + this._nombre);
}

var persona = new Persona("Fran");


var miFuncionBindeada = presentarseGlobal.bind(persona);

miFuncionBindeada();