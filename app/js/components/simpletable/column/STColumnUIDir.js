/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STColumnUI.ts" />
/*
 compile: function(tElem, tAttrs){
     console.log(name + ': compile');
     return {
         pre: function(scope, iElem, iAttrs){
            console.log(name + ': pre link');
         },
         post: function(scope, iElem, iAttrs){
            console.log(name + ': post link');
         }
     }
 }
 */
angular.module('simpletable.table.column', [])
    .directive('stTableColumn', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                $log.log('Col compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        $log.log('Col pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        //$log.log('Col post: ', iElem, scope);
                        var column = new STColumnUI.Column();
                        column.setServices($compile, $templateCache, $templateRequest);
                        column.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        column.init();
                    }
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.COLUMN_TPL_ID);
            }
        };
    }]);
//# sourceMappingURL=STColumnUIDir.js.map