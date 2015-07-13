/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STRow.ts" />
angular.module('simpletable.table.row', [])
    .directive('stTableRow', ['$log', function ($log) {
        var tpl = "  <td ng-repeat='col in tableConfig.columns' st-table-cell ng-class='col.cellClass' ng-if='col.active' >" +
            "  </td>";
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                $log.log('Row compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        $log.log('Row pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        $log.log('Row post: ', scope);
                        var row = new STRow.Row();
                        row.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        row.init();
                        return row;
                    }
                };
            },
            template: tpl
        };
    }]);
//# sourceMappingURL=STRowDir.js.map