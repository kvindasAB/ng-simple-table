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
            "    <thead st-table-header>" +
            "    </thead>" +
            "    <tbody st-table-body ng-if='!tableConfig.rowTemplate'>" +
            "    </tbody>" +
            "    <tbody ng-if='tableConfig.rowTemplate' ng-include='tableConfig.rowTemplate'>" +
            "    </tbody>" +
            "  </table>" +
            "</div>"
            /*

             "        <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass' ng-if='col.active' >" +
             "          <span ng-if='!col.template'>{{row[col.field]}}</span> " +
             "          <span ng-if='!!col.template' ng-include='col.template'></span> " +
             "        </td>" +

             */
        };


    }]);