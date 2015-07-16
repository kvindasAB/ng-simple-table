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
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        }

        /* To be implemented by subclasses */
        shouldUseCustomTemplate():boolean{
            return false;
        }

        /* To be implemented by subclasses */
        getCustomTemplate(scope:angular.IScope):any{
            return null;
        }

        getTemplateByCacheId(tplId):string{
            return this.$templateCache.get(tplId);
        }

        getTemplateByUrl(tplUrl):any{
            var tpl = this.$templateCache.get(tplUrl);
            if(tpl){ return tpl; }
            return this.$templateRequest(tplUrl);
            /*
            this.$templateRequest(tplUrl).then(function(response){
                console.log('tplRq:', response);
                //this.$templateCache.put(tplUrl, response);
                //return response;
            });
            */
        }

        applyTemplate(tpl:string, scope:angular.IScope):void{
            if(!tpl){return;}
            //console.log('BaseComponent.applyTpl:', tpl);
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