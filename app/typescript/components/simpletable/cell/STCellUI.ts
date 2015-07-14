module STCellUI {
    export class Cell {

        scope:any;
        element:any;
        attrs:any;
        $compile:any;

        constructor(){
        }

        link(scope:any, element:any, attrs:any, $compile:any){
            this.scope      = scope;
            this.element    = element;
            this.attrs      = attrs;
            this.$compile   = $compile;
        }

        init(){
            this.validateCustomTemplate();
        }

        validateCustomTemplate(){
            if(!this.scope || !this.scope.col || (!this.scope.col.template && !this.scope.col.templateId)){
                return;
            }
            var tpl:string = this.getCustomTemplate(this.scope);
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        }

        getCustomTemplate(scope:any){
            return scope.col.template;
        }

    }
}