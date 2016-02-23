'use strict';

// Declare app level module which depends on views, and components
angular
    .module('shadowrunnerApp', [
        'ngRoute',
        'ngAnimate',
        'ngResource',
        'mgcrea.ngStrap',
        'mgcrea.ngStrap.helpers.dimensions',
        'mgcrea.ngStrap.helpers.debounce',
        'nav',
        'char',
        'appendix',
        'glossary',
        'creator'
    ]).config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/creator', {
                templateUrl: 'views/creator/creator.html'
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
                redirectTo: '/creator'
            })
    }]);
