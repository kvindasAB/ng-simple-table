angular.module('simpletable', [
    'simpletable.table',
    'simpletable.table.tpls',
    'simpletable.table.header',
    'simpletable.table.column',
    'simpletable.table.body',
    'simpletable.table.row',
    'simpletable.table.cell',
    'simpletable.factory',
    'simpletable.reorder',
    'simpletable.resizable',
    'simpletable.uuid.util'
])
    .value('version', '0.2');
/// <reference path="../table/SimpleTable.ts" />
var STUtil;
(function (STUtil) {
    var Util = (function () {
        function Util() {
        }
        Util.generateToken = function (len) {
            if (len === void 0) { len = 8; }
            var id = (Math.random() + 1).toString(36).substring(2, 2 + len);
            return id;
        };
        return Util;
    })();
    STUtil.Util = Util;
})(STUtil || (STUtil = {}));
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
            this.cellClassesFunction = data.cellClassesFunction;
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
            this.validateOptimizationProperty('cellClassesFunction', 'cellClassesFunction', data, this.optimizeProperties);
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
        Column.prototype.hasCustomTemplate = function () {
            return !!(this.cellTemplate || this.cellTemplateId);
        };
        return Column;
    })();
    STColumn.Column = Column;
})(STColumn || (STColumn = {}));
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="./STColumn.ts" />
var STColumn;
(function (STColumn) {
    var ColumnManager = (function () {
        function ColumnManager() {
        }
        ColumnManager.prototype.processConfig = function (tableConfig) {
            if (!tableConfig && !tableConfig.columns) {
                return;
            }
            this.createColumns(tableConfig);
            tableConfig.columns = this.columns;
        };
        ColumnManager.prototype.createColumns = function (tableConfig) {
            var len = tableConfig && tableConfig.columns ? tableConfig.columns.length : 0;
            var columns = [];
            for (var i = 0; i < len; i++) {
                var col = new STColumn.Column(tableConfig.columns[i]);
                col.syncFromData();
                columns.push(col);
            }
            this.columns = columns;
        };
        return ColumnManager;
    })();
    STColumn.ColumnManager = ColumnManager;
})(STColumn || (STColumn = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var STCore;
(function (STCore) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.SELECTION_NONE = 'none';
        Constants.SELECTION_SINGLE = 'single';
        Constants.SELECTION_MULTIPLE = 'multiple';
        Constants.RESIZE_RELATIVE = 'relative';
        Constants.RESIZE_FIXED = 'fixed';
        Constants.UNIT_PIXELS = 'px';
        Constants.UNIT_PERCENTAGE = '%';
        return Constants;
    })();
    STCore.Constants = Constants;
})(STCore || (STCore = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
/// <reference path="STConstants.ts" />
var STCore;
(function (STCore) {
    var Config = (function () {
        function Config(data) {
            this._data = data;
        }
        Config.prototype.syncFromData = function (data) {
            data = data ? data : this._data;
            this.tableClasses = data.tableClasses;
            this.tableWidth = data.tableWidth;
            this.headerHeight = angular.isUndefined(data.headerHeight) ? '30px' : data.headerHeight;
            this.columns = data.columns;
            this.rowTemplate = data.rowTemplate;
            this.rowTemplateId = data.rowTemplateId;
            this.selectionType = angular.isUndefined(data.selectionType) ? STCore.Constants.SELECTION_SINGLE : data.selectionType;
            this.listeners = data.listeners;
            this.methods = data.methods;
            this.virtualScroll = angular.isUndefined(data.virtualScroll) ? false : data.virtualScroll;
        };
        return Config;
    })();
    STCore.Config = Config;
})(STCore || (STCore = {}));
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
/// <reference path="ISimpleTablePlugin.ts" />
var SimpleTablePlugin;
(function (SimpleTablePlugin) {
    var BaseSimpleTablePlugin = (function () {
        function BaseSimpleTablePlugin() {
            this.isInitializationComplete = false;
        }
        BaseSimpleTablePlugin.prototype.init = function () {
            this.addEventListeners();
        };
        BaseSimpleTablePlugin.prototype.doRegister = function (parent) {
            this.parent = parent ? parent : this.parent;
            this.parent.registerPlugin(this);
        };
        BaseSimpleTablePlugin.prototype.onRegistered = function (simpleTable) {
            this.simpleTable = simpleTable;
            this.init();
            this.isInitializationComplete = true;
        };
        BaseSimpleTablePlugin.prototype.isInitialized = function () {
            return this.isInitializationComplete;
        };
        BaseSimpleTablePlugin.prototype.addEventListeners = function () {
        };
        BaseSimpleTablePlugin.prototype.removeEventListeners = function () {
        };
        BaseSimpleTablePlugin.prototype.notifyListener = function (eventName, params) {
            if (!this.simpleTable) {
                return;
            }
            this.simpleTable.notifyListener(eventName, params);
        };
        return BaseSimpleTablePlugin;
    })();
    SimpleTablePlugin.BaseSimpleTablePlugin = BaseSimpleTablePlugin;
})(SimpleTablePlugin || (SimpleTablePlugin = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../core/STConstants.ts" />
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
        };
        SimpleTablePluginSelection.prototype.isRowSelected = function (row) {
            return (this.selectedRows.indexOf(row) > -1);
        };
        SimpleTablePluginSelection.prototype.setSelectedRows = function (rows) {
            this.selectedRows.length = 0;
            for (var i = 0; i < rows.length; i++) {
                this.addSelectedRow(rows[i]);
            }
        };
        SimpleTablePluginSelection.prototype.onRowClicked = function (scopeEvent, $event, row) {
            this.addSelectedRow(row);
        };
        SimpleTablePluginSelection.prototype.addSelectedRow = function (row) {
            if (!this.isRowValid(row)) {
                return;
            }
            if (this.isMultipleSelection()) {
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
        SimpleTablePluginSelection.prototype.isSingleSelection = function () {
            return this.scope.tableConfig.selectionType === STCore.Constants.SELECTION_SINGLE;
        };
        SimpleTablePluginSelection.prototype.isMultipleSelection = function () {
            return !this.isSingleSelection();
        };
        return SimpleTablePluginSelection;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSelection.SimpleTablePluginSelection = SimpleTablePluginSelection;
})(SimpleTableSelection || (SimpleTableSelection = {}));
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
        SimpleTablePluginSort.prototype.init = function () {
            this.scope = this.simpleTable.scope;
            _super.prototype.init.call(this);
            this.simpleTable.sortManager = this;
        };
        SimpleTablePluginSort.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            this.scope.$on("onHeaderClicked", angular.bind(this, this.onHeaderClicked));
        };
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
/// <reference path="../select/SimpleTableSelection.ts" />
/// <reference path="../sort/SimpleTableSort.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTablePluginFactory;
(function (SimpleTablePluginFactory_1) {
    var SimpleTablePluginFactory = (function () {
        function SimpleTablePluginFactory() {
        }
        SimpleTablePluginFactory.prototype.newPluginSelection = function () {
            console.log("creating new SimpleTablePluginSelection");
            return new SimpleTableSelection.SimpleTablePluginSelection();
        };
        SimpleTablePluginFactory.prototype.newPluginSort = function () {
            console.log("creating new SimpleTablePluginSort");
            return new SimpleTableSort.SimpleTablePluginSort();
        };
        return SimpleTablePluginFactory;
    })();
    SimpleTablePluginFactory_1.SimpleTablePluginFactory = SimpleTablePluginFactory;
})(SimpleTablePluginFactory || (SimpleTablePluginFactory = {}));
console.log("Creating angular module...: " + "simpletable.factory");
angular.module('simpletable.factory', [])
    .service('SimpleTablePluginFactory', [function () {
        console.log("instantiating service...");
        return new SimpleTablePluginFactory.SimpleTablePluginFactory();
    }]);
/// <reference path="ISimpleTable.ts" />
/// <reference path="../column/STColumnManager.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../core/STResizeManager.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTable;
(function (SimpleTable_1) {
    var SimpleTable = (function () {
        function SimpleTable(scope, element, attrs, $timeout, pluginFactory) {
            this.managers = {};
            this.plugins = [];
            this.initializationComplete = false;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;
            this.scope.simpleTable = this;
            this.init();
            console.log("SimpleTable created: ", this.scope);
        }
        SimpleTable.prototype.init = function () {
            this.notifyPreInitialization();
            this.addEventListeners();
            this.processConfig();
            this.initManagers();
            this.initDefaultPlugins();
            this.resizeTable();
        };
        SimpleTable.prototype.registerPlugin = function (plugin) {
            console.log("initializing plugins...", plugin);
            this.plugins.push(plugin);
            this.initPlugins();
        };
        SimpleTable.prototype.initPlugins = function () {
            if (this.initPluginTimeout) {
                this.$timeout.cancel(this.initPluginTimeout);
                this.initPluginTimeout = null;
            }
            this.initPluginTimeout = this.$timeout(angular.bind(this, this.doInitPlugins), 0);
        };
        SimpleTable.prototype.addEventListeners = function () {
            this.scope.$on("$destroy", this.removeEventListeners);
            this.scope.$watch("tableData", angular.bind(this, this.onDataChanged));
        };
        SimpleTable.prototype.removeEventListeners = function () {
            console.log("removing listeners...", this);
        };
        SimpleTable.prototype.processConfig = function () {
            var config = new STCore.Config(this.scope.tableConfig);
            config.syncFromData();
            this.scope.tableConfig = config;
        };
        SimpleTable.prototype.initManagers = function () {
            this.managers.columnManager = new STColumn.ColumnManager();
            this.managers.columnManager.processConfig(this.scope.tableConfig);
            this.managers.resizeManager = new STCore.ResizeManager(this.scope.tableConfig);
        };
        SimpleTable.prototype.initDefaultPlugins = function () {
            this.pluginFactory.newPluginSelection().doRegister(this);
            this.pluginFactory.newPluginSort().doRegister(this);
        };
        SimpleTable.prototype.resizeTable = function () {
            this.managers.resizeManager.resizeTable();
        };
        SimpleTable.prototype.doInitPlugins = function () {
            var self = this;
            angular.forEach(this.plugins, function (plugin) {
                if (plugin.isInitialized()) {
                    return;
                }
                plugin.onRegistered(self);
            });
            this.notifyInitializationComplete();
        };
        SimpleTable.prototype.onDataChanged = function (newValue, oldValue) {
            console.log("SimpleTable.onDataChanged...: ", this.initializationComplete);
            if (this.initializationComplete) {
                this.notifyPluginsDataChanged(newValue, oldValue);
            }
        };
        SimpleTable.prototype.onRowClicked = function ($event, row) {
            this.scope.$broadcast("onRowClicked", $event, row);
            this.notifyListener('onRowClicked', [$event, row]);
            this.scope.$apply();
        };
        SimpleTable.prototype.onRowDoubleClicked = function ($event, row) {
            this.scope.$broadcast("onRowDoubleClicked", $event, row);
            this.notifyListener('onRowDoubleClicked', [$event, row]);
            this.scope.$apply();
        };
        SimpleTable.prototype.onRowMouseEnter = function ($event, row) {
            this.scope.$broadcast("onRowMouseEnter", $event, row);
            this.notifyListener('onRowMouseEnter', [$event, row]);
            this.scope.$apply();
        };
        SimpleTable.prototype.onRowMouseLeave = function ($event, row) {
            this.scope.$broadcast("onRowMouseLeave", $event, row);
            this.notifyListener('onRowMouseLeave', [$event, row]);
            this.scope.$apply();
        };
        SimpleTable.prototype.onHeaderClicked = function ($event, column) {
            this.scope.$broadcast("onHeaderClicked", $event, column);
            this.scope.$apply();
        };
        SimpleTable.prototype.notifyPreInitialization = function () {
            this.notifyListener("onPreInitialization", this);
        };
        SimpleTable.prototype.notifyInitializationComplete = function () {
            if (this.initializationComplete) {
                return;
            }
            this.initializationComplete = true;
            this.notifyListener("onInitializationComplete", this);
        };
        SimpleTable.prototype.notifyListener = function (eventName, params) {
            if (!this.scope.tableConfig.listeners || !this.scope.tableConfig.listeners[eventName]) {
                return;
            }
            this.scope.tableConfig.listeners[eventName](params);
        };
        SimpleTable.prototype.notifyPluginsDataChanged = function (newValue, oldValue) {
            for (var i = 0; i < this.plugins.length; i++) {
                var plugin = this.plugins[i];
                if (!plugin.onDataChanged) {
                    continue;
                }
                plugin.onDataChanged(newValue, oldValue);
            }
        };
        return SimpleTable;
    })();
    SimpleTable_1.SimpleTable = SimpleTable;
})(SimpleTable || (SimpleTable = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
var STCore;
(function (STCore) {
    var BaseComponentUI = (function () {
        function BaseComponentUI() {
        }
        BaseComponentUI.prototype.setServices = function ($compile, $templateCache, $templateRequest) {
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$templateRequest = $templateRequest;
        };
        BaseComponentUI.prototype.link = function (scope, element, attrs, simpleTable) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.simpleTable = simpleTable;
            this.scope.$on('$destroy', this.dispose);
        };
        BaseComponentUI.prototype.validateCustomTemplate = function () {
            if (!this.shouldUseCustomTemplate()) {
                return;
            }
            var tpl = this.getCustomTemplate(this.scope);
            this.optimizeAndApplyTemplate(tpl, this.scope);
        };
        BaseComponentUI.prototype.shouldUseCustomTemplate = function () {
            return false;
        };
        BaseComponentUI.prototype.getCustomTemplate = function (scope) {
            return null;
        };
        BaseComponentUI.prototype.getTemplateByCacheId = function (tplId) {
            return this.$templateCache.get(tplId);
        };
        BaseComponentUI.prototype.getTemplateByUrl = function (tplUrl) {
            var tpl = this.$templateCache.get(tplUrl);
            if (tpl) {
                return tpl;
            }
            return this.$templateRequest(tplUrl);
        };
        BaseComponentUI.prototype.optimizeAndApplyTemplate = function (tpl, scope) {
            var otpl = this.shouldOptimizeTemplate(tpl, scope) ? this.optimizeTemplate(tpl, scope) : tpl;
            this.applyTemplate(otpl, scope);
        };
        BaseComponentUI.prototype.applyTemplate = function (tpl, scope) {
            if (!tpl) {
                return;
            }
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        };
        BaseComponentUI.prototype.optimizeTemplate = function (tpl, scope) {
            return tpl;
        };
        BaseComponentUI.prototype.optimizeTemplateParts = function (tpl, parts) {
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                tpl = this.optimizeTemplatePart(tpl, part);
            }
            return tpl;
        };
        BaseComponentUI.prototype.optimizeTemplatePart = function (tpl, part) {
            return tpl.replace(part.src, part.repl);
        };
        BaseComponentUI.prototype.shouldOptimizeTemplate = function (tpl, scope) {
            return true;
        };
        BaseComponentUI.prototype.dispose = function () {
            delete this.scope;
            delete this.element;
            delete this.attrs;
            delete this.simpleTable;
            delete this.$compile;
            delete this.$templateCache;
            delete this.$templateRequest;
        };
        return BaseComponentUI;
    })();
    STCore.BaseComponentUI = BaseComponentUI;
})(STCore || (STCore = {}));
var STTemplates;
(function (STTemplates) {
    var STTpls = (function () {
        function STTpls() {
        }
        STTpls.prototype.getTemplates = function () {
            return [STTpls.TABLE_TPL_PAIR, STTpls.HEADER_TPL_PAIR, STTpls.COLUMN_TPL_PAIR, STTpls.BODY_TPL_PAIR, STTpls.BODY_VS_TPL_PAIR, STTpls.ROW_TPL_PAIR, STTpls.CELL_TPL_PAIR, STTpls.CELL_BO_TPL_PAIR];
        };
        STTpls.CELL_TPL = "";
        STTpls.CELL_BO_TPL = "";
        STTpls.ROW_TPL = "<td ng-repeat='col in tableConfig.columns' st-table-cell ng-if='col.active' ></td>";
        STTpls.BODY_TPL = "<tr bindonce ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
            "  ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
            "  st-table-row >" +
            "</tr>";
        STTpls.BODY_VS_TPL = "<tr bindonce ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
            "  sf-virtual-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
            "  st-table-row >" +
            "</tr>";
        STTpls.COLUMN_TPL = "{{hcol.title}}<div st-table-resizable-handler11 class='table-header-cursor-container'></div>";
        STTpls.HEADER_TPL = "<tr>" +
            "  <th id='{{hcol.id}}' class='table-header' " +
            "   ng-repeat='hcol in tableConfig.columns track by hcol.id' " +
            "   ng-class='hcol.headerClass' ng-if='hcol.active' " +
            "   ng-style='{\"height\":tableConfig.headerHeight, \"min-width\":hcol.style.minWidth, \"width\":hcol.style.width}' " +
            "   st-table-drop-target='true' st-table-draggable='true' st-table-column>" +
            "  </th>" +
            "</tr>";
        STTpls.TABLE_TPL = "<div ng-style='{width:tableConfig.tableWidth}'>" +
            "  <table ng-class='tableConfig.tableClasses' ng-style='{width:tableConfig.tableWidth}'>" +
            "    <thead st-table-header>" +
            "    </thead>" +
            "    <tbody st-table-body virtual-scroll='{{tableConfig.virtualScroll}}' >" +
            "    </tbody>" +
            "  </table>" +
            "</div>";
        STTpls.CELL_TPL_ID = 'stTableCellTpl.html';
        STTpls.CELL_BO_TPL_ID = 'stTableCellBOTpl.html';
        STTpls.ROW_TPL_ID = 'stTableRowTpl.html';
        STTpls.BODY_TPL_ID = 'stTableBodyTpl.html';
        STTpls.BODY_VS_TPL_ID = 'stTableBodyVSTpl.html';
        STTpls.COLUMN_TPL_ID = 'stTableColumnTpl.html';
        STTpls.HEADER_TPL_ID = 'stTableHeaderTpl.html';
        STTpls.TABLE_TPL_ID = 'stTableTpl.html';
        STTpls.CELL_TPL_PAIR = { id: STTpls.CELL_TPL_ID, tpl: STTpls.CELL_TPL };
        STTpls.CELL_BO_TPL_PAIR = { id: STTpls.CELL_BO_TPL_ID, tpl: STTpls.CELL_BO_TPL };
        STTpls.ROW_TPL_PAIR = { id: STTpls.ROW_TPL_ID, tpl: STTpls.ROW_TPL };
        STTpls.BODY_TPL_PAIR = { id: STTpls.BODY_TPL_ID, tpl: STTpls.BODY_TPL };
        STTpls.BODY_VS_TPL_PAIR = { id: STTpls.BODY_VS_TPL_ID, tpl: STTpls.BODY_VS_TPL };
        STTpls.COLUMN_TPL_PAIR = { id: STTpls.COLUMN_TPL_ID, tpl: STTpls.COLUMN_TPL };
        STTpls.HEADER_TPL_PAIR = { id: STTpls.HEADER_TPL_ID, tpl: STTpls.HEADER_TPL };
        STTpls.TABLE_TPL_PAIR = { id: STTpls.TABLE_TPL_ID, tpl: STTpls.TABLE_TPL };
        return STTpls;
    })();
    STTemplates.STTpls = STTpls;
})(STTemplates || (STTemplates = {}));
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
/// <reference path="../column/STColumn.ts" />
var STCellUI;
(function (STCellUI) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell() {
            _super.apply(this, arguments);
        }
        Cell.prototype.init = function () {
            if (this.shouldUseCustomTemplate()) {
                this.validateCustomTemplate();
                this.addWatchers();
                return;
            }
            this.applyDefaultTemplate();
            this.addWatchers();
        };
        Cell.prototype.addWatchers = function () {
            this.addCellIdWatcher();
            this.addCellClassesWatcher();
            this.addCellClassesFunctionWatcher();
            if (!this.shouldUseCustomTemplate()) {
                this.addCellValueWatcher();
            }
        };
        Cell.prototype.addCellValueWatcher = function () {
            var self = this;
            this.cellValueWatcher = this.scope.$watch('col.getCellValue(row, col, tableConfig)', function (newValue, oldValue) {
                var col = self.scope.col;
                self.element.text(newValue);
                if (angular.isUndefined(newValue)) {
                    return;
                }
                if (col.isStaticProperty('cellValue')) {
                    self.cellValueWatcher();
                }
            });
        };
        Cell.prototype.addCellIdWatcher = function () {
            var self = this;
            this.cellIdWatcher = this.scope.$watch('col.cellIdFunction', function (newValue, oldValue) {
                var col = self.scope.col;
                if (!newValue || newValue === angular.noop) {
                    if (col.isOptimizedProperty('cellId')) {
                        self.cellIdWatcher();
                    }
                    return;
                }
                var value = newValue(self.scope.row, self.scope.col, self.scope.tableConfig);
                self.element.attr('id', value);
                if (col.isStaticProperty('cellId')) {
                    self.cellIdWatcher();
                }
            });
        };
        Cell.prototype.addCellClassesWatcher = function () {
            var self = this;
            this.cellClassesWatcher = this.scope.$watchCollection('col.cellClasses', function (newValue, oldValue) {
                var col = self.scope.col;
                if (!newValue) {
                    if (col.isOptimizedProperty('cellClasses')) {
                        self.cellClassesWatcher();
                    }
                    return;
                }
                var newClasses = self.arrayClasses(newValue || []);
                if (!oldValue || (oldValue === newValue)) {
                    self.addClasses(newClasses);
                }
                else if (!angular.equals(newValue, oldValue)) {
                    var oldClasses = self.arrayClasses(oldValue);
                    self.updateClasses(oldClasses, newClasses);
                }
                if (col.isStaticProperty('cellClasses')) {
                    self.cellClassesWatcher();
                }
            });
        };
        Cell.prototype.addCellClassesFunctionWatcher = function () {
            var self = this;
            this.cellClassesFunctionWatcher = this.scope.$watch(function (scope) {
                return scope.col.cellClassesFunction ? scope.col.cellClassesFunction(scope.row, scope.col, scope.tableConfig) : null;
            }, function (newValue, oldValue) {
                var col = self.scope.col;
                if (!newValue) {
                    if (col.isOptimizedProperty('cellClassesFunction')) {
                        self.cellClassesFunctionWatcher();
                    }
                    return;
                }
                var newClasses = self.arrayClasses(newValue || []);
                if (!oldValue || (newValue === oldValue)) {
                    self.addClasses(newClasses);
                }
                else if (!angular.equals(newValue, oldValue)) {
                    var oldClasses = self.arrayClasses(oldValue);
                    self.updateClasses(oldClasses, newClasses);
                }
                if (col.isStaticProperty('cellClassesFunction')) {
                    self.cellClassesFunctionWatcher();
                }
            });
        };
        Cell.prototype.arrayClasses = function (classVal) {
            var classes = [], self = this;
            if (angular.isArray(classVal)) {
                angular.forEach(classVal, function (v) {
                    classes = classes.concat(self.arrayClasses(v));
                });
                return classes;
            }
            else if (angular.isString(classVal)) {
                return classVal.split(' ');
            }
            else if (angular.isObject(classVal)) {
                angular.forEach(classVal, function (v, k) {
                    if (!v) {
                        return;
                    }
                    classes = classes.concat(k.split(' '));
                });
                return classes;
            }
            return classVal;
        };
        Cell.prototype.updateClasses = function (oldClasses, newClasses) {
            var toAdd = this.arrayDifference(newClasses, oldClasses);
            var toRemove = this.arrayDifference(oldClasses, newClasses);
            this.addClasses(toAdd);
            this.removeClasses(toRemove);
        };
        Cell.prototype.arrayDifference = function (tokens1, tokens2) {
            var values = [];
            outer: for (var i = 0; i < tokens1.length; i++) {
                var token = tokens1[i];
                for (var j = 0; j < tokens2.length; j++) {
                    if (token == tokens2[j])
                        continue outer;
                }
                values.push(token);
            }
            return values;
        };
        Cell.prototype.addClasses = function (classes) {
            for (var i = 0; i < classes.length; i++) {
                var cssClass = classes[i];
                this.element.addClass(cssClass);
            }
        };
        Cell.prototype.removeClasses = function (classes) {
            for (var i = 0; i < classes.length; i++) {
                var cssClass = classes[i];
                this.element.removeClass(cssClass);
            }
        };
        Cell.prototype.shouldUseCustomTemplate = function () {
            var col = this.scope.col;
            return col && (col.cellTemplate || col.cellTemplateId);
        };
        Cell.prototype.getCustomTemplate = function (scope) {
            var col = scope.col;
            if (col.cellTemplateId) {
                return this.getTemplateByCacheId(col.cellTemplateId);
            }
            return col.cellTemplate;
        };
        Cell.prototype.applyDefaultTemplate = function () {
            var tpl = this.$templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            this.optimizeAndApplyTemplate(tpl, this.scope);
        };
        Cell.prototype.optimizeTemplate = function (tpl, scope) {
            var col = scope.col;
            if (col.isStaticProperty('cellValue')) {
                return this.$templateCache.get(STTemplates.STTpls.CELL_BO_TPL_ID);
            }
            return tpl;
        };
        return Cell;
    })(STCore.BaseComponentUI);
    STCellUI.Cell = Cell;
})(STCellUI || (STCellUI = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STCellUI.ts" />
angular.module('simpletable.table.cell', [])
    .directive('stTableCell', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        var cell = new STCellUI.Cell();
                        cell.setServices($compile, $templateCache, $templateRequest);
                        cell.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        cell.init();
                        return cell;
                    }
                };
            },
            template: function (tElem, tAttrs) {
            }
        };
    }]);
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
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STColumnUI.ts" />
angular.module('simpletable.table.column', [])
    .directive('stTableColumn', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                $log.log('Col compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        $log.log('Col pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        var column = new STColumnUI.Column();
                        column.setServices($compile, $templateCache, $templateRequest);
                        column.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        column.init();
                    }
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.COLUMN_TPL_ID);
            }
        };
    }]);
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../tpl/STTemplates.ts" />
angular.module('simpletable.table.header', [])
    .directive('stTableHeader', ['$log', '$templateCache', function ($log, $templateCache) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                $log.log('Header compile: ', tElem, tAttrs);
                return {
                    pre: function (scope, iElem, iAttrs) {
                        $log.log('Header pre: ', iElem, scope);
                    },
                    post: function (scope, iElem, iAttrs) {
                        $log.log('Header post: ', iElem, scope);
                    }
                };
            },
            template: function (tElem, tAttr) {
                return $templateCache.get(STTemplates.STTpls.HEADER_TPL_ID);
            }
        };
    }]);
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderUuidUtil = (function () {
        function SimpleTableReorderUuidUtil() {
        }
        SimpleTableReorderUuidUtil.prototype.new = function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        };
        SimpleTableReorderUuidUtil.prototype.empty = function () {
            return '00000000-0000-0000-0000-000000000000';
        };
        return SimpleTableReorderUuidUtil;
    })();
    SimpleTableReorder.SimpleTableReorderUuidUtil = SimpleTableReorderUuidUtil;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderDrag = (function (_super) {
        __extends(SimpleTableReorderDrag, _super);
        function SimpleTableReorderDrag(rootScope, scope, element, attrs) {
            _super.call(this);
            this.DRAG_START_EVENT = 'dragstart';
            this.DRAG_END_EVENT = 'dragend';
            this.SIMPLE_TABLE_DRAG_START_EVENT = 'simpleTableDragStartEvent';
            this.SIMPLE_TABLE_DRAG_END_EVENT = 'simpleTableDragEndEvent';
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.init();
        }
        SimpleTableReorderDrag.prototype.init = function () {
            this.initUuid();
            _super.prototype.init.call(this);
        };
        SimpleTableReorderDrag.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            var self = this;
            this.element.bind(this.DRAG_START_EVENT, function (event) {
                return self.onDragStartHandler(event);
            });
            this.element.bind(this.DRAG_END_EVENT, function (event) {
                return self.onDragEndHandler(event);
            });
        };
        SimpleTableReorderDrag.prototype.initUuid = function () {
            this.uuid = new SimpleTableReorder.SimpleTableReorderUuidUtil();
            angular.element(this.element).attr("draggable", "true");
            var scope = angular.element(this.element).scope();
            var id = scope.hcol.id;
            if (!id) {
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
        };
        SimpleTableReorderDrag.prototype.onDragStartHandler = function (event) {
            event.dataTransfer.setData('text', this.id);
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_START_EVENT);
        };
        SimpleTableReorderDrag.prototype.onDragEndHandler = function (event) {
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_END_EVENT);
        };
        return SimpleTableReorderDrag;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableReorder.SimpleTableReorderDrag = SimpleTableReorderDrag;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrop.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderDrop = (function (_super) {
        __extends(SimpleTableReorderDrop, _super);
        function SimpleTableReorderDrop(rootScope, scope, element, attrs) {
            _super.call(this);
            this.DRAG_OVER_EVENT = 'dragover';
            this.DRAG_ENTER_EVENT = 'dragenter';
            this.DRAG_LEAVE_EVENT = 'dragleave';
            this.DROP_EVENT = 'drop';
            this.SIMPLE_TABLE_DRAG_START_EVENT = 'simpleTableDragStartEvent';
            this.SIMPLE_TABLE_DRAG_END_EVENT = 'simpleTableDragEndEvent';
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.init();
        }
        SimpleTableReorderDrop.prototype.init = function () {
            this.initUuid();
            _super.prototype.init.call(this);
        };
        SimpleTableReorderDrop.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            var self = this;
            this.element.bind(this.DRAG_OVER_EVENT, this.onDragOverHandler);
            this.element.bind(this.DRAG_ENTER_EVENT, this.onDragEnterHandler);
            this.element.bind(this.DRAG_LEAVE_EVENT, this.onDragLeaveHandler);
            this.element.bind(this.DROP_EVENT, function (event) {
                return self.onDropHandler(event);
            });
            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_START_EVENT, function () {
                return self.onDragStartHandler();
            });
            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_END_EVENT, function () {
                return self.onDragEndHandler();
            });
        };
        SimpleTableReorderDrop.prototype.initUuid = function () {
            this.uuid = new SimpleTableReorder.SimpleTableReorderUuidUtil();
            var id = angular.element(this.element).attr("id");
            if (!id) {
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
        };
        SimpleTableReorderDrop.prototype.onDragOverHandler = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.dataTransfer.dropEffect = 'move';
            return false;
        };
        SimpleTableReorderDrop.prototype.onDragEnterHandler = function (event) {
            angular.element(event.target).addClass('simple-table-over');
        };
        SimpleTableReorderDrop.prototype.onDragLeaveHandler = function (event) {
            angular.element(event.target).removeClass('simple-table-over');
        };
        SimpleTableReorderDrop.prototype.onDropHandler = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            var parent = this.scope.$parent;
            var tableConfig = parent.tableConfig;
            var columns = tableConfig.columns;
            var data = event.dataTransfer.getData("text");
            var src = angular.element('#' + data);
            var srcData = angular.element(src)[0];
            var oldIndex = this.getIndexById(columns, srcData.id);
            var dest = angular.element(event.target)[0];
            var newIndex = this.getIndexById(columns, dest.id);
            var dataColumn = columns[oldIndex];
            columns.splice(oldIndex, 1);
            if (newIndex === columns.length) {
                columns[newIndex] = dataColumn;
            }
            else {
                columns.splice(newIndex, 0, dataColumn);
            }
            angular.element(event.target).removeClass('simple-table-over');
            this.scope.onSymbolDrop({});
            this.scope.$apply();
        };
        SimpleTableReorderDrop.prototype.getIndexById = function (columns, id) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].id === id) {
                    return i;
                }
            }
            return 0;
        };
        SimpleTableReorderDrop.prototype.onDragStartHandler = function () {
            var element = document.getElementById(this.id);
            angular.element(element).addClass("simple-table-target");
        };
        SimpleTableReorderDrop.prototype.onDragEndHandler = function () {
            var element = document.getElementById(this.id);
            angular.element(element).removeClass("simple-table-target");
            angular.element(element).removeClass("simple-table-over");
        };
        return SimpleTableReorderDrop;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableReorder.SimpleTableReorderDrop = SimpleTableReorderDrop;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />
