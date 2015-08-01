/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
module STCore {
    export class BaseComponentUI implements STCore.IDisposable {

        // Attributes
        scope:angular.IScope;
        element:any;
        attrs:angular.IAttributes;
        simpleTable:SimpleTable.SimpleTable;

        $compile:angular.ICompileService;
        $templateCache:angular.ITemplateCacheService;
        $templateRequest:angular.ITemplateRequestService;

        // Methods
        setServices($compile:angular.ICompileService, $templateCache:angular.ITemplateCacheService, $templateRequest:angular.ITemplateRequestService):void{
            this.$compile           = $compile;
            this.$templateCache     = $templateCache;
            this.$templateRequest   = $templateRequest;
        }

        link(scope:angular.IScope, element:any, attrs:angular.IAttributes, simpleTable:SimpleTable.SimpleTable):void{
            this.scope          = scope;
            this.element        = element;
            this.attrs          = attrs;
            this.simpleTable    = simpleTable;

            this.scope.$on('$destroy', this.dispose);
        }

        validateCustomTemplate():void{
            if(!this.shouldUseCustomTemplate() ){
                return;
            }
            var tpl = this.getCustomTemplate(this.scope);
            this.optimizeAndApplyTemplate(tpl, this.scope);
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

        optimizeAndApplyTemplate(tpl:string, scope:angular.IScope):void {
            var otpl = this.shouldOptimizeTemplate(tpl, scope) ? this.optimizeTemplate(tpl, scope) : tpl;
            this.applyTemplate(otpl, scope);
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
            //var tpl:string = this.getCustomTemplate(this.scope);
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        }

        // To be implemented on subclasses
        optimizeTemplate(tpl:string, scope:angular.IScope):string {
            return tpl;
        }

        optimizeTemplateParts(tpl:string, parts:any[]):string {
            for(var i:number = 0; i < parts.length; i++){
                var part = parts[i];
                tpl = this.optimizeTemplatePart(tpl, part);
            }
            return tpl;
        }

        optimizeTemplatePart(tpl:string, part):string {
            return tpl.replace(part.src, part.repl);
        }

        shouldOptimizeTemplate(tpl:string, scope:angular.IScope):boolean {
            return true;
        }

        dispose():void {
            delete this.scope;
            delete this.element;
            delete this.attrs;
            delete this.simpleTable;

            delete this.$compile;
            delete this.$templateCache;
            delete this.$templateRequest;
        }

    }
}