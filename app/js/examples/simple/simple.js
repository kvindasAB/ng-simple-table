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

.factory('DataGenerator', [function(){

        var service = {};

        service.generateRows = function(qty){
            var data = [];
            for(var i=0; i < qty; i++){
                data.push(this.generateRow(i));
            }
            return data;
        };

        service.generateRow = function(id){
            return {
                id: id,
                name: chance.name(),
                phone: chance.phone(),
                age: Math.floor(Math.random() * 100),
                address: chance.address()
            }
        };

        return service;
    }])

.controller('ExSimpleCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.columns = [
            {id:"id", title: "Id", field: 'id', active: true, style: {width: "20%"}},
            {id:"name", title: "Name", field: 'name', active: true, style: {width: "20%"}},
            {id:"phone", title: "Phone", field: 'phone', active: true, style: {width: "20%"}},
            {id:"age", title: "Age", field: 'age', active: true, style: {width: "20%"}},
            {id:"address", title: "Address", field: 'address', active: true, style: {width: "20%"}}
        ];

        $scope.data = DataGenerator.generateRows(50);

        $scope.tableConfig = {
            classes: ["table", "table-bordered", 'table-padding'],
            columns: $scope.columns,
            tableWidth: '100%',
            headerHeight: '30px',
        };




    }]);
