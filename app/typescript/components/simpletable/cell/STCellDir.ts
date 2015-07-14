/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STCell.ts" />

angular.module('simpletable.table.cell', [])
    .directive('stTableCell', ['$log', '$compile', function($log, $compile ) {

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
                        var cell = new STCell.Cell();
                        cell.link(scope, iElem, iAttrs, $compile);
                        cell.init();
                        return cell;
                    }
                }
            },
            template: "{{row[col.field]}}"
        };

    }]);