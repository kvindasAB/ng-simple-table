/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="STConfig.ts" />
/// <reference path="STConstants.ts" />
var STCore;
(function (STCore) {
    var ResizeManager = (function () {
        function ResizeManager(config) {
            this.config = config;
        }
        ResizeManager.prototype.resizeTable = function () {
            if (this.isResizeFixed()) {
                this.resizeTableFixed();
                return;
            }
            this.resizeTablePercentage();
        };
        ResizeManager.prototype.resizeTablePercentage = function () {
        };
        ResizeManager.prototype.resizeTableFixed = function () {
            var columns = this.config.columns;
            var totalWidth = 0;
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (!column.active) {
                    continue;
                }
                totalWidth += this.getWidthInNumber(column.style.width);
            }
            this.config.tableWidth = totalWidth + 'px';
        };
        ResizeManager.prototype.getWidthInNumber = function (width) {
            var stringWidth = '';
            var widthType = this.getWidthType(width);
            if (widthType === STCore.Constants.UNIT_PIXELS) {
                stringWidth = width.substring(0, width.length - 2);
            }
            else {
                stringWidth = width.substring(0, width.length - 1);
            }
            var columnWidth = parseFloat(stringWidth);
            return columnWidth;
        };
        ResizeManager.prototype.getWidthType = function (width) {
            var widthType = width.substring(width.length - 2, width.length);
            if (widthType === STCore.Constants.UNIT_PIXELS) {
                return STCore.Constants.UNIT_PIXELS;
            }
            return STCore.Constants.UNIT_PERCENTAGE;
        };
        ResizeManager.prototype.isResizePercentage = function () {
            return !this.isResizeFixed();
        };
        ResizeManager.prototype.isResizeFixed = function () {
            return this.config.resizeType === STCore.Constants.RESIZE_FIXED;
        };
        return ResizeManager;
    })();
    STCore.ResizeManager = ResizeManager;
})(STCore || (STCore = {}));
//# sourceMappingURL=STResizeManager.js.map