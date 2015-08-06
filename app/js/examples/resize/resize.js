'use strict';

angular.module('stable.examples.resize', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples.resize', {
      url: '/resize',
      views: {
        'innerView': {
            templateUrl: 'js/examples/resize/resize.html',
            controller: 'ExResizeCtrl as ctrl'
        }
      }
    });
}])

.controller('ExResizeCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.data = DataGenerator.generateRows(10);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            headerHeight: '30px',
            columns: [
                        {field: 'id', mutable: false},
                        {field: 'name', mutable: false},
                        {field: 'phone', mutable: false},
                        {field: 'age', mutable: false},
                        {field: 'address', mutable: false}
                     ],
        };

        $scope.tableConfigFixed = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            headerHeight: '30px',
            columns: [
                {field: 'id', mutable: false},
                {field: 'name', mutable: false},
                {field: 'phone', mutable: false},
                {field: 'age', mutable: false},
                {field: 'address', mutable: false}
            ],
        };

    }]);
