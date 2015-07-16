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

        getCustomTemplate(scope:angular.IScope):any{
            var col:any = (<any>scope).col;
            if(col.templateId){
                return this.getTemplateByCacheId(col.templateId);
            }
            if(col.templateUrl){
                return this.getTemplateByUrl(col.templateUrl);
            }
            return (<any>scope).col.template;
        }

    }
}