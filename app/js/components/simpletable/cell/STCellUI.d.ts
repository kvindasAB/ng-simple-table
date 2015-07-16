/// <reference path="../core/BaseComponentUI.d.ts" />
/// <reference path="../tpl/STTemplates.d.ts" />
declare module STCellUI {
    class Cell extends STCore.BaseComponentUI {
        init(): void;
        shouldUseCustomTemplate(): boolean;
        getCustomTemplate(scope: angular.IScope): any;
    }
}
