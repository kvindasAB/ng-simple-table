/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STColumn.ts" />

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
    .directive('stTableColumn', ['$log', function($log ) {

        var tpl =   "{{hcol.title}}" +
                    "<div st-table-resizable-handler11 class='table-header-cursor-container'></div>";
        
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function(tElem, tAttrs){
                $log.log('Col compile: ', tElem, tAttrs);
                return {
                    pre: function(scope, iElem, iAttrs){
                        $log.log('Col pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs, parent){
                        //$log.log('Col post: ', iElem, scope);
                        var column = new STColumn.Column();
                        column.link(scope, iElem, iAttrs, parent.getSimpleTable() );
                        column.init();
                    }
                }
            },
            template: tpl
        };

    }]);