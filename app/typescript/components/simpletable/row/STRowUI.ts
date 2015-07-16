/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
module STRowUI {
    export class Row extends STCore.BaseComponentUI {

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
            this.simpleTable.onRowClicked(event, (<any>this.scope).row);
        }

        onRowDoubleClicked(event) {
            //console.log('onRowDoubleClicked');
            this.simpleTable.onRowDoubleClicked(event, (<any>this.scope).row);
        }

        onRowMouseEnter(event) {
            //console.log('onRowMouseEnter');
            this.simpleTable.onRowMouseEnter(event, (<any>this.scope).row);
        }

        onRowMouseLeave(event) {
            //console.log('onRowMouseLeave');
            this.simpleTable.onRowMouseLeave(event, (<any>this.scope).row);
        }

    }
}