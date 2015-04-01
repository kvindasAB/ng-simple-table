/// <reference path="../select/SimpleTableSelection" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTablePluginFactory {

    export class SimpleTablePluginFactory {
        log = log4javascript.getLogger("SimpleTablePluginFactory");

        newPluginSelection():SimpleTableSelection.SimpleTablePluginSelection {
            this.log.debug("creating new SimpleTablePluginSelection");
            return new SimpleTableSelection.SimpleTablePluginSelection();
        }
    }
}

console.log("Creating angular module...: " +  "simpletable.core.selection");
angular.module('simpletable.core.selection', [])
    .service('SimpleTablePluginFactory', [function() {
        console.log("instantiating service...");
        return new SimpleTablePluginFactory.SimpleTablePluginFactory();
    }]);

