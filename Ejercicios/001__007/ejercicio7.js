/*

Realiza una función que reciba un array de números y devuelva cada par de posiciones
que al sumarlas devuelvan cero.

Por ejemplo:


// Posic:    0   1   2  3  4   5   6   7
var array = [2, -5, 10, 5, 4, -10, 0, -5];

Debe devolver:
[ "1,3" , "2,5" , "3,7", "6,6" ]

*/

var buscarParejas = function(array) {
    console.warn(" -- Buscando Pareja");
    parejas = [];
    for(i=0; i < array.length; i++){
        valorActual = array[i];
        for(j=i; j < array.length; j++){
            otroValor = array[j];
            if (valorActual + otroValor == 0){
                parejas.push(i+","+j);
            }
        }
    }

    return parejas;
}

// Tests

var miArray = [2, -5, 10, 5, 4, -10, 0, -5];
console.log(buscarParejas(miArray));
//console.log(buscarParejas(miArray));


// Debe imprimir [ "1,3" , "2,5" , "3,7", "6,6" ]