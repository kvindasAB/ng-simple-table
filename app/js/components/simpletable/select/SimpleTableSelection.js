var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableSelection;
(function (SimpleTableSelection) {
    var SimpleTablePluginSelection = (function (_super) {
        __extends(SimpleTablePluginSelection, _super);
        function SimpleTablePluginSelection() {
            _super.apply(this, arguments);
            this.selectedRows = [];
        }
        // Overrides
        SimpleTablePluginSelection.prototype.init = function () {
            this.scope = this.simpleTable.scope;
            _super.prototype.init.call(this);
            this.simpleTable.selection = this;
        };
        SimpleTablePluginSelection.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            this.scope.$on("onRowClicked", angular.bind(this, this.onRowClicked));
            this.scope.$on("$destroy", this.removeEventListeners);
        };
        SimpleTablePluginSelection.prototype.removeEventListeners = function () {
            this.scope.$off("onRowClicked");
            this.scope.$off("$destroy");
        };
        // Methods
        SimpleTablePluginSelection.prototype.isRowSelected = function (row) {
            return (this.selectedRows.indexOf(row) > -1);
        };
        SimpleTablePluginSelection.prototype.setSelectedRows = function (rows) {
            //console.log("setSelectedRows: ", rows);
            this.selectedRows.length = 0;
            for (var i = 0; i < rows.length; i++) {
                this.addSelectedRow(rows[i]);
            }
        };
        SimpleTablePluginSelection.prototype.onRowClicked = function (scopeEvent, $event, row) {
            this.addSelectedRow(row);
        };
        SimpleTablePluginSelection.prototype.addSelectedRow = function (row) {
            //console.log("SimpleTableSelection.addSelectedRow:", arguments);
            if (!this.isRowValid(row)) {
                return;
            }
            if (this.scope.tableConfig.selectionMultiple) {
                return this.doMultipleSelection(row);
            }
            return this.doSingleSelection(row);
        };
        SimpleTablePluginSelection.prototype.doSingleSelection = function (row) {
            var index = this.selectedRows.indexOf(row);
            this.selectedRows.length = 0;
            if (index > -1) {
                return;
            }
            this.selectedRows.push(row);
            //console.log("selectedRows: ", this.selectedRows);
        };
        SimpleTablePluginSelection.prototype.doMultipleSelection = function (row) {
            var index = this.selectedRows.indexOf(row);
            if (index > -1) {
                return this.selectedRows.splice(index, 1);
            }
            this.selectedRows.push(row);
        };
        SimpleTablePluginSelection.prototype.isRowValid = function (row) {
            return (this.simpleTable.scope.tableData.indexOf(row) > -1);
        };
        SimpleTablePluginSelection.prototype.revalidateSelection = function () {
            this.setSelectedRows(this.selectedRows.slice());
        };
        SimpleTablePluginSelection.prototype.onDataChanged = function (newValue, oldValue) {
            this.revalidateSelection();
        };
        return SimpleTablePluginSelection;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSelection.SimpleTablePluginSelection = SimpleTablePluginSelection;
})(SimpleTableSelection || (SimpleTableSelection = {}));
//# sourceMappingURL=SimpleTableSelection.js.map