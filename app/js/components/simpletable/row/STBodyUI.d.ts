/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../core/BaseComponentUI.d.ts" />
/// <reference path="../tpl/STTemplates.d.ts" />
declare module STBodyUI {
    class Body extends STCore.BaseComponentUI {
        init(): void;
        shouldUseCustomTemplate(): boolean;
        validateCustomTemplate(): void;
        getDefaultTemplate(virtualScroll: boolean): string;
        applyTemplate(tpl: string, scope: any): void;
        getCustomTemplate(scope: angular.IScope): any;
        isVirtualScrollEnabled(): boolean;
    }
}
