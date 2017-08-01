/*

Escribe una función que reciba un string de números separados por dos puntos,
cree un array a partir del string y devuelva la media de todos lo valores

*/
var stringDeNumeros = '80:70:90:100';

function numeros(stringDeNumeros){
    var media = 0;
    var cadena = stringDeNumeros.split(":");
    for(i=0; i < cadena.length; i++){
        var valor = parseInt(cadena[i]);
        media = media + valor;
    }

    media = media / cadena.length;
    console.log("media " + media);

return media;

}

numeros(stringDeNumeros);

// Tests

//var stringDeNumeros = '80:70:90:100';
// La función debe devolver 85

// Bonus

// Misma funcionalidad pero eliminando los repetidos
//var stringDeNumeros = '80:70:90:100:100:100:100';
// también deberá devolver 85