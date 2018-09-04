angular.module('app')
	.config(appConfig);

appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');


	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/components/home.html',
		controller: 'homeController'
	})
	$stateProvider.state('vinDialog', {
		url: '/vindialog',
		templateUrl: '/components/vinDialog.html',
		controller: 'vinDialogController'
	})
	$stateProvider.state('vinDropzone', {
		url: '/vindropzone',
		templateUrl: '/components/vinDropzone.html',
		controller: 'vinDropzoneController'
	})
	$stateProvider.state('vinLoader', {
		url: '/vinloader',
		templateUrl: '/components/vinLoader.html',
		controller: 'vinLoaderController'
	})
	$stateProvider.state('vinNotify', {
		url: '/vinnotify',
		templateUrl: '/components/vinNotify.html',
		controller: 'vinNotifyController'
	})
	$stateProvider.state('vinPeek', {
		url: '/vinpeek',
		templateUrl: '/components/vinPeek.html',
		controller: 'vinPeekController'
	})
	$stateProvider.state('vinTip', {
		url: '/vintip',
		templateUrl: '/components/vinTip.html',
		controller: 'vinTipController'
	})
	$stateProvider.state('quickMsg', {
		url: '/quickmsg',
		templateUrl: '/components/quickMsg.html',
		controller: 'quickMsgController'
	})
}

// angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
// 	$routeProvider
// 		// home page
// 		.when('/', {
// 			templateUrl: 'partials/home',
// 			controller: 'MainController'
// 		})

// 		.when('/nerds', {
// 			templateUrl: 'views/nerd',
// 			controller: 'NerdController'
// 		})

// 		.when('/geeks', {
// 			templateUrl: 'partials/geek',
// 			controller: 'GeekController'	
// 		});

	

// }]);