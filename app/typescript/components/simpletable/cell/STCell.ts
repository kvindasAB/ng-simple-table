/// <reference path="../../../../typings/angularjs/angular.d.ts" />

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

angular.module('simpletable.table.cell', [])
    .directive('stTableCell', ['$log', function($log ) {

        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function(tElem, tAttrs){
                //$log.log('Cell compile: ', tElem, tAttrs);
                return {
                    pre: function(scope, iElem, iAttrs){
                        //$log.log('Cell pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs){
                        //$log.log('Cell post: ', iElem, scope);
                    }
                }
            },
            template: "{{row[col.field]}}"
        };

    }]);