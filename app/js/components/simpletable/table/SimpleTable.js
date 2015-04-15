/// <reference path="ISimpleTable.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTable;
(function (_SimpleTable) {
    var SimpleTable = (function () {
        // Methods
        function SimpleTable(scope, element, attrs, $timeout, pluginFactory) {
            this.plugins = [];
            this.initializationComplete = false;
            // base
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            // services
            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;
            // variables
            this.scope.simpleTable = this;
            this.init();
            console.log("SimpleTable created: ", this.scope);
        }
        SimpleTable.prototype.init = function () {
            this.notifyPreInitialization();
            this.addEventListeners();
            this.validateConfig();
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
        SimpleTable.prototype.validateConfig = function () {
        };
        SimpleTable.prototype.initDefaultPlugins = function () {
            this.pluginFactory.newPluginSelection().doRegister(this);
            this.pluginFactory.newPluginSort().doRegister(this);
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
            console.log("Row clicked: ", arguments);
            this.scope.$broadcast("onRowClicked", $event, row);
        };
        SimpleTable.prototype.onHeaderClicked = function ($event, column) {
            console.log("Header clicked: ", arguments);
            this.scope.$broadcast("onHeaderClicked", $event, column);
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
    _SimpleTable.SimpleTable = SimpleTable;
})(SimpleTable || (SimpleTable = {}));
//# sourceMappingURL=SimpleTable.js.map