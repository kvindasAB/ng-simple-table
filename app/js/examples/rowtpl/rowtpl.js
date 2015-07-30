'use strict';

angular.module('stable.examples.rowtpl', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state( 'examples.rowtpl', {
          url: '/rowtpl',
          views: {
            'innerView': {
                templateUrl: 'js/examples/rowtpl/rowtpl.html',
                controller: 'ExRowTplCtrl as ctrl'
            }
          }
        });
    }])
    .controller('ExRowTplCtrl', ['$scope','DataGenerator', function($scope, DataGenerator){

        $scope.columns = [
            {id:"id", title: "Id", field: 'id', active: true, style: {width: "20%"}},
            {id:"name", title: "Name", field: 'name', active: true, style: {width: "20%"}},
            {id:"phone", title: "Phone", field: 'phone', active: true, style: {width: "20%"}},
            {id:"age", title: "Age", field: 'age', active: true, style: {width: "20%"}},
            {id:"address", title: "Address", field: 'address', active: true, style: {width: "20%"}}
        ];

        $scope.data = DataGenerator.generateRows(50);

        /*
        var rowTpl =    "<tr class='customClass' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
                        "    ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
                        "    st-table-row ></tr>";
                        */

        var rowTpl =    "<tr class='customClass' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
                        "    ng-repeat='row in tableData' " +
                        "    st-table-row ></tr>";

        $scope.tableConfig = {
            tableClasses: ["table", "table-bordered", 'table-padding'],
            columns: $scope.columns,
            rowTemplate: rowTpl,
            tableWidth: '100%',
            headerHeight: '30px',
        };

    }]);

