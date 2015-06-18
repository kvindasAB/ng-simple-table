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
//# sourceMappingURL=SimpleTablePluginFactory.js.map