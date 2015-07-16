/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../core/BaseComponentUI.d.ts" />
declare module STColumnUI {
    class Column extends STCore.BaseComponentUI {
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onHeaderClicked(event: any): void;
    }
}
