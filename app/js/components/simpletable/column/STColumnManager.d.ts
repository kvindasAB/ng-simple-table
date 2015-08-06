/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="STColumn.d.ts" />
declare module STColumn {
    class ColumnManager {
        columns: STColumn.Column[];
        processConfig(tableConfig: any): void;
        createColumns(tableConfig: any): void;
        getColumnById(id: any): Column;
        getColumnByField(field: any): Column;
    }
}
