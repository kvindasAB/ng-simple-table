/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="STConfig.d.ts" />
/// <reference path="STConstants.d.ts" />
declare module STCore {
    class ResizeManager {
        config: STCore.Config;
        constructor(config?: STCore.Config);
        resizeTable(): void;
        resizeTablePercentage(): void;
        resizeTableFixed(): void;
        getWidthInNumber(width: any): number;
        getWidthType(width: any): string;
        isResizePercentage(): boolean;
        isResizeFixed(): boolean;
    }
}
