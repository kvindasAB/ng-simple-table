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
                    post: function (scope, iElem, iAttrs) {
                        $log.log('Row post: ', iElem, scope);
                    }
                };
            },
            template: tpl
        };
    }]);
//# sourceMappingURL=SimpleTableRow.js.map