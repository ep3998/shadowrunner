/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
    .module('char')
    .controller('CharSheetCtrl', ['$scope', '$log', 'Mongo', 'Session',
        function($scope, $log, Mongo, Session){
            function calcInitiative(input){
                if(input != null)
                return input.attributes.physical.reaction + input.attributes.mental.intuition;
            }

            $log.log("Current Character Id SHEET = ", Session.getCharacter());

            $scope.initiative = 0;

            $scope.char = Mongo.get({
                model: "characters",
                id: Session.getCharacter()
            });

            $scope.char.$promise.then(function(data){
                $scope.initiative = calcInitiative(data);
            });

            $scope.save = function(){
                if($scope.char._id != null){
                    Mongo.update({
                        model:"characters",
                        id: $scope.char._id
                    },
                    $scope.char);
                } else {
                    Mongo.save({
                        model:"characters"
                        },
                    $scope.char);
                }
            }
        }]);
})();