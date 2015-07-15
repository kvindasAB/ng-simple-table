/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STRowUI.ts" />
angular.module('simpletable.table.row', [])
    .directive('stTableRow', ['$log', '$templateCache', function ($log, $templateCache) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                //$log.log('Row compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        //$log.log('Row pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        //$log.log('Row post: ', scope);
                        var row = new STRowUI.Row();
                        row.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        row.init();
                        return row;
                    }
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.ROW_TPL_ID);
            }
        };
    }]);
//# sourceMappingURL=STRowUIDir.js.map