/// <reference path="../table/SimpleTable.d.ts" />
declare module STColumn {
    class Column {
        scope: any;
        element: any;
        attrs: any;
        simpleTable: SimpleTable.SimpleTable;
        constructor();
        link(scope: any, element: any, attrs: any, simpleTable: SimpleTable.SimpleTable): void;
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onHeaderClicked(event: any): void;
    }
}
