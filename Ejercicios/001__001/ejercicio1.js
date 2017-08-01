function letraDNIMejorada(dni){
	var letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	var residuo = null;
	residuo = dni % 23;
	//for (var indice=0; indice<letras.length; indice++)
	for (var indice=0; indice<residuo; indice++)
	{
		var letra = letras[residuo];

	}
	console.log("Su Letra es: " + letra);
	document.write("Su DNI es:" +dni+letra );
	return letra;
}
letraDNIMejorada(12312312);

//letraDni(12345678);



function letraDni(dni){
	console.log (dni);
	var residuo = null;
	residuo = dni % 23;
	switch (residuo){
		case 0:
			letra = "T";
			break;
		case 1:
			letra = "R";
			break;
		case 2:
			letra = "W";
			break;
		case 3:
			letra = "A";
			break;	
		case 4:
			letra = "G";
			break;
		case 5:
			letra = "M";
			break;
		case 6:
			letra = "Y";
			break;
		case 7:
			letra = "F";
			break;
		case 8:
			letra = "P";
			break;
		case 9:
			letra = "D";
			break;
		case 10:
			letra = "X";
			break;
		case 11:
			letra = "B";
			break;
		case 12:
			letra = "N";
			break;
		case 13:
			letra = "J";
			break;
		case 14:
			letra = "Z";
			break;
		case 15:
			letra = "S";
			break;
		case 16:
			letra = "Q";
			break;
		case 17:
			letra = "V";
			break;
		case 18:
			letra = "H";
			break;
		case 19:
			letra = "L";
			break;
		case 20:
			letra = "C";
			break;
		case 21:
			letra = "K";
			break;
		case 22:
			letra = "E";
			break;
		default:
			letra = "Error";
			break;
		}

	console.log (residuo);
	console.log ("Letra seguridad: " +  letra);


	return letra;
}