/// <reference path="SimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderDrop.ts" />
angular.module('simpletable.reorder', ['simpletable.uuid.util'])
    .directive('stTableDraggable', ['$timeout', '$rootScope', 'simpletableuuid',
    function ($timeout, $rootScope, uuid) {
        return {
            require: '^stTable',
            link: function (scope, element, attrs, parentCtrl) {
                return new SimpleTableReorder.SimpleTableReorderDrag($rootScope, scope, element, attrs);
            }
        };
    }
])
    .directive('stTableDropTarget', ['$timeout', '$rootScope', 'simpletableuuid',
    function ($timeout, $rootScope, uuid) {
        return {
            require: '^stTable',
            restrict: 'A',
            scope: {
                onSymbolDrop: '&'
            },
            link: function (scope, element, attrs, controller) {
                return new SimpleTableReorder.SimpleTableReorderDrop($rootScope, scope, element, attrs);
            }
        };
    }
]);
angular.module('simpletable.uuid.util', []).factory('simpletableuuid', function () {
    var svc = {
        new: function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
        empty: function () {
            return '00000000-0000-0000-0000-000000000000';
        }
    };
    return svc;
});
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableResize;
(function (SimpleTableResize_1) {
    var SimpleTableResize = (function () {
        function SimpleTableResize(scope, element, attrs, $window) {
            this.RESIZE_TYPE_FIXED = 'fixed';
            this.RESIZE_TYPE_ADJUSTABLE = 'adjustable';
            this.WIDTH_PIXELS_TYPE = 'px';
            this.WIDTH_PERCENTAGE_TYPE = '%';
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
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
                this.updateFixedTableColumns(event, tableConfig, scope);
            }
            if (tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE) {
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
            return newWidth + this.WIDTH_PIXELS_TYPE;
        };
        SimpleTableResize.prototype.updateAdjustableTableColumns = function (event, tableConfig, scope) {
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            scope.$apply();
        };
        SimpleTableResize.prototype.calculateNewColumnWidth = function (tableConfig, actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return this.calculatePixels(actualWidth, moveWidth);
            }
            if (widthType === this.WIDTH_PERCENTAGE_TYPE) {
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
            return columnWidth + this.WIDTH_PIXELS_TYPE;
        };
        SimpleTableResize.prototype.calculatePercentage = function (tableConfig, actualWidth, moveWidth) {
            var columnWidthPercent = this.getWidthInNumber(actualWidth);
            var columnWidth = 0;
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
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
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
                newPercentage = (columnWidth / (this.originalTableWidth + moveWidth)) * 100;
            }
            else {
                newPercentage = (columnWidth / this.originalTableWidth) * 100;
            }
            return newPercentage + this.WIDTH_PERCENTAGE_TYPE;
        };
        SimpleTableResize.prototype.isMinColumnWidth = function (actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            var columnWidth = this.getWidthInNumber(actualWidth);
            if (widthType === this.WIDTH_PERCENTAGE_TYPE) {
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
            if (tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE) {
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
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return originalWidth + this.WIDTH_PIXELS_TYPE;
            }
            var newWidth = (originalWidth / this.originalTableWidth) * 100;
            return newWidth + this.WIDTH_PERCENTAGE_TYPE;
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
            if (widthType === this.WIDTH_PIXELS_TYPE) {
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
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return this.WIDTH_PIXELS_TYPE;
            }
            return this.WIDTH_PERCENTAGE_TYPE;
        };
        return SimpleTableResize;
    })();
    SimpleTableResize_1.SimpleTableResize = SimpleTableResize;
})(SimpleTableResize || (SimpleTableResize = {}));
/// <reference path="SimpleTableResize.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$timeout', '$window',
    function ($timeout, $window) {
        return {
            require: '^stTable',
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {
                if (!$scope.simpleTableResize) {
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                this.getParent = function () {
                    return $scope.simpleTableResize;
                };
                return $scope.simpleTableResize;
            },
            link: function ($scope, $element, $attrs, parent) {
                if (!$scope.simpleTableResize) {
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                $scope.simpleTableResize.parent = parent;
                $scope.simpleTableResize.init();
                return $scope.simpleTableResize;
            }
        };
    }])
    .directive('stTableResizableHandler', ['$timeout', function ($timeout) {
        return {
            require: '^stTableResizable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                element.on('mousedown', function (event) { parentCtrl.getParent().onMouseDownHandler(event, scope, element); });
            }
        };
    }]);
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../tpl/STTemplates.ts" />
var STBodyUI;
(function (STBodyUI) {
    var Body = (function (_super) {
        __extends(Body, _super);
        function Body() {
            _super.apply(this, arguments);
        }
        Body.prototype.init = function () {
            this.validateCustomTemplate();
        };
        Body.prototype.shouldUseCustomTemplate = function () {
            var tableConfig = this.scope.tableConfig;
            return tableConfig && (tableConfig.rowTemplate || tableConfig.rowTemplateId);
        };
        Body.prototype.validateCustomTemplate = function () {
            if (!this.shouldUseCustomTemplate()) {
                this.applyTemplate(this.getDefaultTemplate(this.isVirtualScrollEnabled()), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        };
        Body.prototype.getDefaultTemplate = function (virtualScroll) {
            if (virtualScroll) {
                return this.getTemplateByCacheId(STTemplates.STTpls.BODY_VS_TPL_ID);
            }
            return this.getTemplateByCacheId(STTemplates.STTpls.BODY_TPL_ID);
        };
        Body.prototype.applyTemplate = function (tpl, scope) {
            var dom = angular.element(tpl);
            var link = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        };
        Body.prototype.getCustomTemplate = function (scope) {
            var tableConfig = this.scope.tableConfig;
            if (tableConfig.rowTemplateId) {
                return this.getTemplateByCacheId(tableConfig.rowTemplateId);
            }
            return tableConfig.rowTemplate;
        };
        Body.prototype.isVirtualScrollEnabled = function () {
            return !(this.attrs.virtualScroll === 'false');
        };
        return Body;
    })(STCore.BaseComponentUI);
    STBodyUI.Body = Body;
})(STBodyUI || (STBodyUI = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STBodyUI.ts" />
angular.module('simpletable.table.body', [])
    .directive('stTableBody', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            require: '^stTable',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        var body = new STBodyUI.Body();
                        body.setServices($compile, $templateCache, $templateRequest);
                        body.link(scope, iElem, iAttrs, parent.getSimpleTable());
                        body.init();
                        return body;
                    }
                };
            }
        };
    }]);
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
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
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STRowUI.ts" />
angular.module('simpletable.table.row', [])
    .directive('stTableRow', ['$log', '$compile', '$templateCache', '$templateRequest', function ($log, $compile, $templateCache, $templateRequest) {
        return {
            restrict: 'AE',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs, parent) {
                        var row = new STRowUI.Row();
                        row.setServices($compile, $templateCache, $templateRequest);
                        row.link(scope, iElem, iAttrs, scope.simpleTable);
                        row.init();
                        return row;
                    }
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.ROW_TPL_ID);
            }
        };
    }]);
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="SimpleTable.ts" />
/// <reference path="../tpl/STTemplates.ts" />
angular.module('simpletable.table', [])
    .directive('stTable', ['$timeout', '$templateCache', 'SimpleTablePluginFactory', function ($timeout, $templateCache, SimpleTablePluginFactory) {
        return {
            restrict: 'AE',
            scope: {
                tableConfig: '=',
                tableData: '='
            },
            controller: function ($scope, $element, $attrs) {
                var stable = new SimpleTable.SimpleTable($scope, $element, $attrs, $timeout, SimpleTablePluginFactory);
                this.getSimpleTable = function () {
                    return stable;
                };
            },
            template: function (tElem, tAttrs) {
                return $templateCache.get(STTemplates.STTpls.TABLE_TPL_ID);
            }
        };
    }]);
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STTemplates.ts" />
angular.module('simpletable.table.tpls', [])
    .run(['$templateCache', function ($templateCache) {
        var tpls = new STTemplates.STTpls().getTemplates();
        _.forEach(tpls, function (pair) {
            $templateCache.put(pair.id, pair.tpl);
        });
    }]);
//# sourceMappingURL=simple-table.js.map