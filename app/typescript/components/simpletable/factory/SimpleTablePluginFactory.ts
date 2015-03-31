/// <reference path="../select/SimpleTableSelection" />

class SimpleTablePluginFactory {
    log = log4javascript.getLogger("SimpleTablePluginFactory");

    newPluginSelection():SimpleTableSelection.SimpleTablePluginSelection {
        this.log.debug("creating new SimpleTablePluginSelection");
        return new SimpleTableSelection.SimpleTablePluginSelection();
    }
}

angular.module('simpletable.core.selection', [])
    .service('SimpleTableSelectionFactory', [function() {
        return new SimpleTablePluginFactory();
    }]);

