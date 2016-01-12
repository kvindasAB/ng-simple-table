angular.module('simpletable.table.cell', []).directive('stTableCell', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
    return {
        restrict: 'AE',
        require: '^stTable',
        compile: function (tElem, tAttrs) {
            return {
                pre: function (scope, iElem, iAttrs) {
                },
                post: function (scope, iElem, iAttrs, parent) {
                    var cell = new STCellUI.Cell();
                    cell.setServices($compile, $templateCache, $templateRequest);
                    cell.link(scope, iElem, iAttrs, parent.getSimpleTable());
                    cell.init();
                    return cell;
                }
            };
        },
        template: function (tElem, tAttrs) {
        }
    };
}]);
//# sourceMappingURL=STCellUIDir.js.map