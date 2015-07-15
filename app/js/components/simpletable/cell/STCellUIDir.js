/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STCellUI.ts" />
angular.module('simpletable.table.cell', [])
    .directive('stTableCell', ['$log', '$compile', '$templateCache', function ($log, $compile, $templateCache) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                //$log.log('Cell compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        //$log.log('Cell pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs) {
                        var cell = new STCellUI.Cell();
                        cell.link(scope, iElem, iAttrs, $compile);
                        cell.init();
                        return cell;
                    }
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            }
        };
    }]);
//# sourceMappingURL=STCellUIDir.js.map