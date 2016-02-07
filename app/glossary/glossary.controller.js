/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
        .module('glossary')
        .controller('GlossaryCtrl', ['$scope','$log', 'Mongo',
        function($scope, $log, Mongo){
            $scope.terms = Mongo.query({
                model: "definitions"
            });
        }]);
})();