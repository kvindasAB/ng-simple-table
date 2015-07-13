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



angular.module('simpletable.table.header', [])
    .directive('stTableHeader', ['$log', function($log ) {

        var tpl =   "  <tr>" +
                    "    <th id='{{hcol.id}}' class='table-header' " +
                    "     ng-click='simpleTable.onHeaderClicked($event, hcol)' " +
                    "     ng-repeat='hcol in tableConfig.columns' " +
                    "     ng-class='hcol.headerClass' ng-if='hcol.active' " +
                    "     ng-style='{\"height\":tableConfig.headerHeight, \"min-width\":hcol.style.minWidth, \"width\":hcol.style.width}' " +
                    "     st-table-drop-target='true' st-table-draggable='true' st-table-column>" +
                    "    </th>" +
                    "  </tr>";
        
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function(tElem, tAttrs){
                $log.log('Header compile: ', tElem, tAttrs);
                return {
                    pre: function(scope, iElem, iAttrs){
                        $log.log('Header pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs){
                        $log.log('Header post: ', iElem, scope);
                    }
                }
            },
            template: tpl
        };

    }]);