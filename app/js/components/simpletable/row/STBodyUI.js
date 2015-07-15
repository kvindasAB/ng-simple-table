/// <reference path="../table/SimpleTable.ts" />
var STBodyUI;
(function (STBodyUI) {
    var Body = (function () {
        function Body() {
        }
        Body.prototype.link = function (scope, element, attrs, simpleTable, $compile) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.simpleTable = simpleTable;
            this.$compile = $compile;
        };
        Body.prototype.init = function () {
            this.validateCustomTemplate();
        };
        Body.prototype.validateCustomTemplate = function () {
            if (!this.scope || !this.scope.tableConfig || !this.scope.tableConfig.rowTemplate1) {
                this.applyTemplate(Body.DEFAULT_TPL, this.scope);
                return;
            }
            console.log('STBody Tpl: ', this.getCustomTemplate(this.scope));
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        };
        Body.prototype.applyTemplate = function (tpl, scope) {
            var dom = angular.element(tpl);
            var link = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        };
        Body.prototype.getCustomTemplate = function (scope) {
            return scope.tableConfig.rowTemplate1;
        };
        Body.DEFAULT_TPL = "<tr ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
            "    ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
            "    st-table-row ></tr>";
        return Body;
    })();
    STBodyUI.Body = Body;
})(STBodyUI || (STBodyUI = {}));
//# sourceMappingURL=STBodyUI.js.map