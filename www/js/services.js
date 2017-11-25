angular.module("App")
.factory('DriverResource', function($resource){
    return $resource('https://www.city-ex.cl/api/api/driversteleton', {}, {
        query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'https://www.city-ex.cl/api/api/driversteleton/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/drivers'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/drivers/:id', id: "@id"}
    });
})

.factory('JornadaResource', function($resource){
    return $resource('https://www.city-ex.cl/rapi2/api/jornadas/:id', {id : "@id"}, {
        query: {method: 'GET',  isArray: true },
        //get: { method: 'GET',  url: 'http://www.city-ex.cl/rapi2/api/servicios/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/servicios'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/servicios/:id', id: "@id"}
    });
})

.factory('DetalleJornadaResource', function($resource){
    return $resource('https://www.city-ex.cl/rapi2/api/detallejornadas/:id', {id : "@id"}, {
        get: { method: 'GET',  url: 'https://www.city-ex.cl/rapi2/api/detallejornadas/:id', id: "@id"},
    });
})
.factory('FolioResource', function($resource){
    return $resource('https://www.city-ex.cl/rapi2/api/folioteleton/:id', {id: "@id"},  {
        //query: {method: 'GET',  isArray: true },
        get: { method: 'GET',  url: 'https://www.city-ex.cl/rapi2/api/folioteleton/:id', id: "@id"},
        //save: {method: 'POST', url: 'http://www.city-ex.cl/rapi2/api/folios'},
        //update: { method: 'PUT', url: 'http://www.city-ex.cl/rapi2/api/folios/:id', id: "@id"}
    });
})
