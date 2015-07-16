/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
module STColumnUI {
    export class Column extends STCore.BaseComponentUI {

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
            this.simpleTable.onHeaderClicked(event, (<any>this.scope).hcol);
        }

    }
}