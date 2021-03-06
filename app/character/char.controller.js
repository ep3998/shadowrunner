/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
    .module('char')
    .controller('CharListCtrl', ['$scope', '$log', '$location', 'Mongo', 'Session',
    function($scope, $log, $location, Mongo, Session){
        $scope.chars = Mongo.query({
            model: "characters"
        });

        $scope.charClick = function(id){
            Session.setSheetCharacter(id);
            $log.log("Current Character Id", Session.getSheetCharacter());
            $location.path('characters/sheet');
        };
    }]);
})();