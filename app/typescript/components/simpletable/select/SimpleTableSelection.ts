/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
module SimpleTableSelection {
    export class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin {

        // Attributes
        log = log4javascript.getLogger("SimpleTablePluginSelection");
        scope:any;

        // Overrides
        init():void {
            super.init();
            this.initScope();
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
        initScope():void{
            this.scope = this.simpleTable.scope;
            this.scope.selectedRows = [];
            this.scope.pluginSelection = this;
        }

        isRowSelected(row):boolean {
            this.log.debug("isSelected: ", this.scope.selectedRows.indexOf(row));
            return (this.scope.selectedRows.indexOf(row) > -1);
        }

        onRowClicked = function(scopeEvent, $event, row){
            this.log.debug("SimpleTableSelection.onRowClicked:", arguments);
            if(this.scope.tableConfig.selectionMultiple){
                return this.doMultipleSelection($event, row);
            }
            return this.doSingleSelection($event, row);
        };

        doSingleSelection = function($event, row){
            var index = this.scope.selectedRows.indexOf(row);
            this.scope.selectedRows.length = 0;
            if(index > -1){
                return;
            }
            this.scope.selectedRows.push(row);
            this.log.debug("selectedRows: ", this.scope.selectedRows);
        };

        doMultipleSelection = function($event, row){
            var index = this.scope.selectedRows.indexOf(row);
            if(index > -1){
                return this.scope.selectedRows.splice(index,1);
            }
            this.scope.selectedRows.push(row);
        };
    }
}