/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STCellUI.ts" />

angular.module('simpletable.table.cell', [])
    .directive('stTableCell', ['$log', '$compile', '$templateCache', '$templateRequest', function($log, $compile, $templateCache, $templateRequest) {

        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function(tElem, tAttrs){
                //$log.log('Cell compile: ', tElem, tAttrs);
                //$log.log('Cell compile2: ', tElem.parent(), tElem.parent().scope() );
                return {
                    pre: function(scope, iElem, iAttrs){
                        //$log.log('Cell pre: ', iElem, scope);
                    },
                    post: function(scope, iElem, iAttrs){
                        var cell = new STCellUI.Cell();
                        cell.setServices($compile, $templateCache, $templateRequest);
                        cell.link(scope, iElem, iAttrs);
                        cell.init();
                        return cell;
                    }
                }
            },
            template: function(tElem, tAttrs){
                //$log.log('CellUIDir.template: ', tElem, tAttrs);
                return $templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            }
        };

    }]);