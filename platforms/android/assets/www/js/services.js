angular.module("App")
.factory('DriverResource', function($resource){
    return $resource('http://www.city-ex.cl/api/api/drivers', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/api/api/drivers/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/drivers'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/drivers/:id', id: "@id"}
    });
})
.factory('PatenteResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/patentes', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/patentes/:id', id: "@id"}
    });
})
.factory('ProgramaResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/programas', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/programas/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/programas'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/programas/:id', id: "@id"}
    });
})
.factory('ServiciosResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/servicios', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/servicios/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/servicios'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/servicios/:id', id: "@id"}
    });
})
.factory('ServiciostrResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/serviciostr', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/serviciostr/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/serviciostr'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/serviciostr/:id', id: "@id"}
    });
})
.factory('CierreResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/cierres', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/cierres/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/cierres'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/cierres/:id', id: "@id"}
    });
})
.factory('FolioResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/folios', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/folios/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/folios'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/folios/:id', id: "@id"}
    });
})
.factory('Folio2Resource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/folios2', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/folios2/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/folios2'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/folios2/:id', id: "@id"}
    });
})
.factory('UserResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/users', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/users/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/users'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/users/:id', id: "@id"}
    });
})
.factory('TempcierreResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/tempcierres', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/tempcierres/:id', id: "@id"}
    });
})
.factory('ServiciobusResource', function($resource){
    return $resource('http://www.city-ex.cl/rapi2/api/serviciobus', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/serviciobus/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/programas'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/programas/:id', id: "@id"}
    });
})


.factory("localtime", function($http) {
  return $http.get('http://www.city-ex.cl/chv/site/getlocal');
})

//crea base de datos.
.factory("db", function(){
	return openDatabase('dblocal', '1', 'base de datos local', 2 * 1024 * 1024);
})

//crea tablas
.factory('tablas', function ($q, db){
	return{
		crearTabla: function (nombretabla, parametros){
			db.transaction(function (tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS "+nombretabla+" ("+parametros+")");
			})
		},
		selecciona: function (nombretabla, select, where, cb){
			db.transaction(function(tx){
				tx.executeSql("SELECT "+select+" from '"+nombretabla+"' WHERE "+where, [], function(tx, results){
					console.log("SELECT "+select+" from "+nombretabla+" WHERE "+where);
					var resultados=[];
					for(var j=0; j<results.rows.length; j++){
						resultados.push(results.rows.item(j));
					}
					cb(resultados);
				});
			});
		},
		modcampo: function (nombretabla, campo, value, id){
			db.transaction(function(tx){
				var sql  = 'UPDATE '+nombretabla+' SET '+campo+'='+value+' WHERE id_servicio = "'+id+'";'; 
				console.log(sql);
				tx.executeSql(sql);
			});
		},
		elimina: function (nombretabla){
			db.transaction(function (tx){
				tx.executeSql("DELETE FROM '"+nombretabla+"'");
			})
		},
		insertar: function (nombretabla, campos, values){
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO "+nombretabla+" ("+campos+") VALUES ("+values+");");
			});
		},
		modificar: function (nombretabla, campos, values, id){
			db.transaction(function(tx){
				var strsql = '';
				for(var i=0; i<campos.length; i++) { //campos y values deben tener un mismo length
					strsql += campos[i]+' = "'+values[i]+'", ';
				}
			
				strsql = strsql.substring(0, strsql.length-2); //quitamos los ultimos ', '
				strsql = 'UPDATE '+nombretabla+' SET '+strsql+' WHERE id = "'+id+'";'; 
				tx.executeSql(strsql);
			});
		}
	}
})
