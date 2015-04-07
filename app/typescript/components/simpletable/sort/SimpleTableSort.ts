/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTableSort {
    export class SimpleTablePluginSort extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {

        // Attributes
        scope:any;
        currentSortColumn:any = null;
        currentSort:any = null;
        currentSortReverse:boolean = false;

        // Overrides
        init():void {
            this.scope = this.simpleTable.scope;
            super.init();
            this.simpleTable.sortManager = this;
        }

        addEventListeners():void {
            super.addEventListeners();
            this.scope.$on("onHeaderClicked", angular.bind(this, this.onHeaderClicked));
            this.scope.$on("$destroy", this.removeEventListeners);
        }

        removeEventListeners():void {
            this.scope.$off("onHeaderClicked");
            this.scope.$off("$destroy");
        }

        // Methods
        removePreviousSortFromColumns(columns:any[]):void {
            for(var i:number = 0; i < columns.length; i++){
                var column:any = columns[i];
                column.sorted = false;
            }
        }

        markColumnAsSorted(column:any):void {
            column.sorted = true;
            column.sortType = !column.sortType || column.sortType === "desc" ? "asc" : "desc";
        }

        applySort(column:any):void {
            this.currentSort = column.field;
            this.currentSortReverse = column.sortType ? false : true;
            this.currentSortColumn = column;
        }

        sortByColumn(column:any):void {
            this.removePreviousSortFromColumns(this.scope.tableConfig.columns);
            this.markColumnAsSorted(column);
            this.applySort(column);
        }

        onHeaderClicked(scopeEvent:any, $event:any, column:any):any{
            this.sortByColumn(column);
        }

        revalidateSort():void {
            this.sortByColumn(this.currentSortColumn);
        }

        onDataChanged(newValue, oldValue):void {
            this.revalidateSort();
        }

    }
}