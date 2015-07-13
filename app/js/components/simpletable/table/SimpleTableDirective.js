/// <reference path="SimpleTable.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.table', [])
    .directive('stTable', ['$timeout', 'SimpleTablePluginFactory', function ($timeout, SimpleTablePluginFactory) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                tableConfig: '=',
                tableData: '='
            },
            controller: function ($scope, $element, $attrs) {
                var stable = new SimpleTable.SimpleTable($scope, $element, $attrs, $timeout, SimpleTablePluginFactory);
                // Controller referenced as this in ang 1.3
                this.getSimpleTable = function () {
                    return stable;
                };
            },
            template: "<div ng-style='{width:tableConfig.tableWidth}'>" +
                "  <table ng-class='tableConfig.classes' ng-style='{width:tableConfig.tableWidth}'>" +
                "    <thead st-table-header>" +
                "    </thead>" +
                "    <tbody st-table-body ng-if='!tableConfig.rowTemplate'>" +
                "    </tbody>" +
                "    <tbody ng-if='tableConfig.rowTemplate' ng-include='tableConfig.rowTemplate'>" +
                "    </tbody>" +
                "  </table>" +
                "</div>"
        };
    }]);
//# sourceMappingURL=SimpleTableDirective.js.map