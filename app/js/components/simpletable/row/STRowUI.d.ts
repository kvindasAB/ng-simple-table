/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../core/BaseComponentUI.d.ts" />
declare module STRowUI {
    class Row extends STCore.BaseComponentUI {
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onRowClicked(event: any): void;
        onRowDoubleClicked(event: any): void;
        onRowMouseEnter(event: any): void;
        onRowMouseLeave(event: any): void;
    }
}
