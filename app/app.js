'use strict';

// Declare app level module which depends on views, and components
angular
    .module('shadowrunnerApp', [
        'ngRoute',
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'nav',
        'char',
        'appendix',
        'glossary'
    ]).config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/index/home.html'
            })
            .when('/characters', {
                templateUrl: 'views/characters/char-list.html',
                controller: 'CharListCtrl'
            })
            .when('/characters/sheet', {
                templateUrl: 'views/characters/char-sheet.html',
                controller: 'CharSheetCtrl'
            })
            .when('/appendix', {
                templateUrl: 'views/appendix/appendix.html',
                controller: 'AppendixCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);
