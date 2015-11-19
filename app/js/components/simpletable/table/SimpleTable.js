/// <reference path="ISimpleTable.ts" />
/// <reference path="../column/STColumnManager.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../resize/ResizeManager.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTable;
(function (SimpleTable_1) {
    var SimpleTable = (function () {
        function SimpleTable(scope, element, attrs, $timeout, pluginFactory) {
            this.managers = {};
            this.uiParts = {};
            this.plugins = [];
            this.initializationComplete = false;
            this.id = STUtil.Util.generateToken();
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;
            this.scope.simpleTable = this;
            this.init();
            console.log("SimpleTable created: ", this.id, this.scope, this.element);
        }
        SimpleTable.prototype.init = function () {
            this.notifyPreInitialization();
            this.addEventListeners();
            this.processConfig();
            this.initManagers();
            this.initDefaultPlugins();
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
            this.managers.resizeManager = new STResize.ResizeManager(this, this.scope.tableConfig);
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
//# sourceMappingURL=SimpleTable.js.map