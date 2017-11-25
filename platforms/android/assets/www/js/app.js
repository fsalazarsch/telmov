
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
		angular.element(document).ready(function() {
            angular.bootstrap(document);
        });
    },
};

angular.module("App",["lumx","ngRoute","ngResource"])



.config(['$routeProvider', '$compileProvider', '$httpProvider', function($routeProvider, $compileProvider, $httpProvider) {
	$routeProvider
			.when('/', {
				controller: 'MainController',
				templateUrl: 'templates/home.html'
				})
			.when('/driver/:id', {
				controller: 'DriverController',
				templateUrl: 'templates/driver.html'
				})
			.when('/driver/edit/:id', {
				controller: 'DriverpstController',
				templateUrl: 'templates/driver_form.html'
				})	
			.when('/servicio/:id', {
				controller: 'ServicioController',
				templateUrl: 'templates/servicio.html'
				})	
			.when('/cierre/:id', {
				controller: 'CierreController',
				templateUrl: 'templates/cierre.html'
				})			
			.when('/user/add/:id', {
				controller: 'UseraddController',
				templateUrl: 'templates/user_add.html'
				})			

			.when('/user/add/:id/:idcierre', {
				controller: 'UseraddController',
				templateUrl: 'templates/user_add.html'
				})			
			.when('/driver/add/:id', {
				controller: 'DriveraddController',
				templateUrl: 'templates/driver_add.html'
				})			
			.when('/serviciobus/:id', {
				controller: 'ServiciobusController',
				templateUrl: 'templates/serviciobus.html'
				})			


	//$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}]);
