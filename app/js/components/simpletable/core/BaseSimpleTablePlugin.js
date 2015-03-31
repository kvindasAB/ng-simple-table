/// <reference path="ISimpleTablePlugin.ts" />
var SimpleTablePlugin;
(function (SimpleTablePlugin) {
    var BaseSimpleTablePlugin = (function () {
        function BaseSimpleTablePlugin() {
            // Attributes
            this.isInitializationComplete = false;
        }
        // Methods
        BaseSimpleTablePlugin.prototype.init = function () {
            this.addEventListeners();
        };
        BaseSimpleTablePlugin.prototype.doRegister = function () {
            this.simpleTable.registerPlugin(this);
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
        return BaseSimpleTablePlugin;
    })();
    SimpleTablePlugin.BaseSimpleTablePlugin = BaseSimpleTablePlugin;
})(SimpleTablePlugin || (SimpleTablePlugin = {}));
//# sourceMappingURL=BaseSimpleTablePlugin.js.map