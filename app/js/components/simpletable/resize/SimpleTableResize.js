/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../core/STConstants.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableResize;
(function (SimpleTableResize_1) {
    var SimpleTableResize = (function () {
        function SimpleTableResize(scope, element, attrs, $window) {
            this.initializationComplete = false;
            this.minColumnWidth = 25;
            this.isMouseDown = false;
            this.startX = 0;
            this.indexColumnResize = 0;
            this.orginalColumnWidth = 0;
            this.parentMoveHandle = null;
            this.table = null;
            this.tableHeaderColumnList = null;
            this.originalTableWidth = 0;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$window = $window;
        }
        SimpleTableResize.prototype.init = function () {
            this.initializationComplete = true;
            this.addEventListeners();
        };
        SimpleTableResize.prototype.isInitialized = function () {
            return this.initializationComplete;
        };
        SimpleTableResize.prototype.addEventListeners = function () {
        };
        SimpleTableResize.prototype.removeEventListeners = function () {
        };
        SimpleTableResize.prototype.onMouseDownHandler = function (event, scope, element) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (!this.table) {
                var th = angular.element(element).parent();
                var tr = angular.element(th).parent();
                var tHead = angular.element(tr).parent();
                this.tableHeaderColumnList = angular.element(tr).children();
                this.table = angular.element(tHead).parent();
            }
            this.parentMoveHandle = angular.element(element).parent();
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
            this.originalTableWidth = angular.element(this.table).width();
            var self = this;
            angular.element('body').addClass('resize-cursor');
            angular.element(this.table).addClass('resize-cursor');
            angular.element(this.$window).on('mousemove', function (event) {
                var parentScope = self.scope;
                parentScope.simpleTableResize.onMouseMoveHandler(event, scope, element);
            });
            angular.element(this.$window).on('mouseup', function (event) {
                var parentScope = self.scope;
                parentScope.simpleTableResize.onMouseUpHandler(event, scope, element);
            });
        };
        SimpleTableResize.prototype.onMouseMoveHandler = function (event, scope, element) {
            if (!this.isMouseDown) {
                return;
            }
            var tableConfig = scope.tableConfig;
            if (tableConfig.resizeType === STCore.Constants.RESIZE_FIXED) {
                this.updateFixedTableColumns(event, tableConfig, scope);
            }
            if (tableConfig.resizeType === STCore.Constants.RESIZE_RELATIVE) {
                this.updateAdjustableTableColumns(event, tableConfig, scope);
            }
        };
        SimpleTableResize.prototype.updateFixedTableColumns = function (event, tableConfig, scope) {
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            if (!this.isMinColumnWidth(this.orginalColumnWidth, width)) {
                tableConfig.tableWidth = this.calculateNewTableWidth(width);
            }
            scope.$apply();
        };
        SimpleTableResize.prototype.calculateNewTableWidth = function (extraWidth) {
            var newWidth = this.originalTableWidth + extraWidth;
            return newWidth + STCore.Constants.UNIT_PIXELS;
        };
        SimpleTableResize.prototype.updateAdjustableTableColumns = function (event, tableConfig, scope) {
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            scope.$apply();
        };
        SimpleTableResize.prototype.calculateNewColumnWidth = function (tableConfig, actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            if (widthType === STCore.Constants.UNIT_PIXELS) {
                return this.calculatePixels(actualWidth, moveWidth);
            }
            if (widthType === STCore.Constants.UNIT_PERCENTAGE) {
                return this.calculatePercentage(tableConfig, actualWidth, moveWidth);
            }
            return actualWidth;
        };
        SimpleTableResize.prototype.calculatePixels = function (actualWidth, moveWidth) {
            var columnWidth = this.getWidthInNumber(actualWidth);
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                columnWidth = this.minColumnWidth;
            }
            return columnWidth + STCore.Constants.UNIT_PIXELS;
        };
        SimpleTableResize.prototype.calculatePercentage = function (tableConfig, actualWidth, moveWidth) {
            var columnWidthPercent = this.getWidthInNumber(actualWidth);
            var columnWidth = 0;
            if (tableConfig.resizeType === STCore.Constants.RESIZE_FIXED) {
                columnWidth = ((this.originalTableWidth + moveWidth) * columnWidthPercent) / 100;
            }
            else {
                columnWidth = (this.originalTableWidth * columnWidthPercent) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                columnWidth = this.minColumnWidth;
            }
            var newPercentage = 0;
            if (tableConfig.resizeType === STCore.Constants.RESIZE_FIXED) {
                newPercentage = (columnWidth / (this.originalTableWidth + moveWidth)) * 100;
            }
            else {
                newPercentage = (columnWidth / this.originalTableWidth) * 100;
            }
            return newPercentage + STCore.Constants.UNIT_PERCENTAGE;
        };
        SimpleTableResize.prototype.isMinColumnWidth = function (actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            var columnWidth = this.getWidthInNumber(actualWidth);
            if (widthType === STCore.Constants.UNIT_PERCENTAGE) {
                columnWidth = (this.originalTableWidth * columnWidth) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                return true;
            }
            return false;
        };
        SimpleTableResize.prototype.onMouseUpHandler = function (event, scope, element) {
            angular.element('body').removeClass('resize-cursor');
            angular.element(this.table).removeClass('resize-cursor');
            angular.element(this.$window).off('mousemove');
            angular.element(this.$window).off('mouseup');
            this.isMouseDown = false;
            var columnData = scope.hcol;
            var tableConfig = scope.$parent.tableConfig;
            if (tableConfig.resizeType === STCore.Constants.RESIZE_RELATIVE) {
                this.updateOtherColumns(columnData, tableConfig);
            }
        };
        SimpleTableResize.prototype.updateOtherColumns = function (columnData, tableConfig) {
            var oldWidth = this.getWidthInNumber(this.orginalColumnWidth);
            var newWidth = this.getWidthInNumber(columnData.style.width);
            if (newWidth > oldWidth) {
                this.removeWidth((newWidth - oldWidth), tableConfig, columnData.id);
                return;
            }
            if (oldWidth > newWidth) {
                this.addWidth((oldWidth - newWidth), tableConfig, columnData.id);
                return;
            }
        };
        SimpleTableResize.prototype.addWidth = function (widthToAdd, tableConfig, updatedColumnId) {
            for (var i = 0; i < this.tableHeaderColumnList.length; i++) {
                var th = this.tableHeaderColumnList[i];
                if (updatedColumnId === th.id) {
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type = this.getWidthType(column.style.width);
                var originalWidth = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        };
        SimpleTableResize.prototype.removeWidth = function (widthToRemove, tableConfig, updatedColumnId) {
            for (var i = 0; i < this.tableHeaderColumnList.length; i++) {
                var th = this.tableHeaderColumnList[i];
                if (updatedColumnId === th.id) {
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type = this.getWidthType(column.style.width);
                var originalWidth = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        };
        SimpleTableResize.prototype.convertToPixelsOrPercentage = function (originalWidth, widthType) {
            if (widthType === STCore.Constants.UNIT_PIXELS) {
                return originalWidth + STCore.Constants.UNIT_PIXELS;
            }
            var newWidth = (originalWidth / this.originalTableWidth) * 100;
            return newWidth + STCore.Constants.UNIT_PERCENTAGE;
        };
        SimpleTableResize.prototype.getColumnDataById = function (id, tableConfig) {
            for (var i = 0; i < tableConfig.columns.length; i++) {
                var column = tableConfig.columns[i];
                if (id === column.id) {
                    return column;
                }
            }
            return null;
        };
        SimpleTableResize.prototype.getWidthInNumber = function (width) {
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
        SimpleTableResize.prototype.getWidthType = function (width) {
            var widthType = width.substring(width.length - 2, width.length);
            if (widthType === STCore.Constants.UNIT_PIXELS) {
                return STCore.Constants.UNIT_PIXELS;
            }
            return STCore.Constants.UNIT_PERCENTAGE;
        };
        return SimpleTableResize;
    })();
    SimpleTableResize_1.SimpleTableResize = SimpleTableResize;
})(SimpleTableResize || (SimpleTableResize = {}));
//# sourceMappingURL=SimpleTableResize.js.map