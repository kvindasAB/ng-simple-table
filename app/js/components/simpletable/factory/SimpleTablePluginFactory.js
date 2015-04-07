/// <reference path="../select/SimpleTableSelection.ts" />
/// <reference path="../sort/SimpleTableSort.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTablePluginFactory;
(function (_SimpleTablePluginFactory) {
    var SimpleTablePluginFactory = (function () {
        function SimpleTablePluginFactory() {
            this.log = log4javascript.getLogger("SimpleTablePluginFactory");
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
    _SimpleTablePluginFactory.SimpleTablePluginFactory = SimpleTablePluginFactory;
})(SimpleTablePluginFactory || (SimpleTablePluginFactory = {}));
console.log("Creating angular module...: " + "simpletable.core.selection");
angular.module('simpletable.core.selection', []).service('SimpleTablePluginFactory', [function () {
    console.log("instantiating service...");
    return new SimpleTablePluginFactory.SimpleTablePluginFactory();
}]);
//# sourceMappingURL=SimpleTablePluginFactory.js.map