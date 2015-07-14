/// <reference path="../table/SimpleTable.ts" />
module STColumnUI {
    export class Column {

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
            this.element.on('click', angular.bind(this, this.onHeaderClicked));
        }

        removeEventListeners() {
            if(!this.element){ return; }
            this.element.off();
        }

        onHeaderClicked(event) {
            //console.log('onHeaderClicked: ', event, this);
            this.simpleTable.onHeaderClicked(event, this.scope.hcol);
        }

    }
}