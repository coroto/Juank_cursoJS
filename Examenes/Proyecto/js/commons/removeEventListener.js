class Utilidades{
	constructor(){

	}

	static removeAllEventListenersToElement(element){
		var newElement = element.cloneNode(true);
		element.parentNode.replaceChild(newElement, element);

		return newElement;
	}
}