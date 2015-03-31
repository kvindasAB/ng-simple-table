var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableSelection;
(function (SimpleTableSelection) {
    var SimpleTablePluginSelection = (function (_super) {
        __extends(SimpleTablePluginSelection, _super);
        function SimpleTablePluginSelection() {
            _super.apply(this, arguments);
            // Attributes
            this.log = log4javascript.getLogger("SimpleTablePluginSelection");
            this.onRowClicked = function (scopeEvent, $event, row) {
                this.log.debug("SimpleTableSelection.onRowClicked:", arguments);
                if (this.scope.tableConfig.selectionMultiple) {
                    return this.doMultipleSelection($event, row);
                }
                return this.doSingleSelection($event, row);
            };
            this.doSingleSelection = function ($event, row) {
                var index = this.scope.selectedRows.indexOf(row);
                this.scope.selectedRows.length = 0;
                if (index > -1) {
                    return;
                }
                this.scope.selectedRows.push(row);
                this.log.debug("selectedRows: ", this.scope.selectedRows);
            };
            this.doMultipleSelection = function ($event, row) {
                var index = this.scope.selectedRows.indexOf(row);
                if (index > -1) {
                    return this.scope.selectedRows.splice(index, 1);
                }
                this.scope.selectedRows.push(row);
            };
        }
        // Overrides
        SimpleTablePluginSelection.prototype.init = function () {
            _super.prototype.init.call(this);
            this.initScope();
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
        SimpleTablePluginSelection.prototype.initScope = function () {
            this.scope = this.simpleTable.scope;
            this.scope.selectedRows = [];
            this.scope.pluginSelection = this;
        };
        SimpleTablePluginSelection.prototype.isRowSelected = function (row) {
            this.log.debug("isSelected: ", this.scope.selectedRows.indexOf(row));
            return (this.scope.selectedRows.indexOf(row) > -1);
        };
        return SimpleTablePluginSelection;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSelection.SimpleTablePluginSelection = SimpleTablePluginSelection;
})(SimpleTableSelection || (SimpleTableSelection = {}));
//# sourceMappingURL=SimpleTableSelection.js.map