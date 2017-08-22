class Persona{
    constructor(nombre){
        this._nombre = nombre;
    }

    set nombre(nombre){
        if(typeof(nombre) == "string"){
            if(nombre.length >= 3){
                this._nombre = nombre;
            }else{
                console.error("nombre debe ser al menos de 3 caracteres");
            }
        }else{
            console.error("nombre debe ser de tipo string");
        }
    }

    get nombre(){
        return this._nombre;
    }
}

var fran = new Persona("Fran");

fran.nombre = "Fr";