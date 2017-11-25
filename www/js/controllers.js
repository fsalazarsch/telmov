angular.module("App")

.controller("MainController", function($scope, $resource, $routeParams, DriverResource, $resource, $location, LxNotificationService){
	$scope.driver = { driver: undefined};
	
	
	$scope.drivers = DriverResource.query();
	$scope.title= "Login";
	

	$scope.verificar = function(){
		$scope.flag = false;
		$scope.drivers=[];

		y = DriverResource.query(function (response){
			angular.forEach(response, function (item){
					$scope.drivers.push(item);
			});
		});

		$scope.update = function(){
			$scope.driver.driver= parseInt($scope.drivers[0].id_proveedor);
		}
		

		x = DriverResource.query(function (response) 
		{
		    angular.forEach(response, function (item) 
		    {

				if(item.sandbox2 == $scope.driver.passwd){
						
					if(item.id_proveedor == $scope.driver.driver.id_proveedor){
					if($scope.flag == false)
						$scope.flag = true;
						}
					if(item.id_proveedor != $scope.driver.driver.id_proveedor){
						if($scope.flag == true)
						$scope.flag = true;
						}
				}
			});
					if($scope.flag == true){
					//$.post('http://www.city-ex.cl/chv/site/insertlogin', {
					//	id: $routeParams.id 
					//	});
					$location.path("/driver/"+$scope.driver.driver.id_proveedor);
					}
					else
					LxNotificationService.error('Usuario o Password incorrectos');
		});

	}
})


.controller("DriverController", function($scope, DriverResource, JornadaResource, $routeParams, $location, $filter){
	//hecho el seguimiento

	$scope.title = "Servicios";
	
	$scope.driver = DriverResource.get({id: $routeParams.id});
	$scope.id = $routeParams.id;
	
	$scope.servicios = JornadaResource.query({id: $routeParams.id}).$promise.then(function(result){
		$scope.servicios = result;
		
		$scope.ruta = "imgs/user.png";
		
	});

	$scope.fechap = $filter('date')(new Date(), 'yyyy-MM-dd');
	$scope.$watch('fechap', function() {
		$scope.fechap = $filter('date')($scope.fechap, 'yyyy-MM-dd');
	});


	//$interval(increaseCounter, 10000* parseInt(mins[0])); 
})

