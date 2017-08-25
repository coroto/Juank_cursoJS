class Loading{
	constructor(){
		var loading = document.body.querySelector("#contenedorLoading");
        if (loading) {
            loading.parentElement.removeChild(loading);
        }
	}

	showLoading{

	}

	hideLoading{
	}
}