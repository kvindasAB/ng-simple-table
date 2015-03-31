/// <reference path="ISimpleTablePluginFactory.ts" />
var SimpleTablePlugin;
(function (SimpleTablePlugin) {
    var SimpleTablePluginFactory = (function () {
        function SimpleTablePluginFactory() {
        }
        // Methods
        SimpleTablePluginFactory.prototype.newInstance = function () {
            return new this.pluginClass();
        };
        return SimpleTablePluginFactory;
    })();
    SimpleTablePlugin.SimpleTablePluginFactory = SimpleTablePluginFactory;
})(SimpleTablePlugin || (SimpleTablePlugin = {}));
//# sourceMappingURL=BaseSimpleTablePluginFactory.js.map