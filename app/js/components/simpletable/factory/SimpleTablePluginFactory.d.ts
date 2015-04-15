/// <reference path="../select/SimpleTableSelection.d.ts" />
/// <reference path="../sort/SimpleTableSort.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
declare module SimpleTablePluginFactory {
    class SimpleTablePluginFactory {
        newPluginSelection(): SimpleTableSelection.SimpleTablePluginSelection;
        newPluginSort(): SimpleTableSort.SimpleTablePluginSort;
    }
}
