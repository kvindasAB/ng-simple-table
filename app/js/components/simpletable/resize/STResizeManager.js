/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../core/STConstants.ts" />
var STResize;
(function (STResize) {
    var STResizeManager = (function () {
        function STResizeManager() {
        }
        STResizeManager.prototype.resizeTable = function () {
            if (this.isResizeTypeFixed()) {
                this.resizeTableFixed();
                return;
            }
            this.resizeTableRelative();
        };
        STResizeManager.prototype.resizeTableFixed = function () {
            var tableWidth = this.calculateTotalColumnsWidthInPx(this.getColumns());
            this.tableConfig.tableWidth = tableWidth + STCore.Constants.UNIT_PIXELS;
        };
        STResizeManager.prototype.resizeTableRelative = function () {
        };
        STResizeManager.prototype.isResizeTypeFixed = function () {
            return this.tableConfig.resizeType === STCore.Constants.RESIZE_FIXED;
        };
        STResizeManager.prototype.isResizeTypeRelative = function () {
            return !this.isResizeTypeFixed();
        };
        STResizeManager.prototype.isResizeActive = function () {
            return this.tableConfig.resizeType !== STCore.Constants.RESIZE_NONE;
        };
        STResizeManager.prototype.getColumns = function () {
            return this.tableConfig.columns;
        };
        STResizeManager.prototype.getColumnWidthInPx = function (col) {
            return col.style.width;
        };
        STResizeManager.prototype.calculateTotalColumnsWidthInPx = function (cols) {
            this.measureColumnListHeaderUIInPx(cols);
            var cols = this.getColumns();
            var tableWidth = 0;
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                tableWidth += col._widthInPx;
            }
            return tableWidth;
        };
        STResizeManager.prototype.measureColumnListHeaderUIInPx = function (cols) {
            for (var i; i < cols.length; i++) {
                var col = cols[i];
                col._widthInPx = this.measureColumnHeaderUIInPx(col);
            }
        };
        STResizeManager.prototype.measureColumnHeaderUIInPx = function (col) {
            var colHeaderUI = this.getColumnHeaderUI(col);
            return colHeaderUI.outerWidth(true);
        };
        STResizeManager.prototype.getColumnHeaderUI = function (col) {
            var header = this.getTableHeaderUI(col);
            var ths = header.children();
            for (var i = 0; i < ths.length; i++) {
                var thItem = ths[i];
                if (thItem.attr('id') === col.id) {
                    return thItem;
                }
            }
            return null;
        };
        STResizeManager.prototype.getTableHeaderUI = function (col) {
            return this.table.uiParts.thead;
        };
        return STResizeManager;
    })();
    STResize.STResizeManager = STResizeManager;
})(STResize || (STResize = {}));
//# sourceMappingURL=STResizeManager.js.map