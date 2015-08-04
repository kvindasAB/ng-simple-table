/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../util/STUtil.ts" />
var STColumn;
(function (STColumn) {
    var Column = (function () {
        function Column(data) {
            this.active = true;
            this.mutable = true;
            this.optimizeTemplate = true;
            this._data = data;
        }
        Column.prototype.syncFromData = function (data) {
            data = data ? data : this._data;
            this.id = data.id ? data.id : STUtil.Util.generateToken();
            this.field = data.field;
            this.title = data.title ? data.title : data.field;
            this.active = angular.isUndefined(data.active) ? true : data.active;
            this.style = data.style;
            this.headerClass = data.headerClass;
            this.cellClasses = data.cellClasses;
            this.cellIdFunction = data.cellIdFunction ? data.cellIdFunction : angular.noop;
            this.cellTemplate = data.cellTemplate;
            this.cellTemplateId = data.cellTemplateId;
            this.cellValueFunction = data.cellValueFunction;
            this.getCellValue = this.cellValueFunction ? this.getCustomCellValue : this.getDefaultCellValue;
            this.mutable = angular.isUndefined(data.mutable) ? true : data.mutable;
            this.mutableProperties = data.mutableProperties;
            this.staticProperties = data.staticProperties;
            this.optimizeTemplate = angular.isUndefined(data.optimizeTemplate) ? true : data.optimizeTemplate;
            this.validateOptimizationProperties(data);
        };
        Column.prototype.validateOptimizationProperties = function (data) {
            this.optimizeProperties = [];
            this.validateOptimizationProperty('cellId', 'cellIdFunction', data, this.optimizeProperties);
            this.validateOptimizationProperty('cellClasses', 'cellClasses', data, this.optimizeProperties);
            this.validateOptimizationProperty('headerClasses', 'headerClasses', data, this.optimizeProperties);
            this.validateOptimizationProperty('style', 'style', data, this.optimizeProperties);
        };
        Column.prototype.validateOptimizationProperty = function (prop, alias, data, optimizedProps) {
            if (data[alias]) {
                return;
            }
            optimizedProps.push(prop);
        };
        Column.prototype.getCustomCellValue = function (row) {
            return this.cellValueFunction(row, this);
        };
        Column.prototype.getDefaultCellValue = function (row) {
            return row[this.field];
        };
        Column.prototype.getCellValue = function (row) {
            return this.getDefaultCellValue(row);
        };
        Column.prototype.isMutableProperty = function (prop) {
            return !!(this.mutable || (this.mutableProperties && this.mutableProperties.indexOf(prop) > -1));
        };
        Column.prototype.isStaticProperty = function (prop) {
            return !!(!this.mutable || (this.staticProperties && this.staticProperties.indexOf(prop) > -1));
        };
        Column.prototype.isOptimizedProperty = function (prop) {
            return !!(this.optimizeProperties.indexOf(prop) > -1);
        };
        Column.prototype.hasStaticProperties = function () {
            return !!(!this.mutable || (this.staticProperties && this.staticProperties.length > 0));
        };
        return Column;
    })();
    STColumn.Column = Column;
})(STColumn || (STColumn = {}));
//# sourceMappingURL=STColumn.js.map