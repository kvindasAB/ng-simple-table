/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STBodyUI.ts" />
angular.module('simpletable.table.body', [])
    .directive('stTableBody', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        var body = new STBodyUI.Body();
                        body.setServices($compile, $templateCache, $templateRequest);
                        body.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        body.init();
                        return body;
                    }
                };
            }
        };
    }]);
//# sourceMappingURL=STBodyUIDir.js.map