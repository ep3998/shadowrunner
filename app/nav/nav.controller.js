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
       }])
        .controller('NavCtrl', ['$scope', '$log',
        function($scope, $log){
            $scope.navClick = function(event){
                //Remove active class currently selected
                angular.element(document.querySelector("#navMain li.active")).removeClass('active');

                //Add active class to clicked nav
                var clickElement = angular.element(event.target);
                clickElement.parent().addClass('active');

            };
        }]);
})();