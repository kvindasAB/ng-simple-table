/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
module STBodyUI {
    export class Body extends STCore.BaseComponentUI {

        init(){
            this.validateCustomTemplate();
        }


        shouldUseCustomTemplate():boolean{
            var tableConfig:any = (<any>this.scope).tableConfig;
            return tableConfig && tableConfig.rowTemplate;
        }

        validateCustomTemplate(){
            if(!this.shouldUseCustomTemplate()){
                this.applyTemplate(this.getTemplateByCacheId(STTemplates.STTpls.BODY_TPL_ID), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        }

        applyTemplate(tpl:string, scope:any){
            var dom:any = angular.element(tpl);
            var link:Function = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        }

        getCustomTemplate(scope:angular.IScope):any{
            return (<any>scope).tableConfig.rowTemplate;
        }

    }
}