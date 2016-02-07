/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

   angular.module('nav')
       .controller('HelpCtrl', ['$scope', '$log',
       function($scope, $log){
           $scope.helpStatus = {
             isopen: false
           };

           $scope.toggled = function(open){
               $log.log('Dropdown is: ', open);
           };

           $scope.toggleDropdown = function($event){
               $event.preventDefault();
               $event.stopPropagation();
               $scope.status.isopen = !$scope.status.isopen;
           };
       }]);
})();