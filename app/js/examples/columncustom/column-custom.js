'use strict';

angular.module('stable.examples.columncustom', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples.columncustom', {
      url: '/columncustom',
      views: {
        'innerView': {
            templateUrl: 'js/examples/columncustom/column-custom.html',
            controller: 'ExColumnCustomCtrl as ctrl'
        }
      }
    });
}])

.controller('ExColumnCustomCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.data = DataGenerator.generateRows(50);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            headerHeight: '30px',
            columns: [
                        {field: 'id', label:'Identifier' , cellIdFunction: function(data, col, config){ return data.id + '-' + col.field }},
                        {field: 'name', cellClasses: ['cellClass1', 'cellClass2']},
                        {field: 'phone' },
                        {field: 'age', cellClasses: {adult: 'age > 20'}},
                        {field: 'address', cellValueFunction: function(data, col){ return 'My Adress is:' + data.address; } }
                     ],
        };

    }]);
