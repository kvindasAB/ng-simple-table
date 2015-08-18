/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../core/STConfig.d.ts" />
/// <reference path="../core/STConstants.d.ts" />
declare module STResize {
    class STResizeManager {
        table: SimpleTable.SimpleTable;
        tableConfig: STCore.Config;
        resizeTable(): void;
        resizeTableFixed(): void;
        resizeTableRelative(): void;
        isResizeTypeFixed(): boolean;
        isResizeTypeRelative(): boolean;
        isResizeActive(): boolean;
        getColumns(): STColumn.Column[];
        getColumnWidthInPx(col: STColumn.Column): number;
        calculateTotalColumnsWidthInPx(cols: STColumn.Column[]): number;
        measureColumnListHeaderUIInPx(cols: STColumn.Column[]): void;
        measureColumnHeaderUIInPx(col: STColumn.Column): number;
        getColumnHeaderUI(col: STColumn.Column): any;
        getTableHeaderUI(col: STColumn.Column): any;
    }
}
