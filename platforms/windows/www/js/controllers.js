angular.module("App")

.controller("MainController", function($scope, $resource, $routeParams, DriverResource, $resource, $location, LxNotificationService, tablas, localtime){
	$scope.driver = { driver: undefined};
	

	
	tablas.crearTabla('tbl_folio', 'id_servicio unique,  hr_inicio text, km_inicio text, lugar_salida text, hr_termino text, km_termino text, lugar_llegada text, calidad number, desc_calidad text, coord_x text, coord_y text, tiempo_real text, flag number');
	tablas.crearTabla('tbl_folio2', 'id_servicio unique, hr_inicio text, km_inicio text, lugar_salida text, hr_termino text, km_termino text, pasajero text, calidad number, desc_calidad text, coord_x text, coord_y text, tiempo_real text, flag number');
	
	tablas.crearTabla('tbl_servicio', 'id_servicio unique, peaje number, estacionamiento number, tag number, km_add number, contacto number, observacion text, visado number, flag number');
	tablas.crearTabla('tbl_cierre', 'id_servicio unique, peaje number, estacionamiento number, tag number, km_add number, observacion text, flag number');
	
	
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
			$scope.driver.driver= parseInt($scope.drivers[0].id_driver);
		}
		

		x = DriverResource.query(function (response) 
		{
		    angular.forEach(response, function (item) 
		    {

				if(item.passwd == $scope.driver.passwd){
						
					if(item.id_driver == $scope.driver.driver.id_driver){
					if($scope.flag == false)
						$scope.flag = true;
						}
					if(item.id_driver != $scope.driver.driver.id_driver){
						if($scope.flag == true)
						$scope.flag = true;
						}
				}
			});
					if($scope.flag == true){
					$.post('http://www.city-ex.cl/chv/site/insertlogin', {
						id: $routeParams.id 
						});
					$location.path("/driver/"+$scope.driver.driver.id_driver);
					}
					else
					LxNotificationService.error('Usuario o Password incorrectos');
		});

	}
})


.controller("DriverController", function($scope, ServiciobusResource, DriverResource, ServiciostrResource, PatenteResource, ProgramaResource, Folio2Resource, $routeParams, $location, $filter, TempcierreResource){
	
	$scope.title = "Editar Post";
	$scope.folios2 = Folio2Resource.query();
	$scope.folios3 = ServiciobusResource.query();
	
	$scope.driver = DriverResource.get({id: $routeParams.id});
	$scope.id = $routeParams.id;
	$scope.servicios = ServiciostrResource.query().$promise.then(function(result){
		$scope.servicios = result;
		$scope.patente = PatenteResource.get({id: $scope.driver.patente});
		$scope.pat = $scope.patente;
		
		if(($scope.driver.foto == null) || ($scope.driver.foto == "")){
			$scope.ruta = "imgs/user.png";
		}
		else
			$scope.ruta = "data:image/png;base64,"+$scope.driver.foto;
	});

	$scope.fechap = $filter('date')(new Date(), 'yyyy-MM-dd');
	$scope.$watch('fechap', function() {
		$scope.fechap = $filter('date')($scope.fechap, 'yyyy-MM-dd');
	});

	$scope.fechap2 = $filter('date')(new Date(), 'yyyy-MM-dd');
	$scope.$watch('fechap2', function() {
		$scope.fechap2 = $filter('date')($scope.fechap2, 'yyyy-MM-dd');
		
		$scope.tempcierre = TempcierreResource.get({id: $scope.fechap2}).$promise.then(function(result){
		
		$scope.res = result;
		if($scope.ids_drivers){
			$scope.ids_drivers = result.ids_drivers.split(';');
			if($scope.ids_drivers.indexOf($routeParams.id) != -1)
				$scope.alerta = 'true';
		}
		if($scope.ids_coords){
			$scope.ids_coords = result.ids_coords.split(';');
			if($scope.ids_coords.indexOf($routeParams.id) != -1)
				$scope.alerta2 ="true";
		}
		});

	});
	
	$scope.fechap4 = $filter('date')(new Date(), 'yyyy-MM-dd');
	$scope.$watch('fechap4', function() {
		$scope.fechap4 = $filter('date')($scope.fechap4, 'yyyy-MM-dd');
	});

})

