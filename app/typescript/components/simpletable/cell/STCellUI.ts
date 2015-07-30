/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
/// <reference path="../column/STColumn.ts" />
module STCellUI {
    export class Cell extends STCore.BaseComponentUI {

        init(){
            this.validateCustomTemplate();
        }

        shouldUseCustomTemplate():boolean{
            var col:any = (<any>this.scope).col;
            return col && (col.cellTemplate || col.cellTemplateId);
        }

        getCustomTemplate(scope:angular.IScope):any{
            var col:STColumn.Column = (<any>scope).col;
            if(col.cellTemplateId){
                return this.getTemplateByCacheId(col.cellTemplateId);
            }
            /*
            if(col.templateUrl){
                return this.getTemplateByUrl(col.templateUrl);
            }
            */
            return col.cellTemplate;
        }

    }
}