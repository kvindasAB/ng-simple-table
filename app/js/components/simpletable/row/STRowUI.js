var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var STRowUI;
(function (STRowUI) {
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            _super.apply(this, arguments);
        }
        Row.prototype.init = function () {
            this.addEventListeners();
        };
        Row.prototype.addEventListeners = function () {
            this.element.on('click', angular.bind(this, this.onRowClicked));
            this.element.on('dblclick', angular.bind(this, this.onRowDoubleClicked));
            this.element.on('mouseenter', angular.bind(this, this.onRowMouseEnter));
            this.element.on('mouseleave', angular.bind(this, this.onRowMouseLeave));
            this.element.on('$destroy', angular.bind(this, this.removeEventListeners));
        };
        Row.prototype.removeEventListeners = function () {
            if (!this.element) {
                return;
            }
            this.element.off();
        };
        Row.prototype.onRowClicked = function (event) {
            this.simpleTable.onRowClicked(event, this.scope.row);
        };
        Row.prototype.onRowDoubleClicked = function (event) {
            this.simpleTable.onRowDoubleClicked(event, this.scope.row);
        };
        Row.prototype.onRowMouseEnter = function (event) {
            this.simpleTable.onRowMouseEnter(event, this.scope.row);
        };
        Row.prototype.onRowMouseLeave = function (event) {
            this.simpleTable.onRowMouseLeave(event, this.scope.row);
        };
        return Row;
    })(STCore.BaseComponentUI);
    STRowUI.Row = Row;
})(STRowUI || (STRowUI = {}));
//# sourceMappingURL=STRowUI.js.map