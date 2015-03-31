/// <reference path="../select/SimpleTableSelection" />
var SimpleTablePluginFactory = (function () {
    function SimpleTablePluginFactory() {
        this.log = log4javascript.getLogger("SimpleTablePluginFactory");
    }
    SimpleTablePluginFactory.prototype.newPluginSelection = function () {
        this.log.debug("creating new SimpleTablePluginSelection");
        return new SimpleTableSelection.SimpleTablePluginSelection();
    };
    return SimpleTablePluginFactory;
})();
console.log("Creating angular module...: " + "simpletable.core.selection");
angular.module('simpletable.core.selection', []).service('SimpleTablePluginFactory', [function () {
    console.log("instantiating service...");
    return new SimpleTablePluginFactory();
}]);
//# sourceMappingURL=SimpleTablePluginFactory.js.map