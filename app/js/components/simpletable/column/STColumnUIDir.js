angular.module('simpletable.table.column', []).directive('stTableColumn', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
    return {
        restrict: 'AE',
        require: '^stTable',
        compile: function (tElem, tAttrs) {
            return {
                pre: function (scope, iElem, iAttrs) {
                },
                post: function (scope, iElem, iAttrs, parent) {
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