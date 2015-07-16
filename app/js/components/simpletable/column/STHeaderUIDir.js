/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../tpl/STTemplates.ts" />
angular.module('simpletable.table.header', [])
    .directive('stTableHeader', ['$log', '$templateCache', function ($log, $templateCache) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                $log.log('Header compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        $log.log('Header pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs) {
                        $log.log('Header post: ', iElem, scope);
                    }
                };
            },
            template: function (tElem, tAttr) {
                return $templateCache.get(STTemplates.STTpls.HEADER_TPL_ID);
            }
        };
    }]);
//# sourceMappingURL=STHeaderUIDir.js.map