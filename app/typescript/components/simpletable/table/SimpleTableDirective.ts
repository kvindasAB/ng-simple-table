/// <reference path="SimpleTable.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.table', [])
    .directive('stTable', ['$timeout', 'SimpleTablePluginFactory', function($timeout, SimpleTablePluginFactory) {

        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                tableConfig: '=',
                tableData: '='
            },
            controller: function($scope, $element, $attrs) {
                return new SimpleTable.SimpleTable($scope, $element, $attrs, $timeout, SimpleTablePluginFactory);
            },
            template:
            "<div ng-style='{width:tableConfig.tableWidth}'>" +
            "  <table ng-class='tableConfig.classes' ng-style='{width:tableConfig.tableWidth}'>" +
            "    <thead>" +
            "      <tr>" +
            "        <th id='{{hcol.id}}' class='table-header' " +
            "         ng-click='simpleTable.onHeaderClicked($event, hcol)' " +
            "         ng-repeat='hcol in tableConfig.columns' " +
            "         ng-class='hcol.headerClass' ng-if='hcol.active' " +
            "         height='{{tableConfig.headerHeight}}' width='{{hcol.style.width}}' " +
            "         st-table-drop-target='true' st-table-draggable='true'>" +
            "          {{hcol.title}}" +
            "          <div st-table-resizable-handler class='table-header-cursor-container'></div>" +
            "        </th>" +
            "      </tr>" +
            "    </thead>" +
            "    <tbody ng-if='!tableConfig.rowTemplate'>" +
            "      <tr ng-click='simpleTable.onRowClicked($event, row)' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
            "          ng-dblclick='simpleTable.onRowDoubleClicked($event, row)' " +
            "          ng-mouseenter='simpleTable.onRowMouseEnter($event, row)' ng-mouseleave='simpleTable.onRowMouseLeave($event, row)' " +
            "        ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' >" +
            "        <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass' ng-if='col.active' >" +
            "          <span ng-if='!col.template'>{{row[col.field]}}</span> " +
            "          <span ng-if='!!col.template' ng-include='col.template'></span> " +
            "        </td>" +
            "      </tr>" +
            "    </tbody>" +
            "    <tbody ng-if='tableConfig.rowTemplate' ng-include='tableConfig.rowTemplate'>" +
            "    </tbody>" +
            "  </table>" +
            "</div>"
        };


    }]);