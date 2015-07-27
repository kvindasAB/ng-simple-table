/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="ISimpleTablePlugin.d.ts" />
/// <reference path="IDisposable.d.ts" />
declare module STCore {
    class BaseComponentUI implements STCore.IDisposable {
        scope: angular.IScope;
        element: any;
        attrs: angular.IAttributes;
        simpleTable: SimpleTable.SimpleTable;
        $compile: angular.ICompileService;
        $templateCache: angular.ITemplateCacheService;
        $templateRequest: angular.ITemplateRequestService;
        setServices($compile: angular.ICompileService, $templateCache: angular.ITemplateCacheService, $templateRequest: angular.ITemplateRequestService): void;
        link(scope: angular.IScope, element: any, attrs: angular.IAttributes, simpleTable: SimpleTable.SimpleTable): void;
        validateCustomTemplate(): void;
        shouldUseCustomTemplate(): boolean;
        getCustomTemplate(scope: angular.IScope): any;
        getTemplateByCacheId(tplId: any): string;
        getTemplateByUrl(tplUrl: any): any;
        applyTemplate(tpl: string, scope: angular.IScope): void;
        dispose(): void;
    }
}