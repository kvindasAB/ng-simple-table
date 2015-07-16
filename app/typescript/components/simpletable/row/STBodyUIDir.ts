/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STBodyUI.ts" />


// TODO - Integrate templates with templateCache

/*

 "<tr ng-click='simpleTable.onRowClicked($event, row)' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
 "    ng-dblclick='simpleTable.onRowDoubleClicked($event, row)' " +
 "    ng-mouseenter='simpleTable.onRowMouseEnter($event, row)' ng-mouseleave='simpleTable.onRowMouseLeave($event, row)' " +
 "  ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' st-table-row >" +
 "</tr>";

 */



angular.module('simpletable.table.body', [])
    .directive('stTableBody', ['$log', '$compile', '$templateCache', '$templateRequest', function($log, $compile, $templateCache, $templateRequest ) {

        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function(tElem, tAttrs){
                //$log.log('Body compile: ', tElem, tAttrs);
                return {
                    pre: function(scope, iElem, iAttrs){
                        //$log.log('Body pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs, parent){
                        //$log.log('Body post: ', iElem, scope);
                        var body = new STBodyUI.Body();
                        body.setServices($compile, $templateCache, $templateRequest);
                        body.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        body.init();
                        return body;
                    }
                }
            }
        };

    }]);