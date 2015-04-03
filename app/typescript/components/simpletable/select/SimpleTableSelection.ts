/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
module SimpleTableSelection {
    export class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin {

        // Attributes
        log = log4javascript.getLogger("SimpleTablePluginSelection");
        scope:any;
        selectedRows:any[] = [];

        // Overrides
        init():void {
            this.scope = this.simpleTable.scope;
            super.init();
            this.simpleTable.selection = this;
        }

        addEventListeners():void {
            super.addEventListeners();
            this.scope.$on("onRowClicked", angular.bind(this, this.onRowClicked));
            this.scope.$on("$destroy", this.removeEventListeners);
        }

        removeEventListeners():void {
            this.scope.$off("onRowClicked");
            this.scope.$off("$destroy");
        }

        // Methods
        isRowSelected(row):boolean {
            return (this.selectedRows.indexOf(row) > -1);
        }

        setSelectedRows(rows:Array<any>):void{
            console.log("setSelectedRows: ", rows);
            this.selectedRows.length = 0;
            for(var i:number = 0; i < rows.length; i++){
                this.addSelectedRow(rows[i]);
            }
        }

        onRowClicked(scopeEvent:any, $event:any, row:any):any{
            this.addSelectedRow(row);
        }

        addSelectedRow(row:any):any {
            this.log.debug("SimpleTableSelection.onRowClicked:", arguments);
            if(this.scope.tableConfig.selectionMultiple){
                return this.doMultipleSelection(row);
            }
            return this.doSingleSelection(row);
        }

        doSingleSelection(row:any):void{
            var index = this.selectedRows.indexOf(row);
            this.selectedRows.length = 0;
            if(index > -1){
                return;
            }
            this.selectedRows.push(row);
            this.log.debug("selectedRows: ", this.selectedRows);
        }

        doMultipleSelection(row:any){
            var index = this.selectedRows.indexOf(row);
            if(index > -1){
                return this.selectedRows.splice(index,1);
            }
            this.selectedRows.push(row);
        }
    }
}