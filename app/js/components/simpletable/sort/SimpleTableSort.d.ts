/// <reference path="../core/BaseSimpleTablePlugin.d.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
declare module SimpleTableSort {
    class SimpleTablePluginSort extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        scope: any;
        currentSortColumn: any;
        currentSort: any;
        currentSortReverse: boolean;
        init(): void;
        addEventListeners(): void;
        removePreviousSortFromColumns(columns: any[]): void;
        markColumnAsSorted(column: any): void;
        applyColumnSortState(column: any): void;
        applySort(column: any): void;
        sortByColumn(column: any): void;
        onHeaderClicked(scopeEvent: any, $event: any, column: any): any;
        revalidateSort(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        switchColumnSortType(column: any): void;
        setSortByColumn(column: any, sortType: string): void;
        addToArray(array: any[], values: string[]): any[];
        removeFromArray(array: any[], values: string[]): any[];
    }
}