.controller("ServicioController", function($scope, DriverResource, ServiciosResource, FolioResource, ProgramaResource, UserResource, $routeParams, $location, $filter, LxNotificationService, tablas, $http){
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
	
	/*
	 * Extraccion desde tablas locales o BDD
	 */

		$scope.cambiarcalidad = function(val){
			if(val == 1)
			$("#star1").attr("src","./imgs/starok.png");
			$("#star2").attr("src","./imgs/star.png");
			$("#star3").attr("src","./imgs/star.png");
			$("#star4").attr("src","./imgs/star.png");
			if(val == 2){
			$("#star1").attr("src","./imgs/starok.png");
			$("#star2").attr("src","./imgs/starok.png");
			$("#star3").attr("src","./imgs/star.png");
			$("#star4").attr("src","./imgs/star.png");
			}
			if(val == 3){
			$("#star1").attr("src","./imgs/starok.png");
			$("#star2").attr("src","./imgs/starok.png");
			$("#star3").attr("src","./imgs/starok.png");
			$("#star4").attr("src","./imgs/star.png");
			}
			if(val == 4){
			$("#star1").attr("src","./imgs/starok.png");
			$("#star2").attr("src","./imgs/starok.png");
			$("#star3").attr("src","./imgs/starok.png");
			$("#star4").attr("src","./imgs/starok.png");
			}

		$scope.folio.calidad = val;
		//alert($scope.folio.calidad);
		}

	
	cb = function(item){
		if(item.length > 0){//no vacio
			if( item[0].id_servicio == $routeParams.id){
				var hras = item[0].hr_inicio.split(';');
				var cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
						ms = new Date(hras[i]);
						cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_inicio = JSON.parse(JSON.stringify(cad));				
				//hter
				hras = item[0].hr_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
						ms = new Date(hras[i]);
						cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_termino = JSON.parse(JSON.stringify(cad));
				//kmini
				hras = item[0].km_inicio.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_inicio = JSON.parse(JSON.stringify(cad));
				//kmter
				hras = item[0].km_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_termino = JSON.parse(JSON.stringify(cad));				
				//lugar_salida
				hras = item[0].lugar_salida.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_salida = JSON.parse(JSON.stringify(cad));
				//lugar_llegada
				hras = item[0].lugar_llegada.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_llegada = JSON.parse(JSON.stringify(cad));
				
				if(item[0].desc_calidad && item[0].desc_calidad != 'undefined')
					$scope.folio.desc_calidad = item[0].desc_calidad;
				else
				     $scope.folio.desc_calidad = '';
		
				$scope.folio.calidad = item[0].calidad; 					
				$scope.cambiarcalidad($scope.folio.calidad);
		
			}
		}
		else{ //vacio, sacando de la BDD
			$scope.backservicio = FolioResource.get({id: $routeParams.id}).$promise.then(function(result){
				$scope.backservicio = result;
				//hora_inicio
				var hras = result.hr_inicio.split(';');
				var cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						cad[i] = hras[i];
					}
				}
				$scope.folio.hr_inicio = JSON.parse(JSON.stringify(cad));
				//hter
				hras = result.hr_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
						ms = new Date(hras[i]);
						cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}	
				}
				$scope.folio.hr_termino = JSON.parse(JSON.stringify(cad));
				//kmini
				hras = result.km_inicio.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_inicio = JSON.parse(JSON.stringify(cad));
				//kmter
				hras = result.km_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);	
				}
				$scope.folio.km_termino = JSON.parse(JSON.stringify(cad));							
				//lugar_salida
				hras = result.lugar_salida.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_salida = JSON.parse(JSON.stringify(cad));
				//lugar_llegada
				hras = result.lugar_llegada.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_llegada = JSON.parse(JSON.stringify(cad));
				
				if(result.desc_calidad && result.desc_calidad != 'undefined' )
					$scope.folio.desc_calidad = result.desc_calidad; 
				else
				    $scope.folio.desc_calidad = ''; 
				$scope.folio.calidad = result.calidad;
				$scope.cambiarcalidad($scope.folio.calidad);
		 
			});
		}
	}
	//servicio
	c = function(item){
		if(item.length > 0){//no vacio
			if( item[0].id_servicio == $routeParams.id){
				$scope.folio.peaje = item[0].peaje; 
				$scope.folio.estacionamiento = item[0].estacionamiento; 
				$scope.folio.tag = item[0].tag; 
				$scope.folio.kms_add = item[0].km_add; 
				if (item[0].observacion && item[0].observacion != 'undefined' )
				$scope.folio.observacion = item[0].observacion;
				else
				$scope.folio.observacion = '';
			}
		}
		else{ //vacio
			$scope.backservicio = ServiciosResource.get({id: $routeParams.id}).$promise.then(function(result){
				$scope.backservicio = result;
				$scope.folio.peaje = parseInt(result.peaje); 
				$scope.folio.estacionamiento = parseInt(result.estacionamiento); 
				$scope.folio.tag = parseInt(result.tag); 
				$scope.folio.kms_add = parseInt(result.km_adicional); 
				if (result.observacion && result.observacion != 'undefined' )
				$scope.folio.observacion = result.observacion;
				else
				$scope.folio.observacion = '';
			});
		}
	}
	
	
	tablas.selecciona('tbl_folio', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', cb);
	tablas.selecciona('tbl_servicio', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', c);
		
	$scope.title = "BITACORA DE SERVICIOS";

	$scope.servicio = ServiciosResource.get({id: $routeParams.id}).$promise.then(function(result){
		$scope.servicio = result;
		$scope.progr= ProgramaResource.get({id: result.programa});
		$scope.driver = DriverResource.get({id: result.driver});
		$scope.users=[];

		x = UserResource.query(function (response){
			angular.forEach(response, function (item){
				//si son del mismo cc o tienen firma
				if((item.firma != '') && (item.firma != '0') && (item.accessLevel < 75))
					$scope.users.push(item);
			});
		});

		$scope.update = function(){
			$scope.folio.contacto= parseInt($scope.users[0].id);
//			$scope.folio.contacto= parseInt($scope.users[0].id);
		}


	});

		
		
	//$scope.$watch('hr_inicio[0]', function() {
	//$scope.folio.hr_inicio = $filter('date')($scope.hr_inicio, 'HH:mm:ss');
	//});
	
	tablas.insertar('tbl_folio', 'id_servicio, hr_inicio, km_inicio, lugar_salida, hr_termino, km_termino, lugar_llegada, calidad, desc_calidad, coord_x, coord_y, tiempo_real, flag', '"'+$routeParams.id+'","" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"","","", ""');
	tablas.insertar('tbl_servicio', 'id_servicio, peaje, estacionamiento, tag, km_add, observacion, contacto, visado, flag', '"'+$routeParams.id+'","" ,"" ,"" ,"" ,"", "", "", ""');
	
	
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
			 		
		tablas.modcampo('tbl_folio', 'hr_inicio' , '"'+hi+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'hr_termino' , '"'+ht+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'km_inicio' , '"'+ki+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'km_termino' , '"'+kt+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'lugar_salida' , '"'+ls+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'lugar_llegada' , '"'+lle+'"', $routeParams.id);

		tablas.modcampo('tbl_folio', 'coord_x' , 'coord_x || "'+$scope.folio.coord_x+'; "', $routeParams.id);
		tablas.modcampo('tbl_folio', 'coord_y' , 'coord_y || "'+$scope.folio.coord_y+'; "', $routeParams.id);
		
		$http.get("http://www.city-ex.cl/chv/site/getlocal").then(function(response) {
			$scope.myWelcome = response.data;
			tablas.modcampo('tbl_folio', 'tiempo_real' , 'tiempo_real || "'+response.data+'; "', $routeParams.id);
		});
		
		tablas.modcampo('tbl_folio', 'calidad' , '"'+$scope.folio.calidad+'"', $routeParams.id);
		tablas.modcampo('tbl_folio', 'desc_calidad' , '"'+$scope.folio.desc_calidad+'"', $routeParams.id);
		
		tablas.modcampo('tbl_folio', 'flag' , '1' , $routeParams.id); //fue updateada
		
		tablas.modcampo('tbl_servicio', 'peaje' , $scope.folio.peaje, $routeParams.id);
		tablas.modcampo('tbl_servicio', 'estacionamiento' , $scope.folio.estacionamiento, $routeParams.id);
		tablas.modcampo('tbl_servicio', 'km_add' , $scope.folio.kms_add, $routeParams.id);
		tablas.modcampo('tbl_servicio', 'tag' , $scope.folio.tag, $routeParams.id);
		tablas.modcampo('tbl_servicio', 'observacion' , '"'+$scope.folio.observacion+'"', $routeParams.id);
		
		tablas.modcampo('tbl_servicio', 'contacto' , $scope.folio.contacto, $routeParams.id);
		//tablas.modcampo('tbl_servicio', 'visado' , $scope.folio.contacto, $routeParams.id);
		tablas.modcampo('tbl_servicio', 'flag' , '1' , $routeParams.id); //fue updateada
		
		var auxkmi = ki.split(';');
		var auxkmt = kt.split(';');
		var auxhrt = ht.split(';');
			
		var valkmt = '', valhrt='';
		
		for(var i =0; i< auxkmt.length; i++){
			if(auxkmt[i] != '')
				valkmt = auxkmt[i];
		}
		
		for(var i =0; i< auxhrt.length; i++){
			if(auxhrt[i] != '') 
				valhrt = auxhrt[i];
		}

		$.post('http://www.city-ex.cl/chv/site/editservicio', {
			id: $routeParams.id,  peaje: $scope.folio.peaje, estacionamiento: $scope.folio.estacionamiento, km_add: $scope.folio.kms_add, tag: $scope.folio.tag, observaciones:$scope.folio.observacion, contacto: $scope.folio.contacto, km_inicio: auxkmi[0], km_termino: valkmt, hr_termino: valhrt, rut: $scope.pass
		})
		.done(function( data ) {
			LxNotificationService.error(data);
		});
		
		sel = function(item){
			if( item[0].id_servicio == $routeParams.id){
				$scope.cx  = item[0].coord_x;
				$scope.cy = item[0].coord_y;
				$scope.tr = item[0].tiempo_real;
			
				$.post('http://www.city-ex.cl/chv/site/editfolio', {
					id: $routeParams.id, tiempo_real: $scope.tr, km_inicio: ki, km_termino: kt, hr_termino: ht, hr_inicio: hi, lugar_llegada: lle , lugar_salida: ls, coord_x: $scope.cx, coord_y: $scope.cy, calidad: $scope.folio.calidad, desc_calidad: $scope.folio.desc_calidad
				});
			}
		}
		tablas.selecciona('tbl_folio', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', sel);
		LxNotificationService.confirm('Guardado', 'Ha guardado la informacion correctamente, puede continuar en la bitacora o salir.', { cancel:'Continuar', ok:'Salir' }, function(answer){
				if(answer == true){
					history.back();
				}
		});
	}		
})

