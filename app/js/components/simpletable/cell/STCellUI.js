var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
var STCellUI;
(function (STCellUI) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell() {
            _super.apply(this, arguments);
        }
        Cell.prototype.init = function () {
            this.validateCustomTemplate();
        };
        Cell.prototype.shouldUseCustomTemplate = function () {
            var col = this.scope.col;
            return col && (col.template || col.templateId);
        };
        /* To be implemented by subclasses */
        Cell.prototype.getCustomTemplate = function (scope) {
            return scope.col.template;
        };
        return Cell;
    })(STCore.BaseComponentUI);
    STCellUI.Cell = Cell;
})(STCellUI || (STCellUI = {}));
//# sourceMappingURL=STCellUI.js.map