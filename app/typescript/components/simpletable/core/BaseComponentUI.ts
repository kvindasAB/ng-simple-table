/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
module STCore {
    export class BaseComponentUI {

        // Attributes
        scope:angular.IScope;
        element:any;
        attrs:angular.IAttributes;

        $compile:angular.ICompileService;
        $templateCache:angular.ITemplateCacheService;
        $templateRequest:angular.ITemplateRequestService;

        // Methods
        setServices($compile:angular.ICompileService, $templateCache:angular.ITemplateCacheService, $templateRequest:angular.ITemplateRequestService):void{
            this.$compile           = $compile;
            this.$templateCache     = $templateCache;
            this.$templateRequest   = $templateRequest;
        }

        link(scope:angular.IScope, element:any, attrs:angular.IAttributes):void{
            this.scope      = scope;
            this.element    = element;
            this.attrs      = attrs;
        }

        validateCustomTemplate():void{
            if(!this.shouldUseCustomTemplate() ){
                this.applyTemplate(this.getDefaultTemplate(this.scope), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        }

        /* To be implemented by subclasses */
        shouldUseCustomTemplate():boolean{
            return false;
        }

        /* To be implemented by subclasses */
        getDefaultTemplate(scope:angular.IScope):string{
            return null;
        }

        /* To be implemented by subclasses */
        getCustomTemplate(scope:angular.IScope):string{
            return null;
        }

        getTemplateByCacheId(tplId):string{
            return this.$templateCache.get(tplId);
        }

        getTemplateByUrl(tplUrl):any{
            return this.$templateRequest(tplUrl);
        }

        applyTemplate(tpl:string, scope:angular.IScope):void{
            if(!tpl){return;}
            console.log('BaseComponent.applyTpl:', tpl);
            /*
            var dom:any = angular.element(tpl);
            var link:Function = this.$compile(dom);
            this.element.append(dom);
            link(scope);
            */
            var tpl:string = this.getCustomTemplate(this.scope);
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        }

    }
}