.controller("CierreController", function($scope, DriverResource, ServiciosResource, ProgramaResource, Folio2Resource, UserResource, CierreResource, $routeParams, $location, $filter, LxNotificationService, tablas, $http){
	$scope.textToObjectMethod = function(data, callback) //funcion que extrae los id de los usuarios y los pasa a nombres
		{
		UserResource.get({id: data}).$promise.then(function(result){
			callback({ username: result.username });
			});
		};

	$scope.folio = {
		contacto: {},
		pasajero: {},
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
		LxNotificationService.alert('Error', 'No es posible obtener su ubicacion',  'OK' , function(answer){
			if(answer == true){
				history.back();
			}
       })
	};

	navigator.geolocation.getCurrentPosition(success, error, options);
	//fin geolocalizacion


	//extraer datos de tablas locales
	c = function(item){
		if(item.length > 0){//no vacio
			if( item[0].id_servicio == $routeParams.id){	
				$scope.fecha = item[0].fecha;
				$scope.driver2 = item[0].driver;
				
				$scope.folio.calidad = item[0].calidad;
				if(item[0].desc_calidad && item[0].desc_calidad != 'undefined')
				$scope.folio.desc_calidad = item[0].desc_calidad;
				else
				$scope.folio.desc_calidad = '';
				//hr_ini			
				var hras = item[0].hr_inicio.split(';');
				var cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
							ms = new Date(hras[i]);
							cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_inicio = JSON.parse(JSON.stringify(cad));
				//hr_ter
				hras = item[0].hr_termino.split(';');
				cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
							}
						else{
							ms = new Date(hras[i]);
							cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_termino = JSON.parse(JSON.stringify(cad));
				//kmini
				hras = item[0].km_inicio.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_inicio = JSON.parse(JSON.stringify(cad));
				//kmter
				hras = item[0].km_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_termino = JSON.parse(JSON.stringify(cad));

				//contacto
				hras = item[0].lugar_salida.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_salida = JSON.parse(JSON.stringify(cad));

				//contacto
				hras = item[0].pasajero.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != ''){
						$scope.folio.pasajero[i] = hras[i];
						}
				}
				
			}
		}
		else{ //vacio
			$scope.backservicio = Folio2Resource.get({id: $routeParams.id}).$promise.then(function(result){
				$scope.backservicio = result;
						
				$scope.folio.calidad = $scope.backservicio.calidad;
				$scope.folio.desc_calidad = $scope.backservicio.desc_calidad;
								
				var hras = $scope.backservicio.hr_inicio.split(';');
				var cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
							ms = new Date(hras[i]);
							cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_inicio = JSON.parse(JSON.stringify(cad));

				hras = $scope.backservicio.hr_termino.split(';');
				cad = {};
				for(var i =0; i < hras.length; i++){
					if(hras[i] != ''){
						if(hras[i].length == 5){
							cad[i] = hras[i];
						}
						else{
							ms = new Date(hras[i]);
							cad[i] = ("0" + ms.getHours()).slice(-2)  + ":" + ("0" + ms.getMinutes()).slice(-2);
						}
					}
				}
				$scope.folio.hr_termino = JSON.parse(JSON.stringify(cad));

				//kmini
				hras = $scope.backservicio.km_inicio.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_inicio = JSON.parse(JSON.stringify(cad));

				//kmter
				hras = $scope.backservicio.km_termino.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = parseInt(hras[i]);
				}
				$scope.folio.km_termino = JSON.parse(JSON.stringify(cad));

				//contacto
				hras = $scope.backservicio.lugar_llegada.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != '')
						cad[i] = hras[i];
				}
				$scope.folio.lugar_salida = JSON.parse(JSON.stringify(cad));

				//contacto
				hras = $scope.backservicio.pasajeros.split(';');
				cad = {};
				for(i =0; i < hras.length; i++){
					if(hras[i] != ''){
						$scope.folio.pasajero[i] = hras[i];
						}
					}
				});
			}
		}
		
		/*
		 * Extraer desde BDD 
		 */
		 cb = function(item){
			 if(item.length > 0){//no vacio
				 if( item[0].id_servicio == $routeParams.id){
					$scope.folio.peaje = item[0].peaje; 
					$scope.folio.estacionamiento = item[0].estacionamiento; 
					$scope.folio.tag = item[0].tag; 
					$scope.folio.observacion = item[0].observacion; 
				}
			}
			else{ //vacio
				z = CierreResource.query(function (response){
					angular.forEach(response, function (item){			
						if(($scope.driver2.id_driver == item.driver) && ($scope.fecha == item.fecha)){
							if(($scope.folio.peaje == undefined) || (parseInt(item.peaje) > parseInt($scope.folio.peaje)))
								$scope.folio.peaje = parseInt(item.peaje);
								
							if(($scope.folio.estacionamiento == undefined) || (parseInt(item.estacionamiento) > parseInt($scope.folio.estacionamiento)))
								$scope.folio.estacionamiento = parseInt(item.estacionamiento); 
								
							if(($scope.folio.tag == undefined) || (parseInt(item.tag) > parseInt($scope.folio.tag)))
								$scope.folio.tag = parseInt(item.tag);
							
							if(item.observaciones != '') 
								$scope.folio.observacion = item.observaciones;
						}
					});
				});
			}
		}
		tablas.selecciona('tbl_cierre', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', cb);			
		tablas.selecciona('tbl_folio2', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', c);

		$scope.title = "BITACORA DE CIERRES";

		$scope.folio2 = Folio2Resource.get({id: $routeParams.id}).$promise.then(function(result){
			$scope.folio2 = result;
			$scope.driver = DriverResource.get({id: result.driver});
			$scope.iddriver = result.driver;
			
			$scope.rutatab2= "/user/add/"+$scope.iddriver+"/"+$routeParams.id;
			
			tablas.insertar('tbl_folio2', 'id_servicio, hr_inicio, km_inicio, lugar_salida, hr_termino, km_termino, pasajero, calidad, desc_calidad, coord_x, coord_y, tiempo_real, flag', '"'+$routeParams.id+'","" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"","","", ""');
			tablas.insertar('tbl_cierre', 'id_servicio, peaje, estacionamiento, tag, km_add, observacion, flag', '"'+$routeParams.id+'","" ,"" ,"" ,"","" ,""');
			//la insercion de los kms va a ser backend
			
			$scope.idusers=[];
			$scope.direcciones = [];
			
			$scope.users=[];
			$scope.idsfolio = [];
			
			$scope.iradduser = function (){
				$location.path($scope.rutatab2);
				}
			
			y = CierreResource.query(function (response){
				angular.forEach(response, function (item){
					if(result.fecha == item.fecha){
						$scope.fecha = result.fecha;
						$scope.idusers.push( UserResource.get({id: item.contacto}));
						$scope.direcciones[item.contacto] = item.lugar;
						$scope.idsfolio.push(item.id_cierre);
					}
				});
			});
			
			x = UserResource.query(function (response){
				angular.forEach(response, function (item){
					$scope.users.push(item);
				});
			});
		
			
			$scope.update = function(i){	
				$scope.id = $scope.folio.pasajero[i].id;
				$scope.folio.pasajero[i]= $scope.id;
				$scope.folio.lugar_salida[i]= $scope.direcciones[$scope.id];
			}
		});

	$scope.guardarfolio = function(){
		var hr_inicio = $scope.folio.hr_inicio;
		var hr_termino = $scope.folio.hr_termino;
		var km_inicio = $scope.folio.km_inicio;
		var km_termino = $scope.folio.km_termino;
		var pasajero = $scope.folio.pasajero;
		var lugar_llegada = $scope.folio.lugar_salida;
		var hi = '', ht = '', ki = '', kt = '', pas = '', lle = '';
		 
		for(var i =0; i< 10 ; i++){
			if(hr_inicio[i] !== undefined){
				hi += hr_inicio[i];
				if(i < 9)
					hi += ';';
			}
			else{
				if(i < 9)
					hi +=';';
			}

			if(hr_termino[i] !== undefined){
				ht += hr_termino[i];
				if(i < 9)
					ht += ';';
			}
			else{
				if(i < 9)
					ht +=';';
			}
				
			if(km_inicio[i] !== undefined){
				ki += km_inicio[i];
				if(i < 9)
					ki += ';';
			}
			else{
				if(i < 9)
					ki +=';';
			}

			if(km_termino[i] !== undefined){
				kt += km_termino[i];
				if(i < 9)
					kt += ';';
			}
			else{
				if(i < 9)
					kt +=';';
			}

			if(lugar_llegada[i] !== undefined){
				lle += lugar_llegada[i];
				if(i < 9)
					lle += ';';
			}
			else{
				if(i < 9)
					lle +=';';
			}
			
			if(pasajero[i] !== undefined){
				pas += pasajero[i];
				if(i < 9)
					pas += ';';
			}
			else{
				if(i < 9)
					pas +=';';
			}
			 
		}

		tablas.modcampo('tbl_folio2', 'hr_inicio' , '"'+hi+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'hr_termino' , '"'+ht+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'km_inicio' , '"'+ki+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'km_termino' , '"'+kt+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'lugar_salida' , '"'+lle+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'pasajero' , '"'+pas+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'driver' , '"'+$scope.iddriver+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'calidad' , '"'+$scope.folio.calidad+'"', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'desc_calidad' , '"'+$scope.folio.desc_calidad+'"', $routeParams.id);
		
		tablas.modcampo('tbl_folio2', 'coord_x' , 'coord_x || "'+$scope.folio.coord_x+'; "', $routeParams.id);
		tablas.modcampo('tbl_folio2', 'coord_y' , 'coord_y || "'+$scope.folio.coord_y+'; "', $routeParams.id);
		
		$http.get("http://www.city-ex.cl/chv/site/getlocal").then(function(response) {
			$scope.myWelcome = response.data;
			tablas.modcampo('tbl_folio2', 'tiempo_real' , 'tiempo_real || "'+response.data+'; "', $routeParams.id);
		});

		tablas.modcampo('tbl_folio2', 'flag' , '1' , $routeParams.id); //fue updateada		
		
		tablas.modcampo('tbl_cierre', 'peaje' , $scope.folio.peaje, $routeParams.id);
		tablas.modcampo('tbl_cierre', 'estacionamiento' , $scope.folio.estacionamiento, $routeParams.id);
		tablas.modcampo('tbl_cierre', 'tag' , $scope.folio.tag, $routeParams.id);
		tablas.modcampo('tbl_cierre', 'observacion' , '"'+$scope.folio.observacion+'"', $routeParams.id);
		tablas.modcampo('tbl_cierre', 'km_add' , '"'+$scope.folio.kmsadd+'"', $routeParams.id);

		tablas.modcampo('tbl_cierre', 'flag' , '1' , $routeParams.id); //fue updateada		
		
		
		$.post('http://www.city-ex.cl/chv/site/editcierre', {
			driver: $scope.iddriver, fecha: $scope.fecha, km_inicio: ki, km_termino: kt, lugar: lle, contacto: pas, peaje: $scope.folio.peaje, estacionamiento: $scope.folio.estacionamiento, tag: $scope.folio.tag, observaciones:$scope.folio.observacion, km_add: $scope.folio.kms_add
		});
		
		sel = function(item){
			if( item[0].id_servicio == $routeParams.id){
				$scope.cx  = item[0].coord_x;
				$scope.cy = item[0].coord_y;
				$scope.tr = item[0].tiempo_real;
							
				$.post('http://www.city-ex.cl/chv/site/editfolio2', {
					id: $routeParams.id, tiempo_real: $scope.tr, km_inicio: ki, km_termino: kt, hr_termino: ht, hr_inicio: hi, lugar_llegada: lle , contacto: pas, coord_x: $scope.cx, coord_y: $scope.cy, calidad: $scope.folio.calidad, desc_calidad: $scope.folio.desc_calidad
				});
			}
		}
		
		tablas.selecciona('tbl_folio2', '*', 'id_servicio = "'+$routeParams.id+'" and flag = 1', sel);
		LxNotificationService.confirm('Guardado', 'Ha guardado la informacion correctamente, puede continuar en la bitacora o salir.', { cancel:'Continuar', ok:'Salir' }, function(answer){
			if(answer == true){
				history.back();
			}
		});
	}
		
})
	
