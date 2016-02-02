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
//# sourceMappingURL=BaseSimpleTablePlugin.js.map