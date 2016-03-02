/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
    .module('char')
    .controller('CharSheetCtrl', ['$scope', '$log', '$location', 'Mongo', 'Session',
        function($scope, $log, $location, Mongo, Session){
            $scope.conditionPhysical = [];
            $scope.conditionStun = [];
            $scope.penalties = {};


            function setupPhysical(input){
                $scope.conditionPhysical = [];
                var diff = input.condition.physical.max - input.condition.physical.current;

                for(var i = 0; i < input.condition.physical.max; i++){
                    var currPhysical = {
                        "index": input.condition.physical.max - i,
                        "isChecked": (i < (diff)),
                        "classes": (i < (diff) ? "condition-fill" : "")
                    };

                    $scope.conditionPhysical.push(currPhysical);
                }

                $scope.penalties.physical = calcConditionPenalty(diff);
            }

            function setupStun(input){
                $scope.conditionStun = [];
                var diff = input.condition.stun.max - input.condition.stun.current;

                for(var i = 0; i < input.condition.stun.max; i++){
                    var currPhysical = {
                        "index": input.condition.stun.max - i,
                        "isChecked": (i < (diff)),
                        "classes": (i < (diff) ? "condition-fill" : "")
                    };

                    $scope.conditionStun.push(currPhysical);
                }

                $scope.penalties.stun = calcConditionPenalty(diff);
            }

            $scope.conditionClick = function(event, conditionClicked, index, max, condition){
                var diff = max - index;
                var clickElement = angular.element(event.target);

                if(clickElement.hasClass('condition-fill') && (document.querySelector(".condition-hover") == null)){
                    if(conditionClicked === 'physical'){
                        $scope.char.condition.physical.current = max;
                        $scope.penalties.physical = 0;
                    } else if (conditionClicked === 'stun'){
                        $scope.char.condition.stun.current = max;
                        $scope.penalties.stun = 0;
                    }

                    for(var i = 0; i < max; i++){
                        condition[i].classes = "";
                        condition[i].isChecked = false;
                    }
                } else {
                    if(conditionClicked === 'physical'){
                        $scope.char.condition.physical.current = index - 1;
                        $scope.penalties.physical = calcConditionPenalty(diff + 1);
                    } else if (conditionClicked === 'stun'){
                        $scope.char.condition.stun.current = index - 1;
                        $scope.penalties.stun = calcConditionPenalty(diff + 1);
                    }

                    for(var j = 0; j < max; j++){
                        if(j <= diff){
                            condition[j].classes = "condition-fill";
                            condition[j].isChecked = true;
                        } else {
                            condition[j].classes = "";
                            condition[j].isChecked = false;
                        }
                    }
                }

            };

            $scope.conditionHover = function(index, max, condition){
                var diff = max - index;
                for(var i = 0; i < max; i++){
                    if(condition[i].isChecked){
                        if(i > diff) {
                           condition[i].classes = "condition-hover";
                        } else {
                            condition[i].classes = "condition-fill";
                        }
                    } else if(i <= diff){
                       condition[i].classes = "condition-hover";
                    } else {
                        condition[i].classes = "";
                    }
                }
            };

            $scope.conditionReset = function(max, condition){
                for(var i = 0; i < max; i++){
                    if(condition[i].isChecked){
                        condition[i].classes = "condition-fill";
                    } else {
                        condition[i].classes = "";
                    }
                }
            };

            //Utility functions
            function calcInitiative(reaction, intuition){
                return reaction + intuition;
            }

            function calcPhysical(body){
                return Math.ceil(body/2) + 8;
            }

            function calcStun(willpower){
                return Math.ceil(willpower/2) + 8;
            }

            function calcConditionPenalty(diff){
                return -(Math.floor(diff/3));
            }


            //Setup character functions
            if(Session.getSheetCharacter() != ''){
                $scope.char = Mongo.get({
                    model: "characters",
                    id: Session.getSheetCharacter()
                });

                $scope.char.$promise.then(function(data){
                    $log.log("Data retrieved - init page");
                    $scope.char = data;
                    data.attributes.special.initiative = calcInitiative(data.attributes.physical.reaction,
                                                        data.attributes.mental.intuition);
                    data.condition.physical.max = calcPhysical(data.attributes.physical.body);
                    data.condition.stun.max = calcStun(data.attributes.mental.willpower);
                    setupPhysical(data);
                    setupStun(data);
                });
            }

            //Watch statements
            $scope.$watch('char.attributes.physical.body', function(newVal, oldVal) {
                if(newVal){
                    $scope.char.condition.physical.max = calcPhysical(newVal);
                    setupPhysical($scope.char);
                }
            });

            $scope.$watch('char.attributes.mental.willpower', function(newVal, oldVal) {
                if(newVal){
                    $scope.char.condition.stun.max = calcStun(newVal);
                    setupStun($scope.char);
                }
            });

            $scope.$watchGroup(['char.attributes.physical.reaction', 'char.attributes.mental.intuition'], function(newVal, oldVal){
               if(newVal){
                   $scope.char.attributes.special.initiative = calcInitiative($scope.char.attributes.physical.reaction,
                                                        $scope.char.attributes.mental.intuition);
               }
            });

            //////////////////////
            //CRUD OPERATIONS
            //////////////////////
            //Save and Update
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

                $location.path('characters');
            };

            //Cancel
            $scope.cancel = function(){
                $location.path('characters');
            };
        }]);
})();