angular.module('hello', ['ngRoute', 'auth', 'home', 'navigation'])
    .config(function($httpProvider, $locationProvider, $routeProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl : 'js/home/home.html',
            controller : 'home',
            controllerAs: 'controller'
        }).when('/login', {
            templateUrl : 'js/navigation/login.html',
            controller : 'navigation',
            controllerAs: 'controller'
        }).otherwise('/');
    }).run(function(auth) {
        auth.init('/', '/login', '/logout');
    });