.controller("DriverpstController", function($scope, DriverResource, $routeParams, $location, $http, LxNotificationService){
	
	$scope.title = "Editar Driver";
	$scope.driver = DriverResource.get({id: $routeParams.id});
	
	$scope.updateDriver = function(){
		$.post('http://www.city-ex.cl/chv/site/edituser', {
			id: $routeParams.id,  email: $scope.driver.Email, passwd: $scope.driver.passwd 
		});
		LxNotificationService.alert('Actualizado', 'Datos de conductor actualizados correctamente',  'OK' , function(answer){
			$location.path("/driver/"+$routeParams.id);
		});
	}
		
})

.controller("UseraddController", function($scope, $resource, $routeParams, ProgramaResource, $resource, $location, $filter, LxNotificationService, tablas, localtime){
	
	$scope.centrocostos = ProgramaResource.query();
	$scope.title= "Agregar Usuario al cierre";
	
	$scope.selects = { centrocosto: undefined};

			$scope.fechap3 = $filter('date')(new Date(), 'yyyy-MM-dd');
			$scope.$watch('fechap3', function() {
				$scope.fechap3 = $filter('date')($scope.fechap3, 'yyyy-MM-dd');
			});


		$scope.useradd = function(){
			//alert($scope.user.nombre+' - '+$scope.selects.centrocosto.id_programa);
				$.post('http://www.city-ex.cl/chv/site/adduser', {
					nombre: $scope.user.nombre, fecha: $scope.fechap3, cc: $scope.selects.centrocosto.id_programa
				});
				if($routeParams.idcierre){
				//alert($routeParams.idcierre);
				LxNotificationService.alert('Actualizado', 'Datos de usuario actualizados correctamente',  'OK' , function(answer){
					$location.path("/cierre/"+$routeParams.idcierre);
				});
				}
				else
				LxNotificationService.alert('Actualizado', 'Datos de usuario actualizados correctamente',  'OK' , function(answer){
					$location.path("/driver/"+$routeParams.id);
				});

		}

})


