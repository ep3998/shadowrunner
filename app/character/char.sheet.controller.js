/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
    .module('char')
    .controller('CharSheetCtrl', ['$scope', '$log', 'Mongo', 'Session',
        function($scope, $log, Mongo, Session){
            $scope.initiative = 0;
            $scope.conditionPhysical = [];
            $scope.conditionStun = [];

            //"condition": {
            //    "physical": {
            //        "current": 8,
            //            "max": 10
            //    },
            //    "stun": {
            //        "current": 4,
            //            "max": 5
            //    },
            //    "effects": []
            //}

            function setupPhysical(input){
                for(var i = 0; i < input.condition.physical.max; i++){
                    var currPhysical = {
                        "index": input.condition.physical.max - i,
                        "isChecked": (i < (input.condition.physical.max
                                        - input.condition.physical.current)),
                        "classes": (i < (input.condition.physical.max
                                        - input.condition.physical.current) ? "condition-fill" : "")
                    };

                    $scope.conditionPhysical.push(currPhysical);
                }
            }

            function setupStun(input){
                for(var i = 0; i < input.condition.stun.max; i++){
                    var currPhysical = {
                        "index": input.condition.stun.max - i,
                        "isChecked": (i < (input.condition.stun.max
                                        - input.condition.stun.current)),
                        "classes": (i < (input.condition.stun.max
                                        - input.condition.stun.current) ? "condition-fill" : "")
                    };

                    $scope.conditionStun.push(currPhysical);
                }
            }

            $scope.physicalClick = function(index){
                var diff = $scope.char.condition.physical.max - index;
                $log.log("Index " + index + " clicked");

                for(var i = 0; i < $scope.char.condition.physical.max; i++){
                    if(i <= diff){
                        $scope.conditionPhysical[i].classes = "condition-fill";
                        $scope.conditionPhysical[i].isChecked = true;
                    } else {
                        $scope.conditionPhysical[i].classes = "";
                        $scope.conditionPhysical[i].isChecked = false;
                    }
                }
            };

            $scope.physicalHover = function(index){
                var diff = $scope.char.condition.physical.max - index;
                for(var i = 0; i < $scope.char.condition.physical.max; i++){
                    if($scope.conditionPhysical[i].isChecked){
                        if(i > diff) {
                            $scope.conditionPhysical[i].classes = "condition-hover";
                        } else {
                            $scope.conditionPhysical[i].classes = "condition-fill";
                        }
                    } else if(i <= diff){
                        $scope.conditionPhysical[i].classes = "condition-hover";
                    } else {
                        $scope.conditionPhysical[i].classes = "";
                    }
                }
            };

            $scope.physicalReset = function(){
                for(var i = 0; i < $scope.char.condition.physical.max; i++){
                    if($scope.conditionPhysical[i].isChecked){
                        $scope.conditionPhysical[i].classes = "condition-fill";
                    } else {
                        $scope.conditionPhysical[i].classes = "";
                    }
                }
            };

            //Utility functions
            function calcInitiative(input){
                if(input != null)
                return input.attributes.physical.reaction + input.attributes.mental.intuition;
            }

            //Setup character functions
            $scope.char = Mongo.get({
                model: "characters",
                id: Session.getCharacter()
            });

            $scope.char.$promise.then(function(data){
                $log.log("Data retrieved - init page");
                $scope.initiative = calcInitiative(data);
                setupPhysical(data);
                setupStun(data);
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