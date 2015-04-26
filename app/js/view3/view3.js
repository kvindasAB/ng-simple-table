'use strict';

angular.module('myApp.view3', ['ui.router','myApp.testscopes'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'view3', {
      url: '/view3',
      templateUrl: 'js/view3/view3.html',
      controller: 'View3Ctrl'
    });
}])

.controller('View3Ctrl', ['$scope', function($scope) {
    $scope.testvar = 'testvalue';
    $scope.config = {
        var1: "value1",
        var2: "value2"
    };

    $scope.customFunction = function(){
        alert("this is a custom function");
    }
}]);