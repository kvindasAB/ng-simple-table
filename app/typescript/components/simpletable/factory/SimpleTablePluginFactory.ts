/// <reference path="../select/SimpleTableSelection.ts" />
/// <reference path="../sort/SimpleTableSort.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTablePluginFactory {

    export class SimpleTablePluginFactory {
        log = log4javascript.getLogger("SimpleTablePluginFactory");


        newPluginSelection():SimpleTableSelection.SimpleTablePluginSelection {
            console.log("creating new SimpleTablePluginSelection");
            return new SimpleTableSelection.SimpleTablePluginSelection();
        }

        newPluginSort():SimpleTableSort.SimpleTablePluginSort {
            console.log("creating new SimpleTablePluginSort");
            return new SimpleTableSort.SimpleTablePluginSort();
        }
    }
}

console.log("Creating angular module...: " +  "simpletable.core.selection");
angular.module('simpletable.core.selection', [])
    .service('SimpleTablePluginFactory', [function() {
        console.log("instantiating service...");
        return new SimpleTablePluginFactory.SimpleTablePluginFactory();
    }]);

