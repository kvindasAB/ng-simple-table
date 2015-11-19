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
            tableClasses: ["table", "table-bordered", 'table-padding', 'table-relative'],
            headerHeight: '30px',
            resizeType: 'relative',
            columns: [
                        {field: 'id', mutable: false, style:{width: '20%'}},
                        {field: 'name', mutable: false, style:{width: '20%'}},
                        {field: 'phone', mutable: false, style:{width: '20%'}},
                        {field: 'age', mutable: false, style:{width: '20%'}},
                        {field: 'address', mutable: false, style:{width: '20%'}}
                     ],
        };

        $scope.tableConfigFixed = {
            tableClasses: ["table", "table-bordered", 'table-padding', 'table-fixed'],
            headerHeight: '30px',
            resizeType: 'fixed',
            columns: [
                {field: 'id', mutable: false, style:{width: '100px'}},
                {field: 'name', mutable: false, style:{width: '300px'}},
                {field: 'phone', mutable: false, style:{width: '100px'}},
                {field: 'age', mutable: false, style:{width: '100px'}},
                {field: 'address', mutable: false, style:{width: '100px'}}
            ],
        };

    }]);
