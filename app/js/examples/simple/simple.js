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
            classes: ["table", "table-bordered", 'table-padding'],
            columns: [
                        {field: 'id', style: {width: "20%"}},
                        {field: 'name', style: {width: "20%"}},
                        {field: 'phone', style: {width: "20%"}},
                        {field: 'age', style: {width: "20%"}},
                        {field: 'address', style: {width: "20%"}}
                     ],
            tableWidth: '100%',
            headerHeight: '30px',
        };

    }]);
