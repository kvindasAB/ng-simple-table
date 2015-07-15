var STCellUI;
(function (STCellUI) {
    var Cell = (function () {
        function Cell() {
        }
        Cell.prototype.link = function (scope, element, attrs, $compile) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$compile = $compile;
        };
        Cell.prototype.init = function () {
            this.validateCustomTemplate();
        };
        Cell.prototype.validateCustomTemplate = function () {
            if (!this.scope || !this.scope.col || (!this.scope.col.template && !this.scope.col.templateId)) {
                return;
            }
            var tpl = this.getCustomTemplate(this.scope);
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        };
        Cell.prototype.getCustomTemplate = function (scope) {
            return scope.col.template;
        };
        return Cell;
    })();
    STCellUI.Cell = Cell;
})(STCellUI || (STCellUI = {}));
//# sourceMappingURL=STCellUI.js.map