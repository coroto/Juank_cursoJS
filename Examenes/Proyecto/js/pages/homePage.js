class HomePage extends InnerPage{
	constructor(titulo, url, autentica, estaEnMenu){
		super(titulo, url, autentica, estaEnMenu);
		this._navegatorController = null;
		this._comidaApiClient = new ComidaApiClient(new ApiClient());
	}

	pintarPagina(){
		this.pintarHeader();
		
		let divContendor = document.createElement("div");

		let contenido = `
			<div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
		`;
		divContendor.innerHTML = (contenido);
		document.body.appendChild(divContendor); 

		this.getComida();
		this.pintarFooter();
	}

	getComida(){
		this._comidaApiClient.getAllComidas().then((data) => {

			let misPlatos = data;
			console.log (misPlatos);
			let principal = 0;
			let entrante = 0;
			let postre = 0;
			let comidas = [];
			
			for (let i=0; i < misPlatos.length; i++){
				debugger;
				if (misPlatos[i]._tipo == "Principal"){
					principal = principal + misPlatos[i]._existencias;
				}
				if (misPlatos[i]._tipo == "Entrante"){
					entrante = entrante + misPlatos[i]._existencias;
				}
				if (misPlatos[i]._tipo == "Postre"){
					postre = postre + misPlatos[i]._existencias;
				}
			}

			comidas.push(principal);
			comidas.push(entrante)
			comidas.push(postre);
			
			this.pintarGrafica(comidas);
		});
	}

	pintarGrafica(comidas){
		Highcharts.chart('container', {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text: 'Platos disponibles por Tipo de Comida'
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                }
		            }
		        }
		    },
		    series: [{
		        name: 'Porcentaje',
		        colorByPoint: true,
		        data: [{
		            name: 'Principal',
		            y: comidas[0]
		        }, {
		            name: 'Entrante',
		            y: comidas[1],
		            sliced: true,
		            selected: true
		        }, {
		            name: 'Postre',
		            y: comidas[2]
		        } ]
		    }]
		});
	}
}