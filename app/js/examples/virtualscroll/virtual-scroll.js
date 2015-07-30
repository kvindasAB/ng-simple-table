'use strict';

angular.module('stable.examples.virtualscroll', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state( 'examples.virtualscroll', {
          url: '/virtualscroll',
          views: {
            'innerView': {
                templateUrl: 'js/examples/virtualscroll/virtual-scroll.html',
                controller: 'ExVirtualScrollCtrl as ctrl'
            }
          }
        });
    }])

.controller('ExVirtualScrollCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.form = {
            qty: 300
        };
        $scope.data = DataGenerator.generateRows($scope.form.qty);

        $scope.tableConfig = {
            tableClasses    : ["table", "table-bordered", 'table-padding'],
            tableWidth      : '100%',
            headerHeight    : '30px',
            virtualScroll   : true,
            columns: [
                          {id:"id", title: "Id", field: 'id', active: true, style: {width: "20%"}},
                          {id:"name", title: "Name", field: 'name', active: true, style: {width: "20%"}},
                          {id:"phone", title: "Phone", field: 'phone', active: true, style: {width: "20%"}},
                          {id:"age", title: "Age", field: 'age', active: true, style: {width: "20%"}},
                          {id:"address", title: "Address", field: 'address', active: true, style: {width: "20%"}}
                     ]
        };

        $scope.applyQty = function(qty){
            $scope.data = DataGenerator.generateRows($scope.form.qty);
        };

    }]);

