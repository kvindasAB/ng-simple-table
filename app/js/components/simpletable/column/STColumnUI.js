var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
var STColumnUI;
(function (STColumnUI) {
    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            _super.apply(this, arguments);
        }
        Column.prototype.init = function () {
            this.addEventListeners();
        };
        Column.prototype.addEventListeners = function () {
            this.element.on('click', angular.bind(this, this.onHeaderClicked));
        };
        Column.prototype.removeEventListeners = function () {
            if (!this.element) {
                return;
            }
            this.element.off();
        };
        Column.prototype.onHeaderClicked = function (event) {
            this.simpleTable.onHeaderClicked(event, this.scope.hcol);
        };
        return Column;
    })(STCore.BaseComponentUI);
    STColumnUI.Column = Column;
})(STColumnUI || (STColumnUI = {}));
//# sourceMappingURL=STColumnUI.js.map