/// <reference path="SimpleTable.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.table', [])
    .directive('stTable', ['$timeout', 'SimpleTablePluginFactory', function($timeout, SimpleTablePluginFactory) {

        return {
            restrict: 'AE',
            scope: {
                tableConfig: '=',
                tableData: '='
            },
            controller: function($scope, $element, $attrs) {
                return new SimpleTable.SimpleTable($scope, $element, $attrs, $timeout, SimpleTablePluginFactory);
            },
            template:
            "<table style='overflow: auto;' ng-class='tableConfig.classes'>" +
            "  <thead>" +
            "    <tr>" +
            "      <th class='table-header' " +
            "       ng-click='simpleTable.onHeaderClicked($event, hcol)'    " +
            "       ng-repeat='hcol in tableConfig.columns' " +
            "       ng-class='hcol.headerClass' " +
            "      height='{{tableConfig.headerHeight}}' width='{{hcol.style.width}}' " +
            "      st-table-drop-target='true' st-table-draggable='true'>" +
            "        {{hcol.title}}" +
            "        <div st-table-resizable-handler class='table-header-cursor-container'></div>" +
            "      </th>" +
            "    </tr>" +
            "  </thead>" +
            "  <tbody>" +
            "    <tr ng-click='simpleTable.onRowClicked($event, row)' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
            "       ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' >" +
            "      <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass'>" +
            "        <span ng-if='!col.template'>{{row[col.field]}}</span>     " +
            "        <span ng-if='!!col.template' ng-include='col.template'></span>     " +
            "      </td>" +
            "    </tr>" +
            "  </tbody>" +
            "</table>"
        };


    }]);