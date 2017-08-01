function saludar (nombrePersona, momento){
	var mensajeSaludo ='';  //inicializamos la variable;
	switch (momento){
		case "mañana":
			mensajeSaludo = "Buenos Días " + nombrePersona;
			break;
		case "tarde":
			mensajeSaludo = "Buenas Tardes " + nombrePersona;
			break;
		case "noche":
			mensajeSaludo = "Buenas Noches " + nombrePersona;
			break;
		default:
			mensajeSaludo = "Hola " + nombrePersona;
			break;
		}
	alert (mensajeSaludo);
	}

//var nombre = "Juan";
//var momen = "mañana";
saludar ("Juan","noche");