/// <reference path="../core/BaseComponentUI.d.ts" />
/// <reference path="../tpl/STTemplates.d.ts" />
/// <reference path="../column/STColumn.d.ts" />
declare module STCellUI {
    class Cell extends STCore.BaseComponentUI {
        cellIdWatcher: Function;
        cellClassesWatcher: Function;
        cellClassesFirstRun: boolean;
        init(): void;
        addWatchers(): void;
        addCellIdWatcher(): void;
        addCellClassesWatcher(): void;
        arrayClasses(classVal: any): any;
        updateClasses(oldClasses: any, newClasses: any): void;
        arrayDifference(tokens1: any, tokens2: any): any[];
        addClasses(classes: any[]): void;
        removeClasses(classes: any): void;
        shouldUseCustomTemplate(): boolean;
        getCustomTemplate(scope: angular.IScope): any;
        applyDefaultTemplate(): void;
        optimizeTemplate(tpl: string, scope: angular.IScope): string;
    }
}
