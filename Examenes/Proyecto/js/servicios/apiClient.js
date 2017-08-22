class ApiClient{
	constructor(){

	}

	get (url, data){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
	    	method: "GET",
	    	headers: headers
		};

		let promise = fetch(url, config).then((response)=>{
			return response.json();
		});

		return promise;
	}

	post (url, data){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
	    	method: "POST",
	    	headers: headers
		};

		if(data){
			let jsonData = JSON.stringify(data);
			config.body = jsonData;
		}

		let promise = fetch(url, config).then((response)=>{
			if (response.status >= 200 && response.status < 300){
				return response.json();
			}else{
				return Promise.reject("ERROR");
			}
			
		});

		return promise;
	}

	put (url, data){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
	    	method: "PUT",
	    	headers: headers
		};

		if(data){
			let jsonData = JSON.stringify(data);
			config.body = jsonData;
		}
		


		let promise = fetch(url, config).then((response)=>{
			return response.json();
		});

		return promise;
	}

	delete (url, data){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
	    	method: "DELETE",
	    	headers: headers
		};

		let promise = fetch(url, config).then((response)=>{
			return response.text();
		});

		return promise;
	}
}