'use strict';

angular.module('stable.examples.heavyrows', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state( 'examples.heavyrows', {
          url: '/heavyrows',
          views: {
            'innerView': {
                templateUrl: 'js/examples/heavyrows/heavyrows.html',
                controller: 'ExHeavyRowsCtrl as ctrl'
            }
          }
        });
    }])

.controller('ExHeavyRowsCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.columns = [
            {id:"id", title: "Id", field: 'id', active: true, style: {width: "20%"}},
            {id:"name", title: "Name", field: 'name', active: true, style: {width: "20%"}},
            {id:"phone", title: "Phone", field: 'phone', active: true, style: {width: "20%"}},
            {id:"age", title: "Age", field: 'age', active: true, style: {width: "20%"}},
            {id:"address", title: "Address", field: 'address', active: true, style: {width: "20%"}}
        ];

        $scope.form = {
            qty: 300
        };
        $scope.data = DataGenerator.generateRows($scope.form.qty);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            columns: $scope.columns,
            tableWidth: '100%',
            headerHeight: '30px',
        };

        $scope.applyQty = function(qty){
            $scope.data = DataGenerator.generateRows($scope.form.qty);
        };

    }]);

