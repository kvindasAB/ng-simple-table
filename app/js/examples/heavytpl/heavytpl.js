'use strict';

angular.module('stable.examples.heavytpl', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state( 'examples.heavytpl', {
          url: '/heavytpl',
          views: {
            'innerView': {
                templateUrl: 'js/examples/heavytpl/heavytpl.html',
                controller: 'ExHeavyTplsCtrl as ctrl'
            }
          }
        });
    }])
    .controller('ExHeavyTplsCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.columns = [
            {id:"id", title: "Id", field: 'id', active: true, style: {width: "20%"}, template: 'CT: {{row[col.field]}}'},
            {id:"name", title: "Name", field: 'name', active: true, style: {width: "20%"}, template: 'CT: {{row[col.field]}}'},
            {id:"phone", title: "Phone", field: 'phone', active: true, style: {width: "20%"}},
            {id:"age", title: "Age", field: 'age', active: true, style: {width: "20%"}},
            {id:"address", title: "Address", field: 'address', active: true, style: {width: "20%"}}
        ];

        $scope.form = {
            qty: 300
        };
        $scope.data = DataGenerator.generateRows($scope.form.qty);

        $scope.tableConfig = {
            classes: ["table", "table-bordered", 'table-padding'],
            columns: $scope.columns,
            tableWidth: '100%',
            headerHeight: '30px',
        };

        $scope.applyQty = function(qty){
            $scope.data = DataGenerator.generateRows($scope.form.qty);
        };

        $scope.updateFirstRowName = function(){
            $scope.data[0].name = 'CHANGED-'+ $scope.data[0].name;
        }

    }]);

