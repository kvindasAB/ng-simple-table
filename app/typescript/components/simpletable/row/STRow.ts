/// <reference path="../table/SimpleTable.ts" />
module STRow {
    export class Row {

        scope:any;
        element:any;
        attrs:any;
        simpleTable:SimpleTable.SimpleTable

        constructor(){
        }

        link(scope:any, element:any, attrs:any, simpleTable:SimpleTable.SimpleTable){
            this.scope          = scope;
            this.element        = element;
            this.attrs          = attrs;
            this.simpleTable    = simpleTable;
        }

        init(){
            this.addEventListeners();
        }

        addEventListeners() {
            this.element.on('click', angular.bind(this, this.onRowClicked));
            this.element.on('dblclick', angular.bind(this, this.onRowDoubleClicked));
            this.element.on('mouseenter', angular.bind(this, this.onRowMouseEnter));
            this.element.on('mouseleave', angular.bind(this, this.onRowMouseLeave));
            this.element.on('$destroy', angular.bind(this, this.removeEventListeners));
        }

        removeEventListeners() {
            if(!this.element){ return; }
            this.element.off();
        }

        onRowClicked(event) {
            //console.log('onRowClicked: ', event, this);
            this.simpleTable.onRowClicked(event, this.scope.row);
        }

        onRowDoubleClicked(event) {
            //console.log('onRowDoubleClicked');
            this.simpleTable.onRowDoubleClicked(event, this.scope.row);
        }

        onRowMouseEnter(event) {
            //console.log('onRowMouseEnter');
            this.simpleTable.onRowMouseEnter(event, this.scope.row);
        }

        onRowMouseLeave(event) {
            //console.log('onRowMouseLeave');
            this.simpleTable.onRowMouseLeave(event, this.scope.row);
        }

    }
}