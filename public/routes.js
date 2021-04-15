angular.module('app')
	.config(appConfig);

appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');


	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/public/components/home.html',
		controller: 'homeController'
	})
	$stateProvider.state('vinDialog', {
		url: '/vindialog',
		templateUrl: '/public/components/vinDialog.html',
		controller: 'vinDialogController'
	})
	$stateProvider.state('vinDropzone', {
		url: '/vindropzone',
		templateUrl: '/public/components/vinDropzone.html',
		controller: 'vinDropzoneController'
	})
	$stateProvider.state('vinLoader', {
		url: '/vinloader',
		templateUrl: '/public/components/vinLoader.html',
		controller: 'vinLoaderController'
	})
	$stateProvider.state('vinNotify', {
		url: '/vinnotify',
		templateUrl: '/public/components/vinNotify.html',
		controller: 'vinNotifyController'
	})
	$stateProvider.state('vinPeek', {
		url: '/vinpeek',
		templateUrl: '/public/components/vinPeek.html',
		controller: 'vinPeekController'
	})
	$stateProvider.state('vinTip', {
		url: '/vintip',
		templateUrl: '/public/components/vinTip.html',
		controller: 'vinTipController'
	})
	$stateProvider.state('quickMsg', {
		url: '/quickmsg',
		templateUrl: '/public/components/quickMsg.html',
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