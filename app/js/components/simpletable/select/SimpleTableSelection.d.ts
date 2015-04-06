/// <reference path="../core/BaseSimpleTablePlugin.d.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
declare module SimpleTableSelection {
    class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        log: log4javascript.Logger;
        scope: any;
        selectedRows: any[];
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        isRowSelected(row: any): boolean;
        setSelectedRows(rows: Array<any>): void;
        onRowClicked(scopeEvent: any, $event: any, row: any): any;
        addSelectedRow(row: any): any;
        doSingleSelection(row: any): void;
        doMultipleSelection(row: any): any[];
        isRowValid(row: any): boolean;
        revalidateSelection(): void;
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
