/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
/// <reference path="../column/STColumn.ts" />
module STCellUI {
    export class Cell extends STCore.BaseComponentUI {

        init(){
            if(this.shouldUseCustomTemplate()){
                this.validateCustomTemplate();
                return;
            }
            this.applyDefaultTemplate();
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

        applyDefaultTemplate():void {
            debugger;
            var tpl = this.$templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            this.optimizeAndApplyTemplate(tpl, this.scope);
        }

        optimizeTemplate(tpl:string, scope:angular.IScope):string {
            var col:STColumn.Column = (<any>scope).col;
            if(col.isStaticProperty('cellValue')){
                return this.$templateCache.get(STTemplates.STTpls.CELL_BO_TPL_ID);
            }
            return tpl;
        }

    }
}