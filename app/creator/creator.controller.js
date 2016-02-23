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
            }]);
})();