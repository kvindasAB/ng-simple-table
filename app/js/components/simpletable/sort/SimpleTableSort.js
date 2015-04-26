var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableSort;
(function (SimpleTableSort) {
    var SimpleTablePluginSort = (function (_super) {
        __extends(SimpleTablePluginSort, _super);
        function SimpleTablePluginSort() {
            _super.apply(this, arguments);
            this.currentSortColumn = null;
            this.currentSort = null;
            this.currentSortReverse = false;
        }
        // Overrides
        SimpleTablePluginSort.prototype.init = function () {
            this.scope = this.simpleTable.scope;
            _super.prototype.init.call(this);
            this.simpleTable.sortManager = this;
        };
        SimpleTablePluginSort.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            this.scope.$on("onHeaderClicked", angular.bind(this, this.onHeaderClicked));
        };
        // Methods
        SimpleTablePluginSort.prototype.removePreviousSortFromColumns = function (columns) {
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                column.sorted = false;
                this.applyColumnSortState(column);
            }
        };
        SimpleTablePluginSort.prototype.markColumnAsSorted = function (column) {
            column.sorted = true;
            column.sortType = column.sortType ? column.sortType : "asc";
        };
        SimpleTablePluginSort.prototype.applyColumnSortState = function (column) {
            if (!column.headerClass) {
                column.headerClass = [];
            }
            if (!column.sorted) {
                this.removeFromArray(column.headerClass, ["sort", "asc", "desc"]);
                return;
            }
            this.addToArray(column.headerClass, ["sort", column.sortType]);
        };
        SimpleTablePluginSort.prototype.applySort = function (column) {
            this.currentSort = column.field;
            this.currentSortReverse = column.sortType === "asc" ? false : true;
            this.currentSortColumn = column;
            this.applyColumnSortState(column);
        };
        SimpleTablePluginSort.prototype.sortByColumn = function (column) {
            this.notifyListener("onSortStart", column);
            this.removePreviousSortFromColumns(this.scope.tableConfig.columns);
            this.markColumnAsSorted(column);
            this.applySort(column);
            this.notifyListener("onSortEnd", column);
        };
        SimpleTablePluginSort.prototype.onHeaderClicked = function (scopeEvent, $event, column) {
            this.notifyListener("onHeaderSortStart", column);
            this.switchColumnSortType(column);
            this.sortByColumn(column);
            this.notifyListener("onHeaderSortEnd", column);
        };
        SimpleTablePluginSort.prototype.revalidateSort = function () {
            if (!this.currentSortColumn) {
                return;
            }
            this.applySort(this.currentSortColumn);
        };
        SimpleTablePluginSort.prototype.onDataChanged = function (newValue, oldValue) {
            this.revalidateSort();
        };
        SimpleTablePluginSort.prototype.switchColumnSortType = function (column) {
            column.sortType = !column.sortType || column.sortType === "desc" ? "asc" : "desc";
        };
        SimpleTablePluginSort.prototype.setSortByColumn = function (column, sortType) {
            column.sortType = sortType;
            this.sortByColumn(column);
        };
        // Utility methods
        // TODO: Move to utility class
        SimpleTablePluginSort.prototype.addToArray = function (array, values) {
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var indx = array.indexOf(value);
                if (indx > -1) {
                    continue;
                }
                array.push(value);
            }
            return array;
        };
        SimpleTablePluginSort.prototype.removeFromArray = function (array, values) {
            if (array.length === 0) {
                return;
            }
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var indx = array.indexOf(value);
                if (indx < 0) {
                    continue;
                }
                array.splice(indx, 1);
            }
            return array;
        };
        return SimpleTablePluginSort;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSort.SimpleTablePluginSort = SimpleTablePluginSort;
})(SimpleTableSort || (SimpleTableSort = {}));
//# sourceMappingURL=SimpleTableSort.js.map