.controller("DriveraddController", function($scope, DriverResource, $routeParams, $location, $http, $filter, LxNotificationService){
	
	$scope.drivers = DriverResource.query();
	$scope.title = "Agregar Conductor al cierre";
	
		$scope.selects = { driver: undefined};
		
			$scope.fechap3 = $filter('date')(new Date(), 'yyyy-MM-dd');
			$scope.$watch('fechap3', function() {
				$scope.fechap3 = $filter('date')($scope.fechap3, 'yyyy-MM-dd');
			});
		
		$scope.verificar = function(){
			if($scope.selects.driver){
				
				$.post('http://www.city-ex.cl/chv/site/adddriver', {
					id: $scope.selects.driver.id_driver, fecha: $scope.fechap3
				});
				LxNotificationService.alert('Actualizado', 'Datos de conductor actualizados correctamente',  'OK' , function(answer){
					$location.path("/driver/"+$routeParams.id);
				});
				}
			
		}

	
})

.controller("ServiciobusController", function($scope, $resource, $routeParams, $location, $http, $filter, ServiciobusResource, LxNotificationService){
	$scope.serv = {
		};
			
	var options = {
		enableHighAccuracy: true,
		timeout: 20000,
		maximumAge: 18000000
		};

	function success(pos){
		var crd = pos.coords;
		$scope.serv.coord_x = crd.latitude;
		$scope.serv.coord_y = crd.longitude;
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

	$scope.backservicio = ServiciobusResource.get({id: $routeParams.id}).$promise.then(function(result){
		$scope.backservicio = result;
		$scope.serv.hora_ini = result.hora_inicio;
		$scope.serv.hora_ter = result.hora_termino;
		$scope.serv.km_inicio = parseInt(result.km_inicio);
		$scope.serv.km_termino = parseInt(result.km_termino);
		$scope.serv.npas = parseInt(result.npas);
				
		$scope.serv.lugar_salida = result.lugar_salida;
		$scope.serv.lugar_llegada = result.lugar_llegada;
		});



	//fin scara datos de la bdd
	
	$scope.title = "Servicio de bus";
		

		$scope.guardarservbus = function(){
				$.post('http://www.city-ex.cl/chv/site/addbus', {
					id: $routeParams.id, hora_ini: $scope.serv.hora_ini, km_inicio: $scope.serv.km_inicio, lugar_salida: $scope.serv.lugar_salida, hora_ter: $scope.serv.hora_ter, km_termino: $scope.serv.km_termino, lugar_llegada: $scope.serv.lugar_llegada, npas: $scope.serv.npas, coord_x: $scope.serv.coord_x, coord_y: $scope.serv.coord_y  
				});
				
				
		//LxNotificationService.confirm('Guardado', 'Ha guardado la informacion correctamente, puede continuar en la bitacora o salir.', { cancel:'Continuar', ok:'Salir' }, function(answer){
		//	if(answer == true){
			alert('Guardado');
				history.back();
		//	}
		//})
									
		};

	
});
