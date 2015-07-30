/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../tpl/STTemplates.ts" />
module STBodyUI {
    export class Body extends STCore.BaseComponentUI {

        init(){
            this.validateCustomTemplate();
        }


        shouldUseCustomTemplate():boolean{
            var tableConfig:STCore.Config = (<any>this.scope).tableConfig;
            return tableConfig && (tableConfig.rowTemplate || tableConfig.rowTemplateId);
        }

        validateCustomTemplate(){
            if(!this.shouldUseCustomTemplate()){
                this.applyTemplate(this.getDefaultTemplate(this.isVirtualScrollEnabled()), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        }

        getDefaultTemplate(virtualScroll:boolean) {
            if(virtualScroll){
                return this.getTemplateByCacheId(STTemplates.STTpls.BODY_VS_TPL_ID);
            }
            return this.getTemplateByCacheId(STTemplates.STTpls.BODY_TPL_ID);
        }

        applyTemplate(tpl:string, scope:any){
            var dom:any = angular.element(tpl);
            var link:Function = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        }

        getCustomTemplate(scope:angular.IScope):any{
            var tableConfig:STCore.Config = (<any>this.scope).tableConfig;
            if(tableConfig.rowTemplateId){
                return this.getTemplateByCacheId(tableConfig.rowTemplateId);
            }
            return tableConfig.rowTemplate;
        }

        isVirtualScrollEnabled():boolean {
            return !((<any>this.attrs).virtualScroll === 'false');
        }

    }
}