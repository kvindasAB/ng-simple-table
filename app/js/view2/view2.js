'use strict';

angular.module('myApp.view2', ['ui.router'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'view2', {
      url: '/view2',
      templateUrl: 'js/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

.controller('View2Ctrl', ['$scope', function($scope) {

    $scope.data = [
      {id: 1, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 2, name: "Kib", lastname: "Vindas", age: 25},
      {id: 3, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 4, name: "Kib", lastname: "Vindas", age: 25},
      {id: 5, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 6, name: "Kib", lastname: "Vindas", age: 25},
      {id: 7, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 8, name: "Kib", lastname: "Vindas", age: 25},
      {id: 9, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 10, name: "Kib", lastname: "Vindas", age: 25},
      {id: 11, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 12, name: "Kib", lastname: "Vindas", age: 25},
      {id: 13, name: "Roy", lastname: "Bonilla", age: 25},
      {id: 14, name: "Kib", lastname: "Vindas", age: 25}
    ];

    $scope.columns = [
      {title: "Id", field: 'id', width: "25%"},
      {title: "Name", field: 'name', width: "25%"},
      {title: "Last Name", field: 'lastname', width: "25%"},
      {title: "Age", field: 'age', width: "25%"}
    ];

    $scope.changeCols = function(){
      var elem = $scope.columns.shift();
      $scope.columns.push(elem);
    };




}]);