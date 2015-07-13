var STCell;
(function (STCell) {
    var Cell = (function () {
        function Cell() {
        }
        Cell.prototype.link = function (scope, element, attrs) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
        };
        return Cell;
    })();
    STCell.Cell = Cell;
})(STCell || (STCell = {}));
//# sourceMappingURL=STCell.js.map