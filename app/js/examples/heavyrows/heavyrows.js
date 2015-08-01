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

        $scope.form = {
            qty: 300
        };
        $scope.data = DataGenerator.generateRows($scope.form.qty);

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            tableWidth: '100%',
            headerHeight: '30px',
            columns: [
                          {id:"id", title: "Id", field: 'id', mutable:false, style: {width: "20%"}},
                          {id:"name", title: "Name", field: 'name', mutable:false, style: {width: "20%"}},
                          {id:"phone", title: "Phone", field: 'phone', mutable:false, style: {width: "20%"}},
                          {id:"age", title: "Age", field: 'age', mutable:false, style: {width: "20%"}},
                          {id:"address", title: "Address", mutable:false, field: 'address', style: {width: "20%"}}
                     ]
        };

        $scope.applyQty = function(qty){
            $scope.data = DataGenerator.generateRows($scope.form.qty);
        };

    }]);

