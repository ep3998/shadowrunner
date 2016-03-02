/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
        .module('creator')
        .controller('SideNavCtrl', ['$scope','$log', '$location', '$anchorScroll',
            function($scope, $log, $location, $anchorScroll){
                $scope.scrollTo = function(id) {
                    $location.hash(id);
                    $anchorScroll();
                }
            }])
        .controller('ConceptCtrl', ['$scope', '$log', 'Mongo', 'Session', function($scope, $log, Mongo, Session){
            $scope.conceptColumns = 4;

            $scope.concepts = Mongo.query({
                model: 'roles'
            });

            $scope.concepts.$promise.then(function(data){
                $scope.conceptRows = Math.ceil(data.length / $scope.conceptColumns);
                $log.info('ConceptCtrl - rows - ', $scope.conceptRows);
            });

            $scope.conceptClick = function(index){
                Session.setCreateConcept($scope.concepts[index]);
                $scope.createConcept = $scope.concepts[index];
                $log.info('ConceptCtrl - Concept Chosen - ', Session.getCreateConcept());
            };
        }])
        .controller('MetatypeCtrl', ['$scope', '$log', 'Mongo', 'Session', function($scope, $log, Mongo, Session){
            $scope.metatypes = [];

            $scope.$watch(Session.getCreateConcept(), function(newVal, oldVal, scope){
               //$scope.metatypes = Mongo
                $log.info("MetatypeCtrl - Concept Chosen");
            });
        }]);
})();