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
angular.module('simpletable.core.selection', []).service('SimpleTableSelectionFactory', [function () {
    return new SimpleTablePluginFactory();
}]);
//# sourceMappingURL=SimpleTablePluginFactory.js.map