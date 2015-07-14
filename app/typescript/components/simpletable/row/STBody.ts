/// <reference path="../table/SimpleTable.ts" />
module STBody {
    export class Body {

        static DEFAULT_TPL:string = "<tr ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
                                    "    ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
                                    "    st-table-row ></tr>";

        scope:any;
        element:any;
        attrs:any;
        simpleTable:SimpleTable.SimpleTable;
        $compile:any;
        parentCtrl:any;

        constructor(){
        }

        link(scope:any, element:any, attrs:any, simpleTable:SimpleTable.SimpleTable, $compile:any, parentCtrl:any){
            this.scope          = scope;
            this.element        = element;
            this.attrs          = attrs;
            this.simpleTable    = simpleTable;
            this.$compile       = $compile;
            this.parentCtrl     = parentCtrl;
        }

        init(){
            this.validateCustomTemplate();
        }

        validateCustomTemplate(){
            if(!this.scope || !this.scope.tableConfig || !this.scope.tableConfig.rowTemplate1){
                this.applyTemplate(Body.DEFAULT_TPL, this.scope);
                return;
            }
            console.log('STBody Tpl: ', this.getCustomTemplate(this.scope) );
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        }

        applyTemplate(tpl:string, scope:any){
            var dom:any = angular.element(tpl);
            var link:Function = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        }

        getCustomTemplate(scope:any){
            return scope.tableConfig.rowTemplate1;
        }

    }
}