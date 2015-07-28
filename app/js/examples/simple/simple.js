'use strict';

angular.module('stable.examples.simple', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples.simple', {
      url: '/simple',
      views: {
        'innerView': {
            templateUrl: 'js/examples/simple/simple.html',
            controller: 'ExSimpleCtrl as ctrl'
        }
      }
    });
}])

.controller('ExSimpleCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.data = DataGenerator.generateRows(50);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            headerHeight: '30px',
            columns: [
                        {field: 'id'},
                        {field: 'name'},
                        {field: 'phone'},
                        {field: 'age'},
                        {field: 'address'}
                     ],
        };

    }]);
