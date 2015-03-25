'use strict';

angular.module('myApp.view2', ['ui.router', 'simpletable'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'view2', {
      url: '/view2',
      templateUrl: 'js/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

.controller('View2Ctrl', ['$scope', "$log", function($scope, $log) {

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
      {title: "Id", field: 'id', style: {width: "25%"}, headerClass:["myclass1", "myclass2"], cellClass:["cellclass1", "cellclass2"], template: "js/view2/col1tpl.html"},
      {title: "Name", field: 'name', style: {width: "50px"} },
      {title: "Last Name", field: 'lastname', style: {width: "25%"} },
      {title: "Age", field: 'age', style: {width: "25%"}}
    ];

    $scope.tableConfig = {
      classes: ["table", "table-bordered"],
      columns: $scope.columns
    };

    $scope.changeCols = function(){
      var elem = $scope.columns.shift();
      $scope.columns.push(elem);
    };

    $scope.validateFilter = function(){
      $log.log($scope.tableConfig);
      $scope.columns[0].title += "1";
    };




}]);