/// <reference path="../core/BaseSimpleTablePlugin.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
declare module SimpleTableSelection {
    class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin {
        log: log4javascript.Logger;
        scope: any;
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        initScope(): void;
        isRowSelected(row: any): boolean;
        onRowClicked: (scopeEvent: any, $event: any, row: any) => any;
        doSingleSelection: ($event: any, row: any) => void;
        doMultipleSelection: ($event: any, row: any) => any;
    }
}
