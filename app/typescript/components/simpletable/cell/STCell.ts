module STCell {
    export class Cell {

        scope:any;
        element:any;
        attrs:any;

        constructor(){
        }

        link(scope:any, element:any, attrs:any){
            this.scope      = scope;
            this.element    = element;
            this.attrs      = attrs;
        }

    }
}