.controller("ServicioController", function($scope, JornadaResource, DetalleJornadaResource, FolioResource, $routeParams, $location, $filter, LxNotificationService, $http){
	$scope.folio = {
		contacto: undefined,
		};
	
	var options = {
		enableHighAccuracy: true,
		timeout: 20000,
		maximumAge: 18000000
		};

	function success(pos){
		var crd = pos.coords;
		$scope.folio.coord_x = crd.latitude;
		$scope.folio.coord_y = crd.longitude;
	};

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
		LxNotificationService.alert('Error', 'No es posible obtener su ubicacion, verifique su configuracion GPS',  'OK' , function(answer)
		{
			if(answer == true){
				history.back();
			}
		})
	};

	navigator.geolocation.getCurrentPosition(success, error, options);
	//fin geolocalizacion

	
	$scope.title = "BITACORA DE SERVICIOS";

	$scope.detalle = DetalleJornadaResource.get({id: $routeParams.id});
	console.log($scope.detalle);
	$scope.servicio = FolioResource.get({id: $routeParams.id}).$promise.then(function(result){
		$scope.servicio = result;
		$scope.ids= $routeParams.id;


		var cad = {};

		if(result.hora_inicio != undefined){
			var aux = result.hora_inicio.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = aux[i];
				}
			}
			$scope.folio.hr_inicio = JSON.parse(JSON.stringify(cad));
		}

		cad = {};
		if(result.hora_termino != undefined){
			var aux = result.hora_termino.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = aux[i];
				}
			}
			$scope.folio.hr_termino = JSON.parse(JSON.stringify(cad));
		}

		cad = {};
		if(result.km_inicio != undefined){
			var aux = result.km_inicio.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = parseInt(aux[i]);
				}
			}
			$scope.folio.km_inicio = JSON.parse(JSON.stringify(cad));
		}


		cad = {};
		if(result.km_termino != undefined){
			var aux = result.km_termino.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = parseInt(aux[i]);
				}
			}
			$scope.folio.km_termino = JSON.parse(JSON.stringify(cad));
		}

		cad = {};
		if(result.lugar_inicio != undefined){
			var aux = result.lugar_inicio.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = aux[i];
				}
			}
			$scope.folio.lugar_salida = JSON.parse(JSON.stringify(cad));
		}

		cad = {};
		if(result.lugar_termino != undefined){
			var aux = result.lugar_termino.split(";");
			for (var i =0; i< aux.length; i++){
				if(aux[i] != ''){
					cad[i] = aux[i];
				}
			}
			$scope.folio.lugar_llegada = JSON.parse(JSON.stringify(cad));
		}

		$scope.folio.tag = parseInt(result.tag);
		$scope.folio.estacionamiento = parseInt(result.estacionamiento);
		$scope.folio.peaje = parseInt(result.peaje);

		$scope.folio.observacion = result.observaciones;

	});

		
		
	//$scope.$watch('hr_inicio[0]', function() {
	//$scope.folio.hr_inicio = $filter('date')($scope.hr_inicio, 'HH:mm:ss');
	//});
	
	
	$scope.guardarfolio = function(){
		var hr_inicio = $scope.folio.hr_inicio;
		var hr_termino = $scope.folio.hr_termino;
		var km_inicio = $scope.folio.km_inicio;
		var km_termino = $scope.folio.km_termino;
		var lugar_salida = $scope.folio.lugar_salida;
		var lugar_llegada = $scope.folio.lugar_llegada;
		var hi = '', ht = '', ki = '', kt = '', ls = '', lle = '';
		
		for(var i =0; i< 20 ; i++){
			if(hr_inicio[i] !== undefined){
				hi += hr_inicio[i];
				if(i < 19)
					hi += ';';
			}
			else{
				if(i < 19)
					hi +=';';
			}
			
			if(hr_termino[i] !== undefined){
				ht += hr_termino[i];
				if(i < 19)
					ht += ';';
			}
			else{
				if(i < 19)
					ht +=';';
			}
				
			if(km_inicio[i] !== undefined){
				ki += km_inicio[i];
				if(i < 19)
					ki += ';';
			}
			else{
				if(i < 19)
					ki +=';';
			}

			if(km_termino[i] !== undefined){
				kt += km_termino[i];
				if(i < 19)
					kt += ';';
			}
			else{
				if(i < 19)
					kt +=';';
			}

			if(lugar_salida[i] !== undefined){
				ls += lugar_salida[i];
				if(i < 19)
					ls += ';';
			}
			else{
				if(i < 19)
					ls +=';';
			}

			if(lugar_llegada[i] !== undefined){
				lle += lugar_llegada[i];
				if(i < 19)
					lle += ';';
			}
			else{
				if(i < 19)
					lle +=';';
			}
		}
			 		



		
		$scope.cx  = $scope.folio.coord_x;
		$scope.cy = $scope.folio.coord_y;
			
		$.post('https://www.city-ex.cl/teleton/site/guardarfoliotel', {
			id: $routeParams.id, tiempo_real: $scope.tr, km_inicio: ki, km_termino: kt, hr_termino: ht, hr_inicio: hi, lugar_llegada: lle , lugar_salida: ls, coord_x: $scope.cx, coord_y: $scope.cy, peaje: $scope.folio.peaje, tag: $scope.folio.tag, estacionamiento: $scope.folio.estacionamiento, observacion: $scope.folio.observacion 
			});
			
		LxNotificationService.confirm('Guardado', 'Ha guardado la informacion correctamente, puede continuar en la bitacora o salir.', { cancel:'Continuar', ok:'Salir' }, function(answer){
				if(answer == true){
					history.back();
				}
		});
	}		
});
