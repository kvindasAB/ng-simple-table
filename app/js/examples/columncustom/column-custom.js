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

        $scope.cellClassesPlus = 'funcclass';
        $scope.data = DataGenerator.generateRows(50);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            headerHeight: '30px',
            columns: [
                        {   field: 'id', label:'Identifier' ,
                            cellIdFunction: function(data, col, config){ return data.id + '-' + col.field },
                            cellValueFunction: function(data, col){ return 'Id:' + data.id; },
                            staticProperties: ['cellValue']
                        },
                        {   field: 'name',
                            cellClasses: ['cellClass1', 'cellClass2'],
                            staticProperties: ['cellValue']
                        },
                        {field: 'phone',
                            cellClassesFunction: function(row, col, config ){
                                var arr = ['innerF1', 'innerF2', 'innerF3'];
                                if($scope.cellClassesPlus){ arr.push($scope.cellClassesPlus); }
                                return arr.join();
                            },
                            staticProperties: ['cellValue']
                        },
                        {field: 'age', cellClasses: {adult: 'age > 40'}},
                        {field: 'address', cellValueFunction: function(data, col){ return 'My Adress is:' + data.address; } }
                     ],
        };

        $scope.updateNameClasses = function(){
            $scope.tableConfig.columns[1].cellClasses.push('cellClass3Click');
        }

    }]);
