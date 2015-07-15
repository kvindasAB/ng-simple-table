/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
module STCellUI {
    export class Cell extends STCore.BaseComponentUI {

        init(){
            this.validateCustomTemplate();
        }

        shouldUseCustomTemplate():boolean{
            var col:any = (<any>this.scope).col;
            return col && (col.template || col.templateId);
        }

        /* To be implemented by subclasses */
        getCustomTemplate(scope:angular.IScope):string{
            return (<any>scope).col.template;
        }

    }
}