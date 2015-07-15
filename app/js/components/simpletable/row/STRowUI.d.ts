/// <reference path="../table/SimpleTable.d.ts" />
declare module STRowUI {
    class Row {
        scope: any;
        element: any;
        attrs: any;
        simpleTable: SimpleTable.SimpleTable;
        constructor();
        link(scope: any, element: any, attrs: any, simpleTable: SimpleTable.SimpleTable): void;
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onRowClicked(event: any): void;
        onRowDoubleClicked(event: any): void;
        onRowMouseEnter(event: any): void;
        onRowMouseLeave(event: any): void;
    }
}
