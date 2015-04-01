/// <reference path="../select/SimpleTableSelection" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTablePluginFactory;
(function (_SimpleTablePluginFactory) {
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
    _SimpleTablePluginFactory.SimpleTablePluginFactory = SimpleTablePluginFactory;
})(SimpleTablePluginFactory || (SimpleTablePluginFactory = {}));
console.log("Creating angular module...: " + "simpletable.core.selection");
angular.module('simpletable.core.selection', []).service('SimpleTablePluginFactory', [function () {
    console.log("instantiating service...");
    return new SimpleTablePluginFactory.SimpleTablePluginFactory();
}]);
//# sourceMappingURL=SimpleTablePluginFactory.js.map