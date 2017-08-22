window.onload = function(){
	var header = document.querySelector('header'); 
	header.addEventListener('click', function(e) {
		console.log('Has clickado en ' + e.target.nodeName + " header"); 
	});

	var body = document.querySelector('body'); 
	header.addEventListener('click', function(e) {
		console.log('Has clickado en ' + e.target.nodeName) + "body"; 
	});

	var body = document.querySelector('h1'); 
	header.addEventListener('click', function(e) {
		console.log('Has clickado en ' + e.target.nodeName) + "h1"; 
	});


	var a = document.querySelector('a'); 
	a.addEventListener('click', function(e) {
		e.preventDefault();
		console.log("Soy a");
		console.log('Has clickado en ' + e.target.nodeName); 
	});
}