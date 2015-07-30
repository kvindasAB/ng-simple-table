/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STRowUI.ts" />

angular.module('simpletable.table.row', [])
    .directive('stTableRow', ['$log', '$compile', '$templateCache', '$templateRequest', function($log, $compile, $templateCache, $templateRequest) {

        return {
            restrict: 'AE',
            compile: function(tElem, tAttrs){
                //$log.log('Row compile: ', tElem, tAttrs);
                return {
                    pre: function(scope, iElem, iAttrs){
                        //$log.log('Row pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs, parent){
                        $log.log('Row post: ', scope);
                        var row = new STRowUI.Row();
                        row.setServices($compile, $templateCache, $templateRequest);
                        row.link(scope, iElem, iAttrs, scope.simpleTable );
                        row.init();
                        return row;
                    }
                }
            },
            template: function(tElem, tAttrs){
                return $templateCache.get(STTemplates.STTpls.ROW_TPL_ID);
            }
        };

